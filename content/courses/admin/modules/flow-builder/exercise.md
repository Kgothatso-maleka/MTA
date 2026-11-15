---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every click.

## Scenario

When a Khanyisa Solar opportunity is **Closed Won**, the company must create an Installation record, email the installation manager, and make sure the amount is never blank on a won deal. Sales reps also want a guided "Quick quote" they can launch from an account.

## Your goal

Build three flows and handle errors properly.

## Before you start

- A Developer Edition org or Trailhead Playground.
- The Installation object and a test user as installation manager.

## What to build

1. A **before-save record-triggered flow** on Opportunity: when Stage becomes Closed Won and Description is blank, set Description to "Won - install required".
2. An **after-save record-triggered flow** on Opportunity (entry condition: Stage changed to Closed Won) that **creates an Installation** linked to the account and **sends an email** to the manager.
3. A **fault path** on the Create step that creates a "Flow error" task for you with the error message.
4. A **screen flow** "Quick quote" with two screens (customer details, system size), launched from an **action** on Account.
5. A **schedule-triggered flow** that runs weekly and creates tasks for installations that are still Planned after 30 days. Use a **Loop**, but put the **Create Records** element outside the loop.
6. **Debug** each flow with test data, once with roll-back on.

## What you should see when you are done

- [ ] Closing an opportunity creates an Installation and sends an email.
- [ ] A forced error produces the fault-path task, not a raw error.
- [ ] The screen flow runs from the Account page.
- [ ] You can explain why step 1 is before-save and step 2 is after-save.

## Check your understanding

- [ ] Which flow type needs a user to click something?
- [ ] Why should a Create Records not be inside a loop?
- [ ] What happened to Workflow Rules and Process Builder?

## Stretch goal

Put the "create installation" logic into an autolaunched **subflow** and call it from the after-save flow.
