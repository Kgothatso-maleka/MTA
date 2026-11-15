---
title: Agentforce Fundamentals
examSection: agentforce-ai
objectives:
  - 'Explain what an AI agent is and how it differs from a chatbot, a flow and a prompt'
  - 'Describe the parts of an agent: instructions, topics (subagents), actions and channels'
  - 'Choose action sources: flows, prompt templates, Apex and APIs'
  - 'Describe the agent lifecycle: plan, build, test, deploy, monitor'
  - 'Explain how an agent gets its permissions and why data access must be controlled'
  - 'Decide when an agent is the right tool, and when a flow, approval or validation rule is better'
youtubeId: null
estMinutes: 40
prerequisites: []
---
## Start here: a new team member who never sleeps

Imagine hiring a very fast junior assistant for Khanyisa Solar's service desk. You give them written guidance ("help with inverter faults, never promise refunds"), a set of tools they may use ("look up an order", "create a case"), and a login that limits what they can see. They answer customers around the clock, and hand over to a person when stuck.

That is an **AI agent**. **Agentforce** is Salesforce's platform for building, testing and running agents on top of your **own Salesforce data and automation**.

:::key-terms
- **Agent**: an AI assistant that understands a request in everyday language, decides what to do, and takes actions.
- **Agentforce**: Salesforce's platform for agents.
- **Topic**: a job the agent can do, with instructions and the actions it may use. In newer releases topics are being renamed **subagents**.
- **Instructions**: plain-language rules about how the agent should behave.
- **Action**: something the agent can do, such as look up a record or update a case.
- **Channel**: where users reach the agent (web chat, messaging, Slack, employee apps).
- **Grounding**: giving the agent real company data, so answers rely on facts instead of guesses.
- **Guardrails**: limits that keep the agent safe and on task.
:::

## Agent, chatbot, flow, prompt: what is the difference?

| Tool | Behaviour |
|---|---|
| **Rule-based chatbot** | Follows a fixed script with set choices |
| **Flow** | Follows the steps **you** drew, the same way every time |
| **Prompt template** | One request to a language model, producing text |
| **Agent** | Understands the request, **chooses** which topic and actions to use, and may take several steps |

:::exam-trap
An agent does not replace your automation. It **calls** it. The favourite exam fact: **agent actions can be built from flows, prompt templates, Apex and APIs**. Your existing declarative work (a refund flow, a case-summary prompt) becomes something an agent can use.
:::

## The parts of an agent

1. **Role and instructions**: who the agent is and what it must and must not do.
2. **Topics (subagents)**: each topic is a job, such as "Order status" or "Fault diagnosis". A topic has a **description** (so the agent can choose it), **instructions** and a list of **actions**.
3. **Actions**: the agent's tools. Each action has a clear **name and description** so the language model knows when to use it.
4. **Channels**: where conversations happen.
5. **Data and grounding**: the knowledge and records the agent may use.

### Writing good topics

- **One clear job per topic.** Overlapping topics confuse the agent.
- A **clear description** is what the agent uses to decide: "Answer questions about the status of a customer's order."
- Instructions should be **specific and short**. Say what to do, and say what to refuse.
- Give each action a **plain description** of what it does and what it needs.

## Where actions come from

- **Flows**: the most common source for admins. An autolaunched flow or screen-free flow can look up or update records.
- **Prompt templates**: for writing or summarising text.
- **Apex**: custom code from a developer.
- **APIs and external services**: connect other systems.
- **Standard actions** that Salesforce provides for common tasks.

Whatever the source, an action needs **clear inputs and outputs**, and it must respect **security**.

## Types of agent and where they work

- **Service agent**: talks to customers, for example on a website or messaging, and can hand over to a human through **Omni-Channel**.
- **Employee agent**: helps internal users inside Salesforce or other apps, for example summarising a customer or finding information.
- **Agent API**: lets other applications talk to an agent outside the standard channels.

## Who is the agent, security-wise?

An agent acts as a **user**. That user has a **profile and permission sets**, and the agent can only see and change what that user can see and change. This is the same layered access model you learnt earlier.

- Give an agent **only the permissions it needs** (least privilege).
- Be careful with **system-context flows** used as actions: they can touch data the agent's user could not.
- For customer-facing agents, think about what the customer is **allowed** to learn.

:::exam-trap
If an agent returns data it should not, the problem is almost never "the AI is rude". It is **too many permissions** on the agent's user, an action that runs in **system context**, or **grounding** on data that was too broad. Fix access first.
:::

## The agent lifecycle

1. **Plan**: pick a use case with clear value and risk. Write the topics, actions and what the agent must refuse.
2. **Build**: create the agent in **Agentforce Builder** (the older version is called Agent Builder). Add topics, instructions and actions.
3. **Test**: use the **conversation preview** and the **Testing Center** to run batches of test requests before release. Check right answers, refusals and edge cases.
4. **Deploy**: build and test in a **sandbox**, then move to production. Choose channels, and set up **human handover**.
5. **Monitor and improve**: use analytics and feedback, review conversations, and refine instructions. Plan for **ongoing testing** as the agent changes.

## When to use an agent, and when not to

Use an agent when requests are **varied and in natural language** and the answer needs **several steps** and company data: "Where is my installation, and can you move it to next Tuesday?"

Do **not** use an agent when a **fixed rule** is needed:

- A **compliance decision** that must be exactly the same every time: use a **validation rule, an approval process, or a flow**.
- A task that is **100% predictable**: use a **record-triggered flow**.
- A rule that must **block** an action: use a **validation rule**.

:::on-the-job
Start small: one narrow job, such as "answer order-status questions", with a handover to a human. Test with 30 real past questions. Only widen the scope when the first job works. A narrow, boring agent that is right 98% of the time beats a clever one that is right 80%.
:::

## Recap

- An agent chooses topics and actions in plain language and may take several steps. A flow always follows fixed steps.
- Parts: instructions, topics (subagents), actions, channels, grounding.
- Actions come from flows, prompt templates, Apex and APIs.
- An agent acts as a user, so permissions limit its access.
- Lifecycle: plan, build, test (conversation preview and Testing Center), deploy, monitor.
- Use rules, approvals and validation for decisions that must never vary.
