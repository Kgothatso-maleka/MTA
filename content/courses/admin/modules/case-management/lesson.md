---
title: Case Management and Service Cloud Basics
examSection: service-support
objectives:
  - 'Describe a case, its key fields, support process and status values'
  - 'Capture cases from email, the web, phone and chat'
  - 'Route cases with queues and assignment rules, and chase them with escalation rules'
  - 'Set up entitlements, service contracts and milestones'
  - 'Use case teams, comments, merging and closing correctly'
  - 'Build a service console that helps agents resolve cases fast'
youtubeId: null
estMinutes: 45
prerequisites: []
---
## Start here: the customer who is waiting

A Khanyisa Solar customer in Polokwane emails: "My inverter shows an error and my system stopped." That email is the start of a **case**: a record of a customer's problem, from the first message until it is solved.

Service teams need to know three things at every moment: **what is the problem**, **who owns it**, and **how long has it been waiting**. Case management in Service Cloud answers all three.

:::key-terms
- **Case**: a customer's question, problem or request.
- **Case status**: where the case is (New, Working, Escalated, Closed).
- **Support process**: the list of case statuses used by a record type.
- **Queue**: a shared list of cases a team picks from.
- **Entitlement**: what support a customer is owed (for example response in 2 hours).
- **Milestone**: a required step with a deadline in an entitlement process (first response, resolution).
- **Service Console**: an app that lets agents work on many records in tabs.
:::

## The case record

Important case fields: **Case Number** (auto-numbered), **Status, Priority, Origin** (Email, Phone, Web), **Type, Reason, Subject, Description, Contact** and **Account**, and **Owner**.

- A case can be linked to a **contact** and an **account**.
- **Case comments** record notes. They can be **public** (visible to the customer) or **internal**.
- A **case hierarchy** links parent and child cases (for example one outage with many reports).
- **Case teams** let several people with roles work on a case together.
- **Related records**: assets, products, knowledge articles and emails.

### Status and support process

Each **record type** for Case can have its own **support process**: a list of **Status** values. For example, a simple process might use New, Working, Waiting on Customer, Closed. Mark which statuses count as **Closed**.

:::exam-trap
Case status values come from a **support process**, the same way opportunity stages come from a **sales process**. Both are attached to a **record type**.
:::

## Capturing cases

| Channel | How it works |
|---|---|
| **Email-to-Case** | Emails to a support address become cases. **On-Demand Email-to-Case** runs in Salesforce and needs no software on your servers. |
| **Web-to-Case** | An HTML form on your website creates cases. It can create up to **5,000 cases per day**. |
| **Phone** | Agents create cases manually, often with a softphone (Open CTI). |
| **Chat and messaging** | Customers chat with an agent through Messaging for web, WhatsApp and other channels. |
| **Experience Cloud** | Customers log in to a portal to create and follow cases. |

## Routing and chasing

- **Queues**: a team shares a queue such as Billing. Members take cases from it.
- **Case assignment rules**: automatically set the owner, often to a queue, based on criteria. Only one rule can be active.
- **Auto-response rules**: tell the customer you have their case.
- **Escalation rules**: if a case is still open after a set time (measured in **business hours**), **reassign** it or **notify** someone.
- **Omni-Channel** routes work to agents by capacity and skill (see the next lesson).

:::exam-trap
Do not mix up the three rules: **assignment** = who owns it. **Auto-response** = tell the customer. **Escalation** = it is late.
:::

## Entitlements and milestones: promises to customers

Some customers pay for premium support with promised response times. Salesforce models this:

1. **Service contract** (optional): the agreement with the customer.
2. **Entitlement**: what support they get, linked to an account, contact or asset.
3. **Entitlement process**: the timeline of **milestones** such as "First response within 1 hour" and "Resolve within 8 hours".
4. **Milestone actions**: automatic actions at the warning time, at violation and on success.

The case shows a **milestone tracker** counting down. Timelines use **business hours**.

## Working cases well

- **Merge cases**: combine duplicates into one master case (the others are closed or archived). You can merge a few cases at once.
- **Email in the case**: replies are tracked on the case feed.
- **Macros**: one-click automation of repeated steps, such as send an email, update status and add a comment.
- **Quick Text**: pre-written snippets agents insert into replies.
- **Close the case** with a status in the support process, and collect feedback.

## The Service Console

A **Lightning console app** lets agents work on many records, using **tabs and subtabs** with a **utility bar** (phone, macros, history, notes). Agents see the case, the customer, related records and **knowledge** in one place.

:::on-the-job
Measure **first response time**, **time to resolve**, and **cases reopened**. If agents are slow, watch the screen before blaming people: often the page needs fewer fields, a knowledge component and a few macros.
:::

## Recap

- Cases come from email, web, phone, chat and portals. Web-to-Case: up to 5,000 a day.
- Support process = case status values for a record type.
- Queue = shared list. Assignment rule = owner. Auto-response = tell customer. Escalation rule = late.
- Entitlements and milestones track promises to customers using business hours.
- Macros, Quick Text and the console speed agents up.
