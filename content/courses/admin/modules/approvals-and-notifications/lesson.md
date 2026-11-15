---
title: Approval Processes, Assignment Rules and Notifications
examSection: automation
objectives:
  - 'Design an approval process: entry criteria, steps, approvers and actions'
  - 'Explain record locking, recall and delegated approvers'
  - 'Use assignment, auto-response and escalation rules'
  - 'Use email alerts, templates and tasks to notify people'
  - 'Choose between an approval process, a flow and other automation for a scenario'
  - 'Avoid common automation mistakes: loops, conflicts and silent failures'
youtubeId: null
estMinutes: 40
prerequisites: []
---
## Start here: the signature on the form

At Khanyisa Solar, any discount above 10% needs the sales manager's signature. Above 25% it also needs the finance director. Today reps WhatsApp a photo of the quote and wait. Some are forgotten. Nobody can prove who agreed.

An **approval process** is the digital signature path. A record is **submitted**, goes to the right **approvers** in order, and ends **approved** or **rejected**, with every step recorded.

:::key-terms
- **Approval process**: an automated way to route a record to people for approval.
- **Entry criteria**: the condition a record must meet to enter the process.
- **Step**: one stage of approval with its own approvers.
- **Approver**: a user, a manager, a queue, or a related user who approves.
- **Approval action**: something that happens automatically on submit, approve or reject (field update, email alert, task, outbound message).
- **Record locking**: while a record awaits approval, it is locked so it cannot be edited.
:::

## How an approval process works

1. **Entry criteria**: for example Discount > 10%.
2. **Submit for approval**: the user clicks Submit (or a flow submits it automatically).
3. **Initial submission actions**: for example lock the record and set Status to Pending.
4. **Approval steps**: each step has its own **criteria** (which records go there) and **approvers**.
5. **Final approval actions** or **final rejection actions**: for example set Status to Approved and send an email.
6. **Recall actions**: if the submitter recalls the request.

### Approvers

A step's approver can be:

- A specific **user**.
- The submitter's **manager** (from the User record's Manager field).
- A **queue** (anyone in the queue may approve).
- A **related user**: a user named in a field on the record.

With several approvers you choose **unanimous approval** (all must approve) or **first response** (the first to respond decides).

### Actions

You can attach these automatic **actions**: **field update**, **email alert**, **task**, and **outbound message**. They run at set points: on submission, on approval, on rejection and on recall.

### Locking and recall

By default a record is **locked** while it awaits approval, so only the approver or an admin can edit it. The submitter can **recall** a request. **Delegated approvers** can act for an approver who is away.

:::exam-trap
If a record needs sign-off by a person in a chain of command, the answer is an **approval process**, not a validation rule and not a flow alone. A flow can **submit** a record for approval, but the approval process does the routing.
:::

### Approving: where can approvers respond?

Approvers can approve or reject from the **Salesforce app, email, Chatter and the mobile app**.

## Assignment, auto-response and escalation rules

These rules work on **leads and cases** (and some other objects), and they are often confused:

- **Assignment rules**: decide the **owner** of a new lead or case, such as route cases about invoices to the Billing queue. A rule has **entries** checked in order, and the first match wins. Only **one** assignment rule per object can be **active**.
- **Auto-response rules**: send an automatic **email reply** to people who submit a lead or case, for example from web-to-lead.
- **Escalation rules** (cases): if a case is not handled in time, **reassign** it or **notify** someone. They use **business hours** to measure time.

:::exam-trap
Remember the three verbs: **assign** (who owns it), **respond** (tell the customer we got it) and **escalate** (it is late). If a case is still open after 4 hours and the manager must be told, that is an **escalation rule**.
:::

## Notifications

- **Email alert**: an email defined in Setup, using an **email template**. It is used by flows, approval processes and rules.
- **Email templates**: Lightning email templates can include **merge fields** that pull in data, such as the customer's name, and be shared through folders.
- **Tasks**: an automated task assigned to a user with a due date.
- **Chatter posts and custom notifications**: alert users in Salesforce or on mobile.

## Picking the right tool

| Scenario | Best fit |
|---|---|
| Route a discount to the manager then the finance director | **Approval process** |
| When an opportunity closes, create a record and email someone | **Record-triggered flow** |
| Give new cases to the right team | **Case assignment rule** |
| Tell the customer we got their case | **Auto-response rule** |
| Escalate unattended cases after four hours | **Escalation rule** |
| Run a complex, multi-department process with stages | **Flow Orchestrator** |
| Complicated logic beyond declarative tools | **Apex** (developer) |

:::exam-trap
The exam often asks what is the **best tool** and gives two that could work. Pick the tool **designed** for the job: approvals for sign-off, assignment rules for owners, escalation rules for late cases, Flow for everything else.
:::

## Mistakes that cost real money

- **Automation loops**: a flow updates a field, which triggers another flow that updates it back. Use entry conditions to stop loops.
- **Two tools doing the same job**: an old process and a new flow both email the customer, so they get two emails.
- **Silent failure**: no one is told when the automation fails. Use fault paths and error emails.
- **No test with real volume**: it works for one record and fails for 5,000.

:::on-the-job
Keep an **automation register**: a simple sheet listing each object, what runs on it, who owns it and why. When something odd happens, you start with the register, not with guessing.
:::

## Recap

- Approval process = sign-off chain. Steps, approvers (user, manager, queue, related user), actions, locking and recall.
- Unanimous or first response when several approvers exist.
- Assignment rules decide owners (one active per object). Auto-response rules reply. Escalation rules chase late cases.
- Email alerts and templates carry notifications.
- Choose the tool designed for the job. Watch for loops, duplicates and silent failure.
