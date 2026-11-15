---
title: Reports and Report Types
examSection: data-analytics
objectives:
  - 'Choose between tabular, summary, matrix and joined report formats'
  - 'Explain how a report type decides which records and fields a report can use'
  - 'Build a custom report type, including "with" and "with or without" relationships'
  - 'Use filters, cross filters, bucket fields and formulas to answer a business question'
  - 'Explain how the sharing model and folders decide what a user sees in a report'
  - 'Use subscriptions, reporting snapshots and historical trend reporting'
youtubeId: null
estMinutes: 45
prerequisites: []
---
## Start here: asking the data a question

Khanyisa Solar's sales director asks: "How many open opportunities do we have, by region, and which accounts have no activity in the last 30 days?"

You could scroll through hundreds of records to answer. Or you can build a **report**, which is a saved question you ask your data. The answer updates every time you run it.

A report always has three parts:

1. **Which records?** This is decided by the **report type**.
2. **Which of them?** This is decided by **filters**.
3. **How should they look?** This is decided by the **format**, grouping and chart.

:::key-terms
- **Report**: a saved, live view of your data, built from a report type, filters and a format.
- **Report type**: the template that decides which objects and fields a report can use.
- **Custom report type**: a report type you build to join objects in a way the standard ones do not.
- **Filter**: a condition that narrows the records in a report.
- **Grouping**: rows collected under a shared value, such as stage or owner.
- **Bucket field**: a way to group values (for example amounts into Small, Medium, Large) without building a formula.
- **Folder**: where a report is stored, and the thing that controls who can see it.
:::

## The four report formats

| Format | What it looks like | Use it for |
|---|---|---|
| **Tabular** | A plain list of rows, like a spreadsheet. No grouping or subtotals. | Exports and simple lists |
| **Summary** | Rows **grouped** by one or more fields (up to three), with subtotals. | "Opportunities by stage" |
| **Matrix** | Rows **and** columns grouped, like a pivot table (up to two row and two column groupings). | "Amount by region and by quarter" |
| **Joined** | **Blocks** from up to five report types side by side, matched on shared fields. | Comparing two different object sets, like opportunities and cases |

:::exam-trap
A joined report **cannot be used as the source of a dashboard component**. If a scenario needs a dashboard chart, use a summary or matrix report instead.
:::

## Report types: the real starting point

A **report type** is chosen before anything else, and it controls two things: **which objects can appear** and **which fields you can pick**. Salesforce supplies standard report types, such as "Accounts" or "Opportunities with Products".

If the question needs a join the standard types do not offer, you build a **custom report type**.

### Custom report type basics

- Pick a **primary object**, then add related objects. You can link up to **four objects** in one report type.
- For each relationship you choose how records are matched:
  - **"A" records with "B" records** (an inner join): only primary records that **have** related records.
  - **"A" records with or without "B" records** (an outer join): all primary records, whether or not they have related ones.
- You can edit the **page layout** of the report type to choose which fields appear.
- A report type has a **deployment status**: **In Development** (only admins see it) or **Deployed** (available to users).

:::exam-trap
"Show every account, **including** accounts that have no opportunities" is **"with or without"**. "Show only accounts that **have** opportunities" is **"with"**. This pair appears in many exam questions.
:::

## Making the report answer the question

### Filters

- **Standard filters** at the top: the scope (My records, My team's, All) and a date range on a date field.
- **Field filters**: for example Stage equals Closed Won. You can combine them with **filter logic** (1 AND (2 OR 3)).
- **Cross filters**: filter by related records, such as "accounts **with** opportunities" or "accounts **without** activities". This is how you find the accounts with no activity in 30 days.

### Bucket fields and formulas

- **Bucket field**: group values without a formula. Example: bucket Annual Revenue into Small, Medium and Large.
- **Row-level formula**: calculates a value **for each record** in the report. Example: days since last activity.
- **Summary formula**: calculates on **grouped totals**, for example the percentage each region contributes. Functions such as **PREVGROUPVAL** compare a group with the previous one.

### Charts

You can add a chart to a summary or matrix report. A chart can be added to a **dashboard** later.

## Who sees what in a report: sharing and folders

This is a major exam and on-the-job topic.

- A report **runs as the person viewing it**. They see only records their **sharing model** and **field-level security** allow. Two people open the same report and see different rows.
- The **folder** controls who may **open, edit or manage** the report itself. Folders can be shared with users, roles and public groups, with **Viewer**, **Editor** or **Manager** access.
- If a user can open the report but is not allowed to see an object or field, that data will not show.

:::exam-trap
A user who can open a report folder still **cannot see records the sharing model hides from them**. Folder access controls the **report**, not the **data**.
:::

## Tracking change over time

Standard reports show data **as it is now**. Two tools show how it **changed**:

- **Reporting snapshot**: on a schedule (daily, weekly or monthly), Salesforce runs a **tabular or summary** report and saves the results into a **custom object**. You can then report on that object to chart a trend, such as total pipeline each week.
- **Historical trend reporting**: shows how values such as opportunity amount, stage and close date changed over time. It is available for **opportunities, cases and forecasts**. You switch it on in setup and choose the fields to track.

## Subscriptions

A user can **subscribe** to a report or a dashboard. Salesforce emails them the results on a schedule (daily, weekly or monthly), and you can add **conditions** so the email is only sent when a number crosses a threshold, such as pipeline falls below a target. Users need the right permission to subscribe.

:::on-the-job
Ask "**who decides what from this report?**" before you build it. A report with 40 columns that nobody uses is worse than one with six columns that the sales director opens every Monday. Name reports clearly, put them in shared folders instead of private ones, and write what each is for in the description.
:::

## Recap

- Report types decide which objects and fields exist. Format decides how rows are shown.
- Formats: **tabular** (list), **summary** (grouped), **matrix** (rows and columns), **joined** (blocks). A joined report cannot feed a dashboard.
- Custom report type: "with" = only records that have related ones, "with or without" = all.
- Cross filters find records with or without related records.
- Reports run as the viewer, so sharing decides the rows. Folders decide who opens the report.
- Snapshots store report results over time. Historical trend reporting covers opportunities, cases and forecasts.
- Subscriptions email results on a schedule and can use conditions.
