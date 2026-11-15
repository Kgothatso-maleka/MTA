---
title: Flow Builder
examSection: automation
objectives:
  - 'Choose the right flow type: screen, record-triggered, scheduled, platform event or autolaunched'
  - 'Build a flow from its core elements: variables, Get, Create, Update, Decision, Assignment and Loop'
  - 'Explain before-save versus after-save record-triggered flows'
  - 'Handle errors with fault paths, and test with Debug'
  - 'Describe where flows run in the order of execution and why bulk-safe design matters'
  - 'Choose Flow, an approval process or other tools for a scenario, and explain the retirement of Workflow Rules and Process Builder'
youtubeId: null
estMinutes: 50
prerequisites: []
---
## Start here: a recipe the computer follows

When Khanyisa Solar's sales rep marks an Opportunity **Closed Won**, three things should happen: create an Installation record, email the installation manager, and create a task for the finance team. If a human has to remember all three, one will be forgotten.

**Automation** means you write the recipe once, and Salesforce follows it every time. In Salesforce the main tool for this is **Flow**. You build flows by dragging and connecting steps on a canvas, with no code.

:::key-terms
- **Flow**: an automation built in **Flow Builder**.
- **Trigger**: the event that starts a flow, such as a record being created or updated.
- **Element**: one step on the canvas, such as a Decision or an Update Records.
- **Variable**: a named box that holds a value while the flow runs.
- **Resource**: anything the flow can reuse, such as variables, formulas and constants.
- **Fault path**: the road a flow takes when a step fails.
- **Version**: each save creates a version. Only one version of a flow can be **active** at a time.
:::

## What happened to Workflow Rules and Process Builder?

They were the older tools. Salesforce **ended support for Workflow Rules and Process Builder on 31 December 2025** and tells customers to build with **Flow**. Salesforce provides a **Migrate to Flow** tool. You will still meet old workflow rules and processes in real orgs, so you must be able to read them, but **all new automation is built in Flow**.

## The flow types

| Flow type | How it starts | Typical use |
|---|---|---|
| **Screen Flow** | A user clicks a button, link or action | Guided data entry, wizards, call scripts |
| **Record-Triggered Flow** | A record is created, updated or deleted | "When an Opportunity is Closed Won, create an Installation" |
| **Schedule-Triggered Flow** | At a set time, on a schedule | Nightly clean-up, weekly reminders |
| **Platform Event-Triggered Flow** | A platform event message arrives | Reacting to events from other systems |
| **Autolaunched Flow** | Called by something else (another flow, a button, Apex or an API) | Reusable logic, **subflows** |

:::exam-trap
A **screen flow** is the only flow type with screens that a user fills in. If a scenario says "guide the user through a series of questions", the answer is a screen flow. If it says "when a record changes", the answer is a record-triggered flow.
:::

## The building blocks

- **Data elements**: **Get Records** (read), **Create Records**, **Update Records**, **Delete Records**.
- **Logic elements**: **Decision** (choose a path), **Assignment** (set a variable), **Loop** (go through a collection of records one by one), **Collection Sort and Filter**.
- **Interaction**: **Screen** (show fields to a user), **Action** (send an email, post to Chatter, call an invocable action), **Subflow** (run another flow).
- **Wait** (pause until a time or event) in some flow types.
- **Resources**: variables, **formulas**, **constants**, **text templates**.

A **collection variable** holds many records. A **record variable** holds one record. Flows work best when you read all records at once, loop over them, and then **save once at the end**.

## Record-triggered flows: before or after?

When you build a record-triggered flow you choose **when** it runs relative to the save.

- **Fast field updates (before save)**: runs **before** the record is written. It can **update fields on the record that started the flow**, quickly, with no extra database operation. It **cannot** create or update **other** records.
- **Actions and related records (after save)**: runs **after** the record is saved. It can create or update **related records**, send emails and call actions. It needs the record's ID, so it works on records already saved.

You also set **entry conditions**: only run when specific fields meet specific values. And you choose whether it runs when a record is **created**, **updated** or **both**.

