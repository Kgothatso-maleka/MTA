---
title: Dashboards
examSection: data-analytics
objectives:
  - 'Describe what a dashboard is and how it gets its data from source reports'
  - 'Choose the right component type: chart, gauge, metric or table'
  - 'Explain the running user and how a dynamic dashboard differs'
  - 'Use dashboard filters, refresh and subscriptions'
  - 'Explain who can see a dashboard and why the running user can expose data'
  - 'Design a dashboard a manager will actually use'
youtubeId: null
estMinutes: 35
prerequisites: []
---
## Start here: the car dashboard

A car dashboard does not show every sensor reading. It shows the few things the driver needs: speed, fuel, warnings. A Salesforce **dashboard** works the same way. It turns **reports** into a visual page that a manager can read in ten seconds.

For Khanyisa Solar's sales director, one dashboard might show: pipeline by stage, this month's target as a gauge, and a table of the top five open deals.

:::key-terms
- **Dashboard**: a visual page made of components, each drawn from a **source report**.
- **Component**: one item on the dashboard, such as a chart, gauge, metric or table.
- **Source report**: the report that feeds a component. A component has exactly one.
- **Running user**: the person whose access decides what data the dashboard shows.
- **Dynamic dashboard**: a dashboard that runs as **whoever is viewing it** instead of one fixed running user.
- **Dashboard filter**: a control that lets viewers narrow the whole dashboard, for example by owner.
:::

## Components

A dashboard can hold up to **20 components**. The main types:

- **Chart**: bar, column, line, donut, funnel, scatter and similar. Best for comparing groups or showing a trend.
- **Gauge**: shows one number against a target, with colour bands (red, yellow, green).
- **Metric**: one big number, such as total open pipeline.
- **Table**: a short ranked list of records, such as the top five open deals.

Each component is built from **one source report**. To show data from five different reports, you need five components.

:::exam-trap
A dashboard is **not** a place to enter or edit data. It is a **read-only** view of reports. Also, you cannot build a dashboard component directly on an object: you must build the **report** first. And a **joined report** cannot be a source.
:::

## The running user

When the dashboard refreshes, Salesforce runs each source report **as the running user**. The viewers see the results of **that** person's access, not their own. Three options:

- **A specific user** (the default choice): everybody sees the same numbers. Often a manager or an integration user with wide access. Good for one shared set of figures.
- **Run as the logged-in user** (a **dynamic dashboard**): each viewer sees only the data **they** are allowed to see. Good when each rep or manager should see their own numbers from one dashboard.

Dynamic dashboards have limits: an org can only have a limited number of them, and they cannot be **scheduled** to refresh (viewers refresh them manually).

:::exam-trap
If the running user is the CEO, **everyone who opens the dashboard sees the CEO's data**, even people who could not see those records in a report. To keep data restricted by viewer, use a **dynamic dashboard**.
:::

## Filters, refresh and subscriptions

- **Dashboard filters**: let a viewer change one filter, for example Owner or Region, and every component updates. You can add up to **three** filters.
- **Refresh**: the numbers are as fresh as the last refresh. Dashboards with a specific running user can be **scheduled** to refresh (daily, weekly, monthly). Anyone viewing can also click **Refresh**, subject to limits.
- **Subscribe**: a user can get a scheduled email with a snapshot of the dashboard. See the report lesson for the idea of conditions.

## Who can see a dashboard

- **Folders** again: a dashboard lives in a folder, and the folder decides who can open, edit or manage it (Viewer, Editor, Manager).
- To **open a component's source report**, the user also needs access to the folder that report is in.
- A user cannot see data that the **running user** cannot see.

## Designing a dashboard people use

Good dashboards answer one audience's questions:

- Start with the **decision** the viewer makes ("do I need to chase more deals this week?").
- Put the most important metric **top left**.
- Keep it to **five to eight** components. Twenty is a limit, not a target.
- Use clear titles and axis labels. A component called "Chart 1" is useless.
- Pick the right running user and test the dashboard as someone with limited access.
- Name the dashboard, put it in a shared folder, and say who owns it.

:::on-the-job
When the business says "the dashboard is wrong", check three things in order: **the running user** (do they see everything?), **the source report's filters** (date range, "My opportunities"), and **the last refresh time**. These three explain most dashboard complaints.
:::

## Recap

- A dashboard is read-only. Each component comes from one source report. Up to 20 components.
- Components: chart, gauge, metric, table.
- Running user decides the data everyone sees. Dynamic dashboards run as the viewer.
- Dynamic dashboards: refresh manually, limited in number. Specific running user dashboards can be scheduled.
- Up to three dashboard filters. Folders control who opens the dashboard.
- Joined reports cannot be a source.
