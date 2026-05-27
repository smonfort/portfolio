---
title: My micro-SaaS blueprint for 2026
description: A technical and pragmatic guide to the technology choices for building and deploying a micro-SaaS in 2026.
date: 2026-05-27
updatedDate: 2026-05-27
tags:
  - SaaS
  - Architecture
  - Nuxt
  - Blueprint
  - Cloud
slug: blueprint-micro-saas
lang: en-US
image: ../img/blueprint.png
---

Launching a micro-SaaS has never been more accessible than in 2026. Today, you can start from scratch in the morning and have a product billing customers by evening. The challenge is no longer whether you _can_ do it, but where to begin so you build on solid foundations: framework, database, authentication, payments, hosting, AI...

In the age of _vibe coding_, I'm convinced that software architecture fundamentals are more relevant than ever. A good structure has become a key factor in ensuring a product's longevity and scalability. A well-thought-out design is what allows agents to produce consistent, controlled, and lasting results.

This article presents my blueprint for building a micro-SaaS: my preferred stack, why I made these choices, and where I changed my mind. This isn't gospel — it's a highly subjective point of view, and above all, a battle-tested perspective from running a micro-SaaS in production.

## Framework: Nuxt

I quickly settled on **[Nuxt 4](https://nuxt.com)**, the [Vue](https://vuejs.org) meta-framework. I had already used it on past projects with great results, so the choice came naturally. Here's what I value about it:

- **Unified full-stack**: frontend and backend in a single project, with native shared typing between client and server for an optimized DX.
- **Hybrid rendering**: you decide page by page whether it should be rendered statically (great for landing pages or blog posts) or dynamically. Nuxt pre-renders static routes at build time, boosting performance and therefore SEO.
- **Deploy anywhere**: Nuxt is powered by [Nitro](https://nitro.unjs.io), which provides presets for Node, serverless environments ([Lambda](https://aws.amazon.com/lambda), [Vercel](https://vercel.com), [Netlify](https://netlify.com), [Cloudflare Workers](https://workers.cloudflare.com)), or even [Docker](https://docker.com). This gives you tremendous deployment flexibility.
- **Official modules**: a rich collection of officially supported modules, including [Nuxt Content](https://content.nuxt.com) which enables markdown-based editing for editorial content pages.

Why not [Next.js](https://nextjs.org)? Great question! Next.js is excellent and has captured a staggering market share, but its relative lock-in with Vercel feels problematic to me. As soon as you want to leave their platform, everything can get more complex. With Nuxt and its Nitro engine, I maintain stronger control and a greater sense of independence. I should admit that AI agents have a better knowledge of Next/React codebases than Nuxt/Vue — but nothing deal-breaking.

## Architecture: modular monolith

The temptation to go with microservices is real, even if the hype has faded somewhat over the past few years. For an early-stage micro-SaaS, it's almost always a mistake: distributed complexity (networking, consistency, observability) piles on top of business complexity, and you quickly spend more time wiring services together than shipping essential features.

I opted instead for a **modular monolith**: a single codebase in a monorepo, a single deployment, but a strict internal organization that keeps the door open to extracting services as autonomous units if the need ever becomes clear.

In practice, each business domain in the Nuxt backend is a self-contained module:

```
server/modules/
├── auth/
├── profile/
├── application/
├── subscription/
├── mailing/
└── shared/
```

Each module follows a hexagonal architecture (ports & adapters). I drew freely from [this repository](https://github.com/Sairyss/domain-driven-hexagon), which remains a go-to reference I strongly recommend reading. A module is structured as follows:

```
server/modules/profile/
├── module.ts                          # Factory
├── core/
│   ├── entities/                      # Business types and interfaces
│   │   └── user-profile.entity.ts
│   ├── ports/                         # Interface contracts
│   │   ├── profile-repository.port.ts
│   │   └── avatar-storage.port.ts
│   └── usecases/                      # Commands, queries, listeners
│       ├── update-profile.command.ts
│       ├── upload-avatar.command.ts
│       └── get-profile.query.ts
└── adapters/
    ├── primary/
    │   └── rest/                      # HTTP entry points (API routes)
    │       └── profile.adapter.ts
    └── secondary/                     # Concrete implementations
        ├── drizzle-profile-repository.adapter.ts
        └── s3-avatar-storage.adapter.ts
```

The core principle of hexagonal architecture is simple but profound: **the `core` knows nothing about infrastructure**. Entities, ports, and use cases never import an adapter, a framework, or an external library. It's the adapters' job to bridge the gap with the outside world.

- **Primary adapters** (in `adapters/primary/`) are the entry points that _drive_ the application: REST controllers, [SQS](https://aws.amazon.com/sqs) listeners, CLI commands... They receive external stimuli, translate them into use case calls, and format the response. If you change your transport protocol (REST → GraphQL → WebSocket, for example), only this directory changes — the core stays untouched. In our case, Nuxt API routes import a primary REST adapter from a module.
- **Secondary adapters** (in `adapters/secondary/`) are the output points _driven by_ the application: [Drizzle](https://orm.drizzle.team) repositories for database access, [Stripe](https://stripe.com) clients, [S3](https://aws.amazon.com/s3) storage, email sending... They implement the ports defined in the core and are injected in the module's factory. If you switch from Stripe to PayPal or from Drizzle to [Prisma](https://prisma.io), only this directory changes. The business core, once again, remains untouched.

**Ports** describe the contract expected by the domain as a simple interface.

```ts title="server/modules/profile/core/ports/profile-repository.port.ts"
export interface ProfileRepository {
  findByUserId(userId: string): Promise<UserProfile | null>;
  save(profile: UserProfile): Promise<void>;
}
```

The domain is therefore extremely easy to test, and adapters are swappable without touching any business logic.

**Use cases** are classes that implement a business use case and orchestrate the various ports. Concretely, a use case implements a `run()` method returning a `Result<Ok, Err>` via [`ts-results-es`](https://github.com/lune-climate/ts-results-es). This explicit typing forces the caller to handle errors (something traditional exceptions don't enforce), reinforcing the overall robustness of the application. Rust developers, among others, will know exactly what I mean.

```ts title="server/modules/profile/core/usecases/update-profile.command.ts"
export class UpdateProfile extends BaseUseCase<UpdateProfileInput, void, ProfileNotFound> {
  readonly name = 'UpdateProfile';

  constructor(
    private readonly repository: ProfileRepository,
    private readonly storage: AvatarStorage,
    protected readonly eventBus: EventBus
  ) {
    super();
  }

  protected async run(input: UpdateProfileInput): Promise<Result<void, ProfileNotFound>> {
    const profile = await this.repository.findByUserId(input.userId);
    if (!profile) return Err(new ProfileNotFound());
    const updated = { ...profile, ...input.data };
    await this.repository.save(updated);
    await this.eventBus.emit({ type: 'PROFILE_UPDATED', payload: { userId: input.userId } });
    return Ok.EMPTY;
  }
}
```

Finally, **modules can communicate with each other via an event bus**, enabling better decoupling.

This architecture has an undeniable upfront cost: more files, more boilerplate, more layers. However, that pain has become marginal now that code-generation agents produce these structures almost instantly. In my view, this investment pays off very quickly and greatly improves the application's maintainability.

## Database: PostgreSQL + Drizzle

No surprises here: I chose **[PostgreSQL](https://postgresql.org)** as the primary database. It's the standard for any web application nowadays, with multiple deployment options: [Supabase](https://supabase.com), [Neon](https://neon.tech), or [RDS](https://aws.amazon.com/rds) if you're already an [AWS](https://aws.amazon.com) customer.

For the ORM, I chose **[Drizzle](https://orm.drizzle.team)** over Prisma:

- **Lighter**: Drizzle is a thin layer on top of the SQL driver. No client generator, no Prisma binary to maintain, no heavy abstraction layer.
- **Type-safe**: types are inferred directly from the schema. Drizzle generates exact SQL types, not approximations.
- **Direct SQL writing**: when a query gets complex (CTEs, window functions), you write raw SQL. Drizzle doesn't hide the SQL from you — it strongly types it.

Migrations are managed with **Drizzle Kit**: you modify your schema, run `drizzle-kit generate`, and get clean SQL that you can review manually before applying.

## Authentication: Better Auth

For authentication, I went with **[Better Auth](https://better-auth.com)**. I've tested many different authentication libraries in TypeScript contexts over the years, with mixed results, and Better Auth feels like the most solid solution available today.

- **Framework-agnostic**: works with any framework via its HTTP adapter (h3 for Nitro, but also [Express](https://expressjs.com), [Hono](https://hono.dev), etc.)
- **Database in your schema**: users and sessions live in your own database, not with a third party. You stay in control.
- **Rich ecosystem**: for simplicity, I only use social logins (Google + LinkedIn), which frees the application from managing and securing user passwords. The Better Auth configuration is straightforward and well-documented.

## Payments: Stripe

**Stripe** remains the simplest choice for payments. The **[Checkout](https://stripe.com/payments/checkout)** (subscription creation) + **Customer Portal** (customer self-management) combo covers 90% of needs without writing any payment UI.

Stripe webhooks fit naturally into the modular architecture described above.

## UI & Design: shadcn/vue + Tailwind v4

I build the interface with **[shadcn-vue](https://shadcn-vue.com)** (the [shadcn/ui](https://ui.shadcn.com) port for Vue) and **[Tailwind](https://tailwindcss.com) v4**.

What I like about shadcn:

- **Copy, don't import**: components live in your code, not in a library. You own them, modify them, customize them.
- **Headless with [reka-ui](https://reka-ui.com)**: accessibility is handled by the primitives, the style is yours.
- **Consistent design system**: colors are CSS variables, not hardcoded values. Change the primary palette, the entire theme follows.

## AI: Vercel AI SDK

AI has become a standard ingredient in micro-SaaS products. I use it through the **[Vercel AI SDK](https://sdk.vercel.ai)**, which provides a clean abstraction layer over providers. I'm also exploring equivalent alternatives in parallel — the hexagonal architecture lets me swap implementations painlessly.

A few principles I apply:

- **Specialized agents, not a generalist**: each AI operation has its own prompt, its own output schema, its own preferred model.
- **Versioned prompts**: stored in `server/assets/prompts/`. Like code, they go through Git, code reviews, and automated deployments.
- **Guardrails**: token limit per call, cost limit per user per month, fallback model (if Claude is down, we fall back to GPT).

## Async: Event Bus + Job Queue

A micro-SaaS sometimes handles long-running operations: AI generation, document exports, third-party API sync... Running these synchronously inside an HTTP request risks timeouts and a poor user experience.

My solution: a **business event bus** feeding an **async job queue**. For long-running tasks that can't fit in a synchronous HTTP call, I use an SQS queue that triggers a Lambda function to execute the job asynchronously. A custom-built Nitro plugin routes messages from an SQS queue to the right use case within the Nitro server, running alongside Nuxt's native HTTP routes.

## Emails: Resend

Email is a cross-cutting concern in any micro-SaaS: welcome on signup, profile update confirmation, notifications, follow-ups, invoices... I use **[Resend](https://resend.com)** for all transactional and marketing emails.

Why Resend over AWS SES? SES is powerful but complex to set up (verified domains, DKIM, SPF, sandbox restrictions at the start). Resend integrates in 5 minutes: an API key, a template, and you're done. It also offers its own broadcast service for newsletters and an SDK for fine-grained management of contacts and customer segments for targeted campaigns.

I use the **[vuemail](https://vuemail.net)** library (the [React Email](https://react.email) equivalent for Vue) to compose templates the same way I build the rest of the site.

## Testing & Quality

On a solo or small-team project, the temptation to skip tests is real. I don't take that shortcut — tests are now an indispensable safety net for a good agentic workflow.

My testing stack is fairly standard: [vitest](https://vitest.dev) for unit-testing use cases, [playwright](https://playwright.dev) for end-to-end tests on critical user flows.

On top of that, I noticed several times that the architecture guidelines explicitly stated in the CLAUDE.md file were not always fully respected. I therefore added architecture tests with [ts-arch](https://github.com/ts-arch/ts-arch), which reinforce the agentic workflow with a deterministic check that architecture rules are being followed (module dependency boundaries, for example). Since then, my coding agent consistently produces code that matches my guidelines — correcting itself when it strays.

I round out the workflow with a few standard tools:

- **[ESLint](https://eslint.org)** + **[Prettier](https://prettier.io)**: automatic formatting
- **[simple-git-hooks](https://github.com/toplenboren/simple-git-hooks)** + **[lint-staged](https://github.com/okonet/lint-staged)**: formatting and linting before each commit
- **[commitlint](https://commitlint.js.org)**: enforces conventional commit rules
- **[semantic-release](https://semantic-release.gitbook.io)**: automated versioning and changelog generation

## Hosting: AWS

For convenience, I started with Vercel as my hosting solution. Vercel natively recognizes a Nuxt project on a GitHub repository and deploys it in one click — hard to beat. But with strong AWS expertise, I found myself struggling to accept some of Vercel's plan limitations.

I quickly moved to a self-managed deployment on **AWS** orchestrated by **[CDK](https://aws.amazon.com/cdk)**, with a fairly simple architecture:

- **Lambda (Node 24, ARM64)**: to run the Nitro bundle, billed per millisecond with automatic scaling
- **[CloudFront](https://aws.amazon.com/cloudfront)**: CDN + on-the-fly URL rewriting (via CloudFront Functions)
- **S3**: for storing static assets and backups
- **SQS**: async job queue, with a DLQ for failures
- **[EventBridge](https://aws.amazon.com/eventbridge)**: scheduled crons for background tasks

## Misc

A few additional tools round out the stack:

- **[Dotenvx](https://dotenvx.com)** for secret management: environment files are encrypted per environment, making it safe to commit them to Git. At deploy time, they are synced to AWS Secrets Manager for runtime access by the Lambda function.

- **[Klaro](https://klaro.org)** for consent and cookie management. Lightweight and configurable, it integrates in a few lines and blocks third-party scripts before consent is given.

- **[Honeybadger](https://honeybadger.io)** for error tracking, on both client and server. I get notified the moment an unhandled exception occurs in production. Simple, effective, and without the outrageous pricing of alternatives.

- **[ConfigCat](https://configcat.com)** for feature flags. I use it for progressive feature rollouts, overriding Stripe prices without a deployment, hot-swapping AI models, and managing beta testers. The [OpenFeature](https://openfeature.dev) integration lets me switch providers without touching the code.

## Conclusion

This blueprint is not absolute truth — it's a highly subjective view shaped by my personal journey. I fully understand it won't suit everyone, and that's perfectly fine!

**TL;DR: the stack checklist**

- Framework: Nuxt 4 (full-stack modular monolith, Nitro server)
- Architecture: modular, ports & adapters, Result type, event bus
- DB: PostgreSQL + Drizzle ORM
- Auth: Better Auth (OAuth social)
- Payments: Stripe (Checkout + Portal, feature flags)
- UI: shadcn/vue + Tailwind v4
- AI: Vercel AI SDK (specialized agents, versioned prompts)
- Async: Event bus + job queue (SQS in production)
- Tests: Vitest + Playwright + tsarch
- Hosting: AWS CDK, Lambda, CloudFront, SQS
