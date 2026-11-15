---
title: Debugging and Deployment
examSection: testing-deploy
objectives:
  - 'Use debug logs, log levels, the Developer Console and System.debug to find problems'
  - 'Choose tools to debug: Apex Replay Debugger, checkpoints, Query Plan and Event Monitoring basics'
  - 'Describe sandbox types and what each is for'
  - 'Describe deployment methods: change sets, Salesforce CLI, Metadata API and packages'
  - 'Explain a safe release path from development to production with source control'
  - 'Explain what happens with tests during deployment'
youtubeId: null
estMinutes: 50
prerequisites: []
---
## Start here: finding and shipping

You will spend as much time **finding** problems and **moving** code as writing it. This module covers both.

:::key-terms
- **Debug log**: a record of what happened during a transaction.
- **Sandbox**: a copy of production for building and testing.
- **Change set**: a point-and-click way to send metadata between connected orgs.
- **Salesforce CLI**: command-line tool for source-driven development.
:::

## Debug logs

- Turn on a **trace flag** for a user (Setup > Debug Logs) or from the Developer Console.
- **Log levels** go from `NONE` to `FINEST` for categories such as Apex Code, Database, Workflow and Validation. More detail means bigger logs, and logs are capped at **20 MB**.
- Use `System.debug(LoggingLevel.ERROR, msg)` to add your own lines.
- Filter the log for `USER_DEBUG`, `SOQL_EXECUTE_BEGIN`, `DML_BEGIN`, `LIMIT_USAGE_FOR_NS`.

## Other tools

| Tool | Use |
|---|---|
| **Developer Console** | Edit code, run tests, view logs, run Execute Anonymous |
| **Apex Replay Debugger** (VS Code) | Step through a recorded log, with variables |
| **Checkpoints** | Capture heap state at a line |
| **Query Plan tool** | See how SOQL will use indexes |
| **Apex Exception Emails / Event Monitoring** | Learn about failures in production |
| **Browser developer tools** | Debug LWC in the browser |

## Handle errors in code

- Use **try/catch** around DML and callouts and **log** failures.
- Use `Database` methods with partial success when one bad row should not block others.
- Use `addError` to stop bad data. Use custom exceptions with clear messages.

## Sandboxes

| Type | Copies | Use |
|---|---|---|
| **Developer** | Metadata only, small storage | One developer's work |
| **Developer Pro** | Metadata only, more storage | Larger dev and testing |
| **Partial Copy** | Metadata plus a **sample** of data | Testing and training |
| **Full** | Metadata and **all data** | Performance and final testing |

- Refresh intervals get longer for bigger sandboxes: Developer and Developer Pro **1 day**, Partial Copy **5 days**, Full **29 days**.
- **Scratch orgs** are short-lived orgs created from source for source-driven development.

## Ways to deploy

| Method | Notes |
|---|---|
| **Change sets** | Point and click, **only between connected orgs**, cannot delete components, no source control |
| **Salesforce CLI** (`sf project deploy start`) | Source-driven, scriptable, works with Git and CI |
| **Metadata API** | The underlying API used by tools |
| **Unlocked / managed packages** | Versioned, upgradable bundles |
| **Third-party DevOps tools** | Copado, AutoRABIT, Gearset and others |

## During deployment

- A **production** deployment that includes Apex runs **local tests** by default, and needs **75% coverage** with all tests passing.
- **Validate** first (a check-only deployment) and then **quick deploy** the validated package to avoid rerunning tests.
- Deploy in the right **order** so dependencies exist: custom objects and fields before code that uses them.
- Not everything is metadata. Custom metadata **records** deploy as metadata, but regular records are **data** and must be loaded separately.

## A safe release path

1. Develop in a **developer sandbox or scratch org**, commit to **Git**.
2. Merge to an integration branch, run **automated tests**.
3. Deploy to **UAT/Partial** sandbox for business testing.
4. **Validate** against production, then deploy in a quiet window.
5. Keep a rollback plan.

:::exam-trap
**Change sets** can only be used between orgs with a **deployment connection** (production and its sandboxes). They cannot delete components. Use the CLI or the Metadata API with a destructive change for removals.
:::

:::on-the-job
Write down the deployment as a checklist: components, manual steps (such as profile settings or flow activation) and rollback. Manual steps that live only in someone's head are what break Friday releases.
:::

## Recap

- Debug with logs, trace flags, log levels, Replay Debugger and Query Plan.
- Sandboxes: Developer, Developer Pro, Partial, Full. Scratch orgs for source-driven work.
- Deploy with change sets, CLI, Metadata API, packages or DevOps tools. Validate then quick deploy.
- Production deployments need tests passing and 75% coverage.
