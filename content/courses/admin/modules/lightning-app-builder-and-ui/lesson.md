---
title: Lightning App Builder, Pages and the User Interface
examSection: object-manager
objectives:
  - 'Build and assign Lightning apps, and choose between standard and console navigation'
  - 'Create Lightning record, app and home pages and activate them correctly'
  - 'Use Dynamic Forms and component visibility to show the right information'
  - 'Explain what page layouts, compact layouts and Lightning pages each control'
  - 'Use quick actions, global actions, Path and list views to make users faster'
  - 'Plan a clean user interface for different groups of users'
youtubeId: null
estMinutes: 40
prerequisites: []
---
## Start here: the shop front

A shop sells the same goods to everyone, but a good shop arranges the window, shelves and till differently for different customers. A solar installer's sales team needs one view of an Opportunity, the installers another.

In Salesforce the **user interface (UI)** is how records are displayed. You rarely change the data to change the experience. You change the **apps, pages, layouts and actions**.

:::key-terms
- **Lightning app**: a set of tabs and tools for one job, chosen from the app launcher (the nine dots).
- **Lightning App Builder**: the drag-and-drop tool for building pages.
- **Lightning page**: a page made of components. Three kinds: **App page**, **Home page** and **Record page**.
- **Page layout**: controls fields, sections, related lists and buttons on a record.
- **Compact layout**: picks the key fields at the top of a record (the highlights panel) and in the mobile app.
- **Quick action**: a button that lets a user do something fast, such as log a call or create a record.
- **Path**: a visual guide that shows the stages of a process and key fields and tips for each stage.
:::

## Apps

A Lightning app packages **navigation items** (objects and tabs), **branding** (name, colour, logo) and who may use it. Two navigation styles:

- **Standard navigation**: one record at a time, replacing the page. Good for most users.
- **Console navigation**: tabs and subtabs so users can work on many records at once. Good for service agents and busy sales desks.

You assign apps to **profiles**. A user can have several. You choose which app a profile sees first (the default).

A **utility bar** is a docked toolbar at the bottom of an app for quick tools such as notes, a phone and recent items.

## Lightning pages and Lightning App Builder

You drag **components** onto a page and choose a template (how the screen is divided).

- **Record page**: for one object, such as an Account page.
- **App page**: a standalone page for an app, such as a dashboard page.
- **Home page**: the first page users see in an app.

### Activation: who sees which page

Building a page does nothing until you **activate** it. You can make it:

- The **org default** for that object.
- The **app default** for one app.
- An assignment by **app, record type and profile** combined (called "app, record type and profile").

When several apply, the **most specific** wins.

### Component visibility and Dynamic Forms

- **Component visibility filters** show or hide a component based on a condition, such as only show "Installation Details" when Customer Type is Commercial.
- **Dynamic Forms** break the record's fields out of the single Record Detail block, so you place **fields and sections directly on the page** and give each its **own visibility rule**. That means fewer page layouts and no need for many record types just to hide fields.

:::exam-trap
A page layout and a Lightning record page are **not** the same thing. The **Lightning record page** decides the page's overall structure. The **page layout** decides the fields, sections, related lists and buttons shown (unless you use Dynamic Forms, which moves fields onto the Lightning page).
:::

## Page layouts, compact layouts and related lists

- A **page layout** is assigned by **profile and record type**. It sets which fields are visible, read-only or required **on that layout**. Remember: page layouts are **not** security. Field-level security is.
- A **compact layout** chooses the key fields in the **highlights panel** at the top of the record and in the mobile app.
- **Related lists** show child records, such as Contacts on an Account. You can choose their columns and buttons.
- **Search layouts** choose the columns in search results and lookups.

## Actions

- **Quick actions** can create a record, update a record, log a call, send an email, run a **flow** or open a custom component.
- **Object-specific actions** appear on one object. **Global actions** appear anywhere, such as the global create menu (the plus icon).
- You choose which actions appear in the **action bar** of a page layout or Lightning page.

## Guiding users: Path, list views and more

- **Path**: shows a stage bar on a record. For each stage you pick **key fields** to prompt and write **guidance for success**. It is available for Leads, Opportunities, Cases, Quotes and custom objects.
- **List views**: saved filtered tables of records. You choose the filter, columns and who sees it (only me, all users, or selected groups). Users can pin a list view and edit records inline.
- **Home page**: add a dashboard, a list, a key-deals card or an assistant to focus users.

:::exam-trap
A **list view** is a filtered table. A **report** can group, summarise and chart. Use a list view to work through records, and a report to **analyse** them.
:::

## Designing the user interface

Ask: **who** uses it, **what** do they do first, and **what** do they not need? Then:

1. Create a focused **app** per group.
2. Use **record pages** with Dynamic Forms and visibility rules to hide what is irrelevant.
3. Pick the right **actions** and **Path** to speed up the work.
4. **Test as a real user** (use Login As or a test user).

:::on-the-job
Resist adding more fields. When users say the page is "cluttered", the fix is usually **removal and grouping**, not another tab. Talk to three real users, watch them use the page for ten minutes, and change what slows them down.
:::

## Recap

- Apps group tabs: standard navigation versus console navigation. The utility bar docks quick tools.
- Lightning pages: app, home and record. Activate them as org default, app default, or by app + record type + profile.
- Dynamic Forms and component visibility show the right information at the right time.
- Page layout = fields, sections, related lists, buttons. Compact layout = highlights panel and mobile. Neither is security.
- Quick actions and global actions speed up work. Path guides stages. List views filter records.
