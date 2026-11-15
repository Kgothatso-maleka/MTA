---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every click.

## Scenario

Khanyisa Solar's sales director wants three answers every Monday: (1) open opportunities by stage and owner, (2) accounts that have **no** open opportunities, and (3) how total pipeline has changed week by week.

## Your goal

Build the reports that answer those questions and share them safely.

## Before you start

- A Developer Edition org or Trailhead Playground.
- About 15 accounts and 20 opportunities with different stages and owners (create or import them).
- Two test users with different roles.

## What to build

1. A **summary report** on Opportunities: open opportunities grouped by **Stage**, then **Owner**, with a chart and an Amount subtotal.
2. A **bucket field** on Amount that groups deals into Small, Medium and Large.
3. A **custom report type** with Accounts as primary and Opportunities as related, using **"with or without"**. Build a report that lists accounts with no open opportunities. Then change to **"with"** and see which accounts disappear.
4. A **matrix report** showing Amount by Owner (rows) and Close Quarter (columns).
5. A **joined report** with an opportunities block and a cases block. Try to add it to a dashboard and note what happens.
6. Create a **reporting snapshot** of open pipeline into a custom object, scheduled weekly.
7. Put the reports in a **shared folder** (Viewer access for a role) and log in as a second user to see what is different.
8. **Subscribe** to the pipeline report with a condition.

## What you should see when you are done

- [ ] The "with or without" report shows accounts with no opportunities. The "with" version does not.
- [ ] The second user sees fewer rows than you, because of the sharing model.
- [ ] The joined report cannot be used as a dashboard source.
- [ ] The snapshot custom object has a first row of data after a manual run.

## Check your understanding

- [ ] What did the folder control, and what did the sharing model control?
- [ ] Which format would you choose for a pivot-style comparison, and why?
- [ ] Which tool shows how pipeline changed over four weeks?

## Stretch goal

Add a **row-level formula** that shows days since the last activity, and a **summary formula** that shows each owner's share of total pipeline.