:::exam-trap
Use **before-save** to set a field on the same record (fast). Use **after-save** to touch **other** records or send an email. A before-save flow cannot create a related Installation record.
:::

## Handling errors

Things go wrong: a required field is missing, a record is locked, a validation rule fires. Flows give you:

- **Fault paths**: connect a failing element to an error route. There you might create a log record or email an admin, and show a friendly message in a screen flow.
- **Debug**: in Flow Builder click **Debug** to run the flow with test inputs. You can choose to **roll back** changes so no data is saved.
- **Flow error emails**: Salesforce sends an email when a flow fails to the person who last changed it.

Always plan the failure path. A flow that fails silently is worse than one that fails loudly.

## Good habits and limits

- **Bulk-safe design**: records can be loaded in bulk (an import of 200 records at once). **Never put a Get, Create, Update or Delete inside a loop.** Do them once, outside the loop, on a collection. This avoids the governor limits.
- **Keep it simple**: one trigger per object where possible, or a clear entry-condition design, so you know what runs.
- **Name everything** and add a **description**.
- **Test in a sandbox** with realistic volumes.

Salesforce enforces **governor limits** to stop one customer using up shared resources (for example, a cap on the number of database operations per transaction). Good design stays well within them.

### Where flows run in the order of execution

When a record is saved, many things happen in a fixed order. A simplified version:

1. **Before-save flows** run.
2. Before triggers (code) run.
3. **Validation rules** and **duplicate rules** run.
4. The record is saved (not yet committed).
5. After triggers (code) run.
6. Assignment, auto-response and escalation rules run.
7. **After-save flows** run.
8. Roll-up summaries are calculated and everything is committed.

:::exam-trap
**Validation rules run after before-save flows.** A before-save flow can fix a value that would otherwise break a validation rule. And records changed by **after-save flows** go through the process again, so poorly planned flows can trigger each other in a loop.
:::

## Who the flow runs as

- **Record-triggered flows** run in **system context** by default: they can read and write data the triggering user cannot see. Think carefully, because that can expose or change data the user could not touch.
- **Screen flows** can run in user or system context, depending on settings.
- The user needs the right **permissions to run a screen flow**.

## Which tool should I use?

| Need | Use |
|---|---|
| Automate field updates, create records, send emails when data changes | **Record-triggered flow** |
| Guide a user through steps | **Screen flow** |
| Run something on a schedule | **Schedule-triggered flow** |
| Route a record for sign-off by managers | **Approval process** (or an approval flow) |
| Orchestrate a long, multi-person, multi-step process | **Flow Orchestrator** |
| Complex logic that flows cannot do | **Apex** (a developer) |

:::on-the-job
Before you build, **write the rule in one sentence**: "When X happens and Y is true, do Z." If you cannot, you are not ready. Then check what already runs on that object: other flows, validation rules, assignment rules and code. Most flow bugs are two automations fighting each other.
:::

## Screen flows in more detail

- A screen flow is **started by a person**: from a button, a quick action, a Lightning page, a utility bar or a link.
- The **Screen** element shows **components** such as text fields, picklists, file upload, a data table and **Lightning web components**.
- **Variables** carry what the user typed to later elements. Use **Get Records** to pre-fill and **Create/Update Records** to save.
- The **Navigation** buttons are Next, Previous, Pause and Finish. A paused flow can be resumed from the user's paused list.
- **Validate** a screen field with a formula so the user cannot continue with bad input.

:::exam-trap
A screen flow **needs a person to run it**. It cannot be started by a record change or a schedule. If a requirement says "when" something changes, it is not a screen flow.
:::

## Recap

- Flow is the main automation tool. Workflow Rules and Process Builder reached end of support on 31 December 2025.
- Flow types: screen, record-triggered, schedule-triggered, platform event-triggered, autolaunched.
- Before-save = fast updates to the same record. After-save = other records, emails, actions.
- Fault paths and Debug handle errors. Only one version can be active.
- Never place data elements inside a loop. Design for bulk.
- Order: before-save flows, then validation rules, then after-save flows.
