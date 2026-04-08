---
title: Introduction to Durable Execution with Temporal
description: Durable execution promises reliable, fault-tolerant program execution. Temporal is its most accomplished implementation — illustrated here with a prototype inspired by a real-world use case.
date: 2026-04-08
updatedDate: 2026-04-08
tags:
  - Workflow
  - Architecture
  - Resilience
  - Temporal
  - as-code
slug: temporal-durable-execution
image: ../img/temporal-logo.png
lang: en-US
---

Writing a program that manages an interruptible process is far harder than it looks. As soon as a workflow runs for more than a few seconds — waiting for an external response, nudging a user, or requiring human approval — the code fills up with defensive logic: timeout handling, error recovery, state persistence, exponential edge cases, idempotency management... That's where bugs accumulate and accidental complexity takes over.

That's exactly the problem **durable execution** is designed to solve.

## Durable execution: fault-tolerant program execution

_Durable execution_ is an execution model that guarantees a program survives failures: server restarts, network timeouts, third-party service outages. Program state is automatically persisted, and execution resumes exactly where it left off — without the developer having to manage any of that explicitly.

Concretely, this delivers three things:

- **Reliability**: the process is fault-tolerant without any additional defensive code
- **Simplicity**: the code expresses what the process should do, not what might go wrong
- **Velocity**: large swaths of error-handling and state-persistence logic simply disappear

## Temporal: the reference implementation

This concept brings back memories of my experience with BPM-style solutions from the late 2000s. The idea was appealing on paper: visually model processes, orchestrate human and automated tasks, manage state, and so on. But the tools of that era were bloated (to put it mildly), hard to operationalize, and far removed from an _as-code_ philosophy.

Over the years, I kept sensing that a BPM-style solution could address real business problems for my clients. I stayed on top of tools like [Activiti](https://www.activiti.org/), but never found the right context to deploy them at scale.

[Temporal](https://temporal.io/) feels like a return to those promises — but with a radically different approach: workflows are written in the language of your choice (Go, TypeScript, Java, Python...), run like ordinary code, and transparently benefit from all the guarantees of durable execution. No BPMN XML to define, no mandatory graphical designer — just versioned, testable code.

## Temporal architecture overview

At a high level, Temporal's architecture is split into two parts: the Temporal cluster and the user-side applications.

![Temporal Architecture](../img/temporal-cloud-architecture.png)

The Temporal cluster can be deployed on-premise, in your cloud environment, or via the Temporal Cloud offering. It handles persisting workflow state and dispatching work to the various workers.

On the user side, workers execute your workflows and activities under the direction of the Temporal cluster. To start a workflow or query a running one, your application uses the Temporal SDK, which communicates with the cluster over gRPC.

## Use case: a loan application

To explore Temporal hands-on, I built a [loan application prototype](https://github.com/smonfort/temporal-funding-demo) in TypeScript. The scenario is deliberately simple, but it illustrates the tool's capabilities well: it's a potentially long-running process that combines automated steps with human approval.

The minimal business process follows these steps:

1. **Application submission**: the applicant submits their request with personal details, the project to be financed, and supporting documents
2. **Document verification**: the system checks whether the file is complete; if documents are missing, it follows up with the applicant by email every 24 hours for a week
3. **Fraud analysis**: once the file is complete, a third-party service assesses the risk
4. **Validation**: low-amount applications are approved automatically; above a threshold, human review is required

This kind of process feels like a natural fit for a _durable execution_ design: several days can pass between submission and final decision, with asynchronous interactions at every step and multiple sources of both technical and business errors.

## Prototype architecture

The prototype runs on a Temporal server started in development mode using a `docker-compose` configuration.

A **REST API** built with [Fastify](https://fastify.dev/) handles creating funding requests. Each request starts a workflow using the [Temporal TypeScript SDK](https://docs.temporal.io/develop/typescript). The API interacts with running workflows through Temporal's two fundamental mechanisms:

- **Signals**: to send an event to a running workflow — for example, notifying it that a document has been uploaded or that a human reviewer has approved the request.
- **Queries**: to read the current state of a workflow without interrupting it — for example, listing requests pending review.

The API also allows uploading missing documents, listing pending validation requests, and approving or rejecting an application.

The Temporal admin console provides full visibility into workflow execution: event history, current state, duration, and any errors. It's a significant asset for debugging and operational monitoring.

## Walkthrough

Let's walk through the prototype, starting by cloning the GitHub repository.

```sh
git clone https://github.com/smonfort/temporal-funding-demo.git
```

Start the Temporal cluster in the background. Persistence is handled via a local volume.

```sh
docker-compose up -d
```

Then start the loan application service.

```sh
pnpm install
pnpm start
```

Now that the application is running, let's try a simple happy-path example first: a complete funding request where the fraud check returns no errors and the amount is below the human review threshold. Per our design, the request is approved automatically. Let's submit it to the API.

```sh
curl -s -X POST http://localhost:3000/funding-requests \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-001",
    "userEmail": "alice@example.com",
    "amount": 250,
    "purpose": "Purchase of computer equipment",
    "documents": ["identity", "income_proof", "bank_statement"]
  }' | jq .
```

The API returns a 200 response with the ID of the created workflow.

```json
{
  "id": "76b85a27-51c8-4738-9ec0-3088b8e46041",
  "status": "INITIATED",
  "message": "Request created and workflow started."
}
```

The Temporal admin console is available at: http://localhost:8233/
The _Workflows_ section shows this workflow with a `Completed` status.

![Workflow completed](../img/workflow-completed.png)

The workflow detail view shows each activity in a chronological timeline, with input and output data for each one. Notice the `checkFraud` activity, where a stub simulates a slight delay — which explains the time spent there.

![Workflow details](../img/workflow-completed-details.png)

Now let's try a second example. A funding request is submitted with incomplete documentation. The applicant is followed up with until all required documents are provided.

Let's submit a new incomplete request (missing a valid identity document).

```sh
curl -s -X POST http://localhost:3000/funding-requests \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-002",
    "userEmail": "bob@example.com",
    "amount": 300,
    "purpose": "Vacations",
    "documents": ["income_proof", "bank_statement"]
  }' | jq .
```

The console shows a new workflow with a `Running` status.

![Running workflow](../img/workflow-running.png)

The workflow detail shows that an activity was executed to send an email to the applicant, and a timer was started. After 24 hours with no response, a new email will be sent.

![Waiting workflow details](../img/workflow-waiting.png)

The applicant responds before those 24 hours are up and submits the missing document — an action we can simulate with this API call.

```sh
curl -s -X POST "http://localhost:3000/funding-requests/1f3b60a6-d717-43d5-9815-b08ed851d5ed/documents" \
  -H "Content-Type: application/json" \
  -d '{
    "documents": ["identity", "income_proof", "bank_statement"]
  }' | jq .
```

The API sends a signal to the workflow, which resumes execution: the documents are now complete, the fraud check passes, and the request is automatically closed.

![Workflow completed after update](../img/workflow-completed-after-update.png)

## Conclusion

We've only scratched the surface of what Temporal can do. For me, it stands out as the most elegant and modern solution I've tried for orchestrating durable, reliable business processes. The workflow-as-code approach is a significant improvement over traditional BPM tools: the code is readable, testable, and versioned alongside the rest of the project. Give it a try!
