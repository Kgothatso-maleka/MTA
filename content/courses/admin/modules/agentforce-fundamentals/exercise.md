---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every click.

## Scenario

Khanyisa Solar wants an agent that answers "Where is my installation?" and "What is the status of my case?" for customers, and hands over to a person when it is stuck.

## Your goal

Plan, build and test a small service agent, with safe permissions.

## Before you start

- A Developer Edition or Trailhead org with **Agentforce** enabled (see Trailhead for a free playground).
- The Installation object and Case from earlier exercises, with a few test records.

## What to build

1. Write a one-page **plan**: the use case, two topics, what the agent must **refuse**, and the handover rule.
2. Create an **autolaunched flow** "Get Installation Status" that looks up an installation by customer email and returns Status and Planned Date.
3. Create the agent. Add topics **Installation Status** and **Case Status**, with clear descriptions and short instructions. Add the flow as an **action** and a standard case lookup action.
4. Create a **user and permission set** for the agent with **only** the object and field access it needs.
5. Use the **conversation preview** to try 10 questions, including 3 off-topic and 2 that ask for someone else's data.
6. Use the **Testing Center** to run the same questions as a batch.
7. Configure a **human handover** with Omni-Channel and list the monitoring metrics you would watch.

## What you should see when you are done

- [ ] The agent answers status questions using your flow.
- [ ] Off-topic and unauthorised requests are refused or handed over.
- [ ] The agent's user cannot read fields you did not grant.
- [ ] You can explain why you chose an agent for this and not a plain flow.

## Check your understanding

- [ ] Which four sources can an action come from?
- [ ] Why must the agent's user have least privilege?
- [ ] Which tool runs a batch of test requests before release?

## Stretch goal

Add a third topic that you deliberately **do not** build, and write down which tool (flow, approval or validation rule) should handle it instead and why.
