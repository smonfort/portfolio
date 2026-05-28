---
title: Mon blueprint micro-SaaS 2026
description: Un guide technique et pragmatique des choix technologiques pour construire et déployer un micro-SaaS en 2026.
date: 2026-05-27
updatedDate: 2026-05-28
tags:
  - SaaS
  - Architecture
  - Nuxt
  - Blueprint
  - Cloud
slug: blueprint-micro-saas
lang: fr
image: ../img/blueprint.png
---

Lancer un micro-SaaS n'a jamais été aussi accessible qu'en 2026. Aujourd'hui, on peut partir de zéro le matin et avoir un produit facturant des clients le soir. Le problème n'est plus de savoir _si_ on peut le faire, mais par où bien commencer pour construire sur des fondations solides : framework, base de données, authentification, paiements, hébergement, IA...

À l'heure du _vibe coding_, je suis convaincu que les fondamentaux d'architecture logicielle restent plus que jamais d'actualité. Une bonne structure devient même un critère clé pour garantir la pérennité et l'évolutivité d'un produit. Une conception bien pensée et cohérente, c'est ce qui permet aux agents de produire des résultats maitrisés et pérennes.

Cet article vous présente mon blueprint pour la réalisation d'un micro-SaaS : ma stack de prédilection, pourquoi j'ai fait ces choix, et où j'ai parfois changé d'avis. Ce n'est pas une vérité absolue, c'est un point de vue que je sais hautement subjectif, c'est surtout un retour terrain éprouvé sur un micro-SaaS en production.

## Framework : Nuxt

Comme colonne vertébrale, j'ai rapidement choisi **[Nuxt 4](https://nuxt.com)**, le meta-framework [Vue](https://vuejs.org). Je l'avais déjà utilisé sur des projets passés avec de très bons retours, ce choix était naturel. J'y vois les intérêts suivants :

