---
title: Knowledge, Omni-Channel and Digital Engagement
examSection: service-support
objectives:
  - 'Explain Salesforce Knowledge: articles, record types, data categories and the article lifecycle'
  - 'Control who can see articles through channels and data categories'
  - 'Describe how Omni-Channel routes work to agents using presence, capacity and routing configurations'
  - 'Describe chat and messaging channels and how they connect to Omni-Channel'
  - 'Choose between self-service, agent tools and automation for a service problem'
  - 'Measure service success with the right reports'
youtubeId: null
estMinutes: 35
prerequisites: []
---
## Start here: answer it once, use it a thousand times

Khanyisa Solar's agents answer "How do I reset my inverter?" five times a day. Every agent writes a slightly different answer. Some are wrong.

**Salesforce Knowledge** is a library of approved answers, called **articles**. Agents search it while on a case and attach the right article. Customers can also read articles themselves on a help site, so they do not need to contact anyone. **Omni-Channel** then makes sure the work that does arrive goes to the right agent.

:::key-terms
- **Knowledge article**: a trusted piece of information, such as a how-to or a fix.
- **Article lifecycle**: draft, then published, then archived (optionally with review steps).
- **Data category**: a folder-like label that controls which users see which articles.
- **Channel**: where an article is visible: internal app, partner, customer or public knowledge base.
- **Omni-Channel**: routing of cases, chats and other work to available agents.
- **Presence status**: what an agent is doing (Available, Busy, On Break).
- **Capacity**: how much work an agent can handle at once.
:::

## Knowledge

### Setting it up

- Turn on **Lightning Knowledge**. Articles live in a single **Knowledge object**, and you create different kinds of articles (FAQ, How-to, Troubleshooting) with **record types**.
- Give users the **Knowledge User** feature licence so they can create and manage articles.
- Organise with **data categories** in a hierarchy, such as Product > Inverters > Fault codes.
- Set **channels** to decide where each article appears: **internal app**, **partner**, **customer** (Experience Cloud) or **public knowledge base**.

### The article lifecycle

An article starts as a **draft**. It may go through **review** or an **approval process**. When it is **published**, users can see it. When it is out of date, you **archive** it. When you edit a published article, you create a **new version** from it.

### Using articles on cases

On a case, agents can **search for articles** and **attach** them, and send them to the customer. Reports show which articles resolve the most cases, and which are never used.

:::exam-trap
**Data categories** control **who can see** an article. **Record types** control the **type** of article and its layout. **Channels** control **where** the article is published. These three are often confused.
:::

## Omni-Channel

Omni-Channel routes work so the right person gets it at the right time:

- **Service channels**: the kinds of work that can be routed (cases, chats, leads, custom objects).
- **Routing configurations**: rules that decide how work is routed and priorities, including **capacity**.
- **Queues**: where the work waits until an agent takes it (**queue-based routing**) or until the system pushes it to an agent. **Skills-based routing** matches work to agents with the right skills.
- **Presence statuses**: set by the agent, so Salesforce knows who can take work.
- **Presence configurations**: set each agent's maximum capacity.

An agent in the **Omni-Channel utility** sees new work pop up and accepts it.

:::exam-trap
Omni-Channel needs **a queue, a routing configuration, a service channel and a presence status** for each agent. If agents are not getting work, check those four before anything else.
:::

## Digital channels

- **Messaging**: web chat, in-app chat and messaging apps connect to Salesforce and create **messaging sessions**.
- **Email-to-Case** and **Web-to-Case** (from the case lesson).
- **Phone**: Open CTI or Service Cloud Voice connects phone systems and records calls.
- **Experience Cloud**: a branded self-service site with knowledge, cases and community support.

**Chatbots and AI agents** (see the Agentforce lesson) can answer common questions and **hand off to a human** through Omni-Channel.

## Choosing the right tool

| Situation | Use |
|---|---|
| Customers keep asking the same question | **Knowledge** and a help site |
| Agents re-type the same replies | **Quick Text** or **macros** |
| Work must reach the right agent | **Omni-Channel** |
| A known issue affects many customers | **Case hierarchy** (a parent case with linked child cases) and a **knowledge article** |
| Customers should help themselves | **Experience Cloud** with knowledge |

## Measuring success

- **First response time** and **time to resolve**.
- **Cases by origin, status and age**.
- **Articles used per case** and **self-service deflection** (customers solving problems without a case).
- **Customer satisfaction (CSAT)** survey scores.

:::on-the-job
Treat knowledge like a product: give each article an **owner**, a **review date** and a rule: if an agent finds a wrong answer, they flag it and fix it the same day. A library of outdated articles is worse than none, because agents trust it.
:::

## Recap

- Knowledge articles: draft, published, archived. Lightning Knowledge uses one Knowledge object with record types.
- Data categories = who sees. Channels = where published.
- Omni-Channel routes work by queue, capacity, presence and skills.
- Messaging, email, web, phone and Experience Cloud are ways in. Knowledge, macros and automation are ways to answer faster.
