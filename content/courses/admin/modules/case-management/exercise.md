---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every click.

## Scenario

Khanyisa Solar's support desk receives cases by email and web. Premium customers are promised a one-hour first response. The team wants quick replies and one place to work.

## Your goal

Build a basic case management set-up.

## Before you start

- A Developer Edition org or Trailhead Playground.
- Business hours from the earlier exercise (or create them).

## What to build

1. A **support process** and a Case **record type** with statuses New, Working, Waiting on Customer, Closed.
2. **Web-to-Case** and **On-Demand Email-to-Case**, both creating cases with Origin.
3. Queues **Billing** and **Technical**, a **case assignment rule** that routes by Type, and an **auto-response rule**.
4. An **escalation rule** that reassigns cases open for four business hours.
5. An **entitlement** "Premium Support" with an **entitlement process** and a milestone "First Response 1 hour". Attach it to a test account.
6. Two **macros** (acknowledge and close) and a **Quick Text** snippet.
7. A Lightning **console app** "Service Desk" with a utility bar.
8. Merge two duplicate test cases.

## What you should see when you are done

- [ ] A web case and an email case arrive in the right queue.
- [ ] The customer receives an auto-response.
- [ ] A case under the premium entitlement shows a milestone timer.
- [ ] The console shows several cases in tabs.

## Check your understanding

- [ ] Where do case status values come from?
- [ ] Which rule tells the customer you have their case?
- [ ] What measures the time for milestones and escalations?

## Stretch goal

Add a **case feed** component and a Knowledge component to the case page for faster answers.