- **Full-stack unifié** : frontend et backend dans le même projet, un typage partagé nativement entre front et back pour une DX optimisée.
- **Rendering hybride** : vous décidez page par page si elle doit être rendue statiquement (utile pour les landing pages, ou articles de blog) ou dynamiquement. Nuxt pré-génère les routes statiques au build, ce qui améliore les performances et donc le référencement naturel.
- **Déployable partout** : Nuxt s'appuie sur [Nitro](https://nitro.unjs.io) qui propose des presets pour Node, des environnements serverless ([Lambda](https://aws.amazon.com/lambda), [Vercel](https://vercel.com), [Netlify](https://netlify.com), [Cloudflare Workers](https://workers.cloudflare.com)), ou même [Docker](https://docker.com). Ceci offre une grande souplesse pour les déploiements qui peut permettre de pivoter rapidement en cas de besoin.
- **Modules officiels** : une collection assez riche de modules supportés officiellement, dont [Nuxt Content](https://content.nuxt.com) qui permet une édition en markdown des pages de contenu éditorial.

Pourquoi pas [Next.js](https://nextjs.org) ? Très bonne question! Next.js est excellent et a pris une part de marché stupéfiante, mais son relatif lock-in avec Vercel me semble problématique. Dès que vous voulez sortir de leur plateforme, tout peut devenir plus complexe. Avec Nuxt et son moteur Nitro, je préserve un contrôle plus fort et un plus grand sentiment d'indépendance. La simplicité de Vue me séduit aussi fortement. Je dois cependant reconnaitre que les agents IA ont une meilleure connaissance des codebases Next/React que Nuxt/Vue, mais rien de rédhibitoire.

## Architecture : monolithe modulaire

La tentation des micro-services est forte, même si la hype n'est plus aussi forte qu'il y a quelques années. Pour un micro-SaaS qui débute, c'est presque toujours une erreur : la complexité distribuée (réseau, cohérence, observabilité) s'ajoute à la complexité métier, et vous passez rapidement plus de temps à connecter des services qu'à livrer des fonctionnalités essentielles.

J'ai donc opté pour un **monolithe modulaire** : une seule codebase dans un monorepo, un seul déploiement, mais une organisation interne stricte qui garde la possibilité d'extraire des services en tant que projets dédiés, si jamais le besoin était avéré.

En pratique, chaque domaine métier du backend Nuxt est un module autonome, par exemple :

```
server/modules/
├── auth/
├── profile/
├── application/
├── subscription/
├── mailing/
└── shared/
```

Chaque module suit une architecture hexagonale (ports & adapters). Je me suis librement inspiré de [ce repository](https://github.com/Sairyss/domain-driven-hexagon) qui reste une référence dont je conseille fortement la lecture. Un module est donc organisé ainsi :

```
server/modules/profile/
├── module.ts                          # Factory
├── core/
│   ├── entities/                      # Types et interfaces métier
│   │   └── user-profile.entity.ts
│   ├── ports/                         # Contrats d'interface
│   │   ├── profile-repository.port.ts
│   │   └── avatar-storage.port.ts
│   └── usecases/                      # Commandes, requêtes, listeners
│       ├── update-profile.command.ts
│       ├── upload-avatar.command.ts
│       └── get-profile.query.ts
└── adapters/
    ├── primary/
    │   └── rest/                      # Entrées HTTP (API routes)
    │       └── profile.adapter.ts
    └── secondary/                     # Implémentations concrètes
        ├── drizzle-profile-repository.adapter.ts
        └── s3-avatar-storage.adapter.ts
```

Le principe fondamental de l'architecture hexagonale est simple mais profond : **le `core` ne connait rien de l'infrastructure**. Les entités, ports et use cases n'importent jamais d'adapter, de framework, ou de librairie externe. C'est le rôle des adapters de faire le pont avec le monde extérieur.

- **Les adapters primaires** (dans `adapters/primary/`) sont les points d'entrée qui _conduisent_ l'application : contrôleurs REST, listeners [SQS](https://aws.amazon.com/sqs), commandes CLI... Ils reçoivent des stimuli externes, les traduisent en appels de use cases, et formatent la réponse. Si vous changez de protocole de transport (REST → GraphQL → WebSocket par exemple), seul ce répertoire change, le core reste inchangé. Dans notre cas, les routes d'API Nuxt importent un adapter primaire REST d'un module.
- **Les adapters secondaires** (dans `adapters/secondary/`) sont les points de sortie _conduits par_ l'application : repositories [Drizzle](https://orm.drizzle.team) pour l'accès à la base de données, clients [Stripe](https://stripe.com), stockage de type [S3](https://aws.amazon.com/s3), envoi d'emails... Ils implémentent les ports définis dans le core et sont injectés dans la factory du module. Si vous passez de Stripe à PayPal ou de Drizzle à [Prisma](https://prisma.io), seul ce répertoire change. Le coeur métier, une nouvelle fois, reste inchangé.

Les **ports** décrivent le contrat attendu par le domaine sous forme de simple interface.

```ts title="server/modules/profile/core/ports/profile-repository.port.ts"
export interface ProfileRepository {
  findByUserId(userId: string): Promise<UserProfile | null>;
  save(profile: UserProfile): Promise<void>;
}
```

Le domaine est ainsi très facilement testable et les adapters interchangeables sans toucher à la logique métier.

Les **usecases** sont des classes qui implémentent un cas d'usage métier et orchestrent les différents ports. Concrètement, un use case implémente une méthode `run()` retournant un `Result<Ok, Err>` via [`ts-results-es`](https://github.com/lune-climate/ts-results-es). Ce typage explicite est utile pour forcer le traitement des erreurs par l'appelant (ce que des exceptions traditionnelles ne permettent pas), renforçant aussi la robustesse globale de l'application. Les développeurs Rust, entre autres, me comprennent bien.

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

Enfin, **les modules peuvent communiquer entre eux via un bus d'events**, ce qui permet un meilleur découplage.

Cette architecture a un coût initial que l'on ne peut contester : plus de fichiers, plus de boilerplate, plus de couches. Cependant, cette douleur est devenue marginale depuis que les agents de génération de code produisent ces structures quasi instantanément. À mon sens, cet investissement est très rapidement rentabilisé et renforce grandement la maintenabilité de l'application.

## Base de données : PostgreSQL + Drizzle

Pas de surprise : j'ai choisi **[PostgreSQL](https://postgresql.org)** comme base de données principale. C'est la référence pour toute application web désormais, avec de multiples options de déploiement possibles : [Supabase](https://supabase.com), [Neon](https://neon.tech), ou [RDS](https://aws.amazon.com/rds) par exemple si vous êtes déjà client d'[AWS](https://aws.amazon.com).

Pour l'ORM, j'ai choisi d'utiliser **[Drizzle](https://orm.drizzle.team)** plutôt que Prisma :

- **Plus léger** : Drizzle est une surcouche fine sur le driver SQL. Pas de générateur de client, pas de binaire Prisma à maintenir, pas de couche d'abstraction lourde.
- **Type-safe** : les types sont inférés depuis le schéma. Drizzle génère les types SQL exacts, pas des approximations.
- **Écriture SQL directe** : quand une requête devient complexe (CTE, fenêtrage), vous écrivez du SQL brut. Drizzle ne vous cache pas le SQL, il le type fortement.

Les migrations sont gérées avec **Drizzle Kit** : vous modifiez votre schéma, vous lancez `drizzle-kit generate`, vous obtenez du SQL propre, validable manuellement avant application.

## Authentification : Better Auth

Pour l'authentification, mon choix s'est tourné vers **[Better Auth](https://better-auth.com)**. J'ai testé beaucoup de librairies d'authentification différentes dans un contexte Typescript sur ces dernières années, avec des succès variés, et Better Auth me semble à ce jour la solution la plus solide.

- **Framework-agnostique** : fonctionne avec n'importe quel framework via son adapter HTTP (h3 pour Nitro, mais aussi [Express](https://expressjs.com), [Hono](https://hono.dev), etc.)
- **Base de données dans votre schéma** : les users et sessions sont dans votre propre base, pas chez un tiers. Vous gardez le contrôle.
- **Ecosystème varié** : par simplicité, j'ai choisi de n'utiliser que des login sociaux (Google + LinkedIn), ce qui libère l'application de la gestion et de la sécurisation des mots de passe utilisateurs. La configuration Better Auth est simple et bien documentée.

## Paiements : Stripe

**Stripe** reste le choix le plus simple pour les paiements. Le combo **[Checkout](https://stripe.com/payments/checkout)** (création d'abonnement) + **Customer Portal** (gestion par le client) couvre 90 % des besoins sans écrire de UI de paiement.

Les webhooks Stripe sont implémentés assez naturellement dans l'architecture modulaire décrite précédemment.

## UI & Design : shadcn/vue + Tailwind v4

Je construis l'interface avec **[shadcn-vue](https://shadcn-vue.com)** (port de [shadcn/ui](https://ui.shadcn.com) pour Vue) et **[Tailwind](https://tailwindcss.com) v4**.

Ce que j'apprécie avec shadcn :

- **Copiable, pas importable** : les composants sont dans votre code, pas dans une lib. Vous les modifiez, vous les personnalisez, vous les possédez.
- **Headless avec [reka-ui](https://reka-ui.com)** : l'accessibilité est gérée par les primitives, le style est le vôtre.
- **Design system cohérent** : les couleurs sont des variables CSS, pas des valeurs en dur. Vous changez la palette primaire, tout le thème suit.

## IA : Vercel AI SDK

L'IA est devenue un ingrédient standard des micro-SaaS. Je l'utilise via le **[Vercel AI SDK](https://sdk.vercel.ai)**, qui fournit une couche d'abstraction propre par-dessus les providers. J'explore en parallèle d'autres solutions équivalentes, l'architecture hexagonale me permet de switcher d'implémentation sans douleur.

Quelques principes que j'applique :

- **Agents spécialisés, pas un agent généraliste** : chaque opération IA a son propre prompt, sa propre structure de sortie, son propre modèle de prédilection.
- **Prompts versionnés** : dans `server/assets/prompts/`. Comme du code, ils passent par Git, par des reviews, et des déploiements automatisés.
- **Garde-fous** : limite de tokens par appel, limite de coût par user par mois, fallback model (si Claude est down, on passe sur GPT).

## Async : Event Bus + Job Queue

Un micro-SaaS manipule parfois des opérations longues : générations IA, exports de documents, synchronisation avec des API tierces... Les faire de manière synchrone dans une requête HTTP, c'est risquer le timeout et une mauvaise expérience utilisateur.

Ma solution : un **bus d'events métier** qui alimente une **queue de jobs asynchrones**. Pour les traitements longs qui ne sont pas compatibles avec un appel synchrone HTTP, j'utilise une file SQS qui lance une fonction Lambda pour exécuter le job de manière asynchrone. Un plugin Nitro développé spécifiquement m'a permis d'acheminer les messages provenant d'une file SQS vers le bon use case au sein du serveur Nitro, en parallèle des routes HTTP gérées nativement par Nuxt.

## Emails : Resend

L'envoi d'emails est un besoin transverse dans un micro-SaaS : bienvenue à l'inscription, confirmation de mise à jour de profil, notifications, relances, factures... J'utilise **[Resend](https://resend.com)** pour toute la partie transactionnelle et marketing.

Pourquoi Resend plutôt qu'AWS SES ? SES est puissant mais complexe à configurer (domains verified, DKIM, SPF, sandbox au départ). Resend s'intègre en 5 minutes : clé API, un template, c'est prêt. Il propose aussi son propre service de broadcast pour les newsletters et un SDK qui permet de gérer finement les contacts et les segments clients pour des communications ciblées.

J'utilise la librairie **[vuemail](https://vuemail.net)** (l'équivalent de [React Email](https://react.email) pour Vue) pour composer les templates de la même façon que les autres pages du site.

## Tests & Qualité

Pour un projet solo ou en petite équipe, la tentation de sauter les tests est grande. Je ne prends pas ce raccourci, les tests sont désormais un garde-fou indispensable d'un bon harnais agentique.

Ma stack de tests est relativement classique : [vitest](https://vitest.dev) pour les tests unitaires des use cases, [playwright](https://playwright.dev) pour les tests end-to-end pour les parcours critiques.

En complément, j'ai remarqué à plusieurs reprises que les guidelines d'architecture pourtant explicitées dans le fichier CLAUDE.md n'étaient parfois pas totalement respectées. J'ai donc ajouté des tests d'architecture avec [ts-arch](https://github.com/ts-arch/ts-arch) qui permettent de renforcer le harnais agentique avec une vérification déterministe de la bonne application des règles d'architecture (dépendances entre modules par exemple). Depuis, mon agent de code produit systématiquement du code conforme à mes recommandations, en se corrigeant de lui-même s'il fait un écart de conduite.

```ts title="tests/arch/hexagonal.test.ts"
describe('Hexagonal layers', () => {
  test('core files must not depend on adapters', async () => {
    const rule = filesOfProject(TSCONFIG)
      .inFolder('core')
      .shouldNot()
      .dependOnFiles()
      .inFolder('adapters');
    const violations = await rule.check();
    expect(violations, fmt(violations as FileDep[])).toHaveLength(0);
  });
});
```

Je complète le workflow avec quelques solutions classiques :

- **[ESLint](https://eslint.org)** + **[Prettier](https://prettier.io)** : formatage automatique
- **[simple-git-hooks](https://github.com/toplenboren/simple-git-hooks)** + **[lint-staged](https://github.com/okonet/lint-staged)** : formatage et linting avant chaque commit
- **[commitlint](https://commitlint.js.org)** : application des règles conventional commits
- **[semantic-release](https://semantic-release.gitbook.io)** : versioning automatique et génération du changelog

## Hébergement : AWS

Par facilité, j'ai commencé en utilisant Vercel comme solution d'hébergement. Vercel reconnait automatiquement un projet Nuxt sur un repository Github, il le déploie en un clic avec une configuration adaptée, imbattable. Ayant une très bonne maitrise d'AWS, j'ai eu malgré tout quelques difficultés à accepter les limitations apportées par Vercel sur ces différents plans.

Je suis passé rapidement sur un déploiement autogéré sur **AWS** piloté par **[CDK](https://aws.amazon.com/cdk)**, avec une architecture relativement simple :

- **Lambda** : pour exécuter le bundle Nitro avec une facturation à l'usage et un free tiers généreux
- **[CloudFront](https://aws.amazon.com/cloudfront)** : CDN + rewriting d'URL à la volée via des CloudFront Functions
- **S3** : pour le stockage des assets statiques et des backups
- **SQS** : queue de jobs asynchrones
- **[EventBridge](https://aws.amazon.com/eventbridge)** : crons programmés pour les tâches de fond qui déclenchent des lambdas

## Misc

Pour avoir un système totalement fonctionnel, j'ai également utilisé les solutions suivantes :

- **[Dotenvx](https://dotenvx.com)** pour la gestion des secrets : les fichiers d'environnement sont chiffrés ce qui permet de les commiter sur Git sans danger. Au déploiement, ces fichiers sont synchronisés vers AWS Secrets Manager pour une lecture au runtime par la fonction Lambda.

- **[Klaro](https://klaro.org)** pour la gestion du consentement et des cookies. Léger, configurable, il s'intègre en quelques lignes et gère le blocage des scripts tiers avant consentement.

- **[Honeybadger](https://honeybadger.io)** pour le suivi d'erreurs, côté client comme côté serveur. Je reçois une notification dès qu'une exception non gérée se produit en production. Simple, efficace, sans les prix délirants des alternatives.

- **[ConfigCat](https://configcat.com)** pour les feature flags. J'y gère l'activation progressive des fonctionnalités, la configuration à chaud des modèles d'IA utilisés, et les bêta-testeurs. L'intégration native avec [OpenFeature](https://openfeature.dev) permet de changer de fournisseur sans toucher au code.

## Conclusion

Ce blueprint n'est pas une vérité absolue et reste une vision très subjective qui est le fruit de mon parcours personnel sur ces vingt dernières années. Je comprends parfaitement qu'il ne conviendra pas à tous, ce n'est en rien l'objectif!

**TL;DR : mon blueprint micro-SaaS 2026**

- Framework : Nuxt 4, full-stack modular monolith, Nitro server
- Architecture : modulaire, ports & adapters, Result type, event bus
- BDD : PostgreSQL + Drizzle ORM
- Auth : Better Auth avec OAuth social
- Paiements : Stripe, Checkout + Portal, feature flags
- UI : shadcn/vue + Tailwind v4
- IA : Vercel AI SDK, agents spécialisés, prompts versionnés
- Async : Event bus + job queue avec SQS
- Tests : Vitest + Playwright + tsarch
- Hébergement : AWS CDK, Lambda, CloudFront, SQS, Secrets Manager
