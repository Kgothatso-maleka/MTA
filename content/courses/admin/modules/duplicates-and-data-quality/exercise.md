---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every click.

## Scenario

Khanyisa Solar's Accounts are full of near-duplicates: "Sunrise Foods", "Sunrise Foods (Pty) Ltd" and "Sunrise Foods PTY". Sales also complains that reps skip the Industry field, which breaks the pipeline-by-industry report.

## Your goal

Stop new duplicates, clean up the old ones, and make missing data visible.

## Before you start

- A Developer Edition org or Trailhead Playground.
- At least 10 test accounts, including 3 or 4 near-duplicates (create or import them).

## What to build

1. Activate the **standard account matching rule**, then create a **custom matching rule** that compares account name (fuzzy) and billing city (exact).
2. Create a **duplicate rule** on Account that uses your matching rule and **allows** the save with an **alert** and **report**.
3. Create a new account that looks like an existing one and see the alert.
4. Change the rule to **Block** and test again. Note the difference in the user's experience.
5. **Merge** two of your duplicate accounts. Choose the master, and decide which phone number to keep.
6. Make **Industry** required with a **validation rule** that fires only when Type is Customer - Direct (use `ISPICKVAL` and `ISBLANK`).
7. Build a **report** of accounts where Industry is blank.

## What you should see when you are done

- [ ] The alert lists the matching account and lets the user open it.
- [ ] Block stops the save with your custom message.
- [ ] The merged account has the combined related records and the other one is in the Recycle Bin.
- [ ] The blank-Industry report shows the right accounts.

## Check your understanding

- [ ] Which of the two rules (matching or duplicate) did you change to switch from Alert to Block?
- [ ] Why is "required on the page layout" a weak way to guarantee data is filled in?
- [ ] What would you tell the sales team before switching from Allow to Block?

## Stretch goal

Add a duplicate rule that compares new **Leads** against existing **Contacts** and shows the alert on lead creation.
