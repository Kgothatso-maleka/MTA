---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every click.

## Scenario

Khanyisa Solar needs sign-off on big discounts. Cases from commercial customers must go to a senior team and customers must get an immediate acknowledgement. Cases still open after four hours must be escalated.

## Your goal

Set up an approval process, case rules and notifications.

## Before you start

- A Developer Edition org or Trailhead Playground.
- A Discount % field on Opportunity (create it if needed) and two test users, one of them the manager of the other.

## What to build

1. An **approval process** on Opportunity: entry criteria Discount % > 10. Step 1 goes to the submitter's **manager**. Step 2 (Discount % > 25) goes to a **queue** called Finance Approvers.
2. Actions: lock the record on submission, a **field update** to Approved on final approval, and an **email alert** on rejection.
3. Submit an opportunity, approve it as the manager and watch it lock and unlock. Then **recall** another one.
4. A **case assignment rule** that sends Type = Commercial to a queue called Commercial Support and everything else to a General queue.
5. An **auto-response rule** that sends an email template to the customer on new cases.
6. An **escalation rule** with business hours that reassigns cases open more than four hours to the manager.
7. A short **automation register** listing every automation you built across both lessons.

## What you should see when you are done

- [ ] A submitted opportunity is locked and the manager receives a request.
- [ ] The field update fires on approval.
- [ ] New commercial cases land in the right queue and the customer receives an auto-response.
- [ ] The escalation triggers when you set the time to a short test period.

## Check your understanding

- [ ] How many assignment rules can be active per object?
- [ ] What happens to a record while it awaits approval?
- [ ] Which rule would you use to tell a manager that a case is late?

## Stretch goal

Submit the opportunity for approval automatically from a record-triggered flow when Discount % is entered above 10.
