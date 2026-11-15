---
title: Org Setup and User Management
examSection: config-setup
objectives:
  - 'Find and change the main organization settings: company information, locale, fiscal year, currencies and business hours'
  - 'Create and manage users: licenses, profiles, roles, usernames, deactivate versus freeze'
  - 'Explain the difference between a license, a profile, a role and a permission set'
  - 'Choose the right sandbox type for a task'
  - 'Use the Setup Audit Trail and login history to see what changed and who logged in'
  - 'Delegate some admin tasks safely'
youtubeId: null
estMinutes: 40
prerequisites: []
---
## Start here: setting up an office

Khanyisa Solar is opening a new branch. Before anyone works there you must decide the basics: the address, the working hours, the currency on invoices, who gets a desk and what each person may touch.

Setting up a Salesforce org is the same job. You set the **company-wide rules** first (Setup > Company Settings), then you create the **people**, then you decide **what each person can do**. This lesson covers the first two. The next lesson covers security.

:::key-terms
- **Org**: your own private copy of Salesforce, with its own data and settings.
- **Setup**: the admin area (the gear icon) where you configure the org.
- **License**: what a user is allowed to use. Licences are bought and limited in number.
- **Profile**: a bundle of permissions. Every user has exactly one.
- **Role**: a position in the management hierarchy. It controls record visibility, not what a user can do. A role is optional.
- **Permission set**: extra permissions added on top of a profile.
- **Sandbox**: a copy of your org for building and testing, separate from production.
:::

## Company settings you must know

Under **Setup > Company Settings** you will find:

- **Company Information**: your org's name, address, **default language, locale, time zone and currency**, and your **Organization ID** and licence counts. Individual users can override locale, language and time zone for themselves.
- **Fiscal Year**: **standard** (twelve months, you pick the start month) or **custom** (for example 4-4-5 quarters). Opportunity and forecast reports use it.
- **Business Hours and Holidays**: define when support is open. Escalation rules and entitlements use business hours. Holidays pause the clock.
- **Currencies**: turn on **multi-currency** when you trade in more than one currency. Once it is on, it **cannot be turned off**. Your **corporate currency** is the one reports convert into. **Advanced currency management** adds dated exchange rates.
- **Language settings and translation**: allow users to see labels in their own language.
- **My Domain**: your org's own web address, for example `khanyisa.my.salesforce.com`. It is required for many features, such as single sign-on.

:::exam-trap
Multi-currency is a one-way door. Many exam questions ask "what can you not undo?" Turning on multi-currency and turning on **person accounts** are both permanent.
:::

## Users: the basics

You create users in **Setup > Users**. Each user needs:

- A **licence** (User License). Common ones: **Salesforce** (full CRM), **Salesforce Platform** (custom apps, limited standard objects), **Identity**, and external licences for Experience Cloud users.
- A **profile** (required).
- A **role** (optional, for record visibility).
- A **username** in the form of an email address that is **unique across all Salesforce orgs in the world**. It does not have to be a real mailbox. A separate **email address** field holds where messages go.

When you create a user, Salesforce emails them a link to set their password.

### Deactivate versus freeze

You **cannot delete** a user. You have two tools:

- **Deactivate**: the user can no longer log in, and their **licence is freed** for someone else. Their records remain, and the records they own stay owned by them until you reassign.
- **Freeze**: blocks login **right now** but keeps the user active and keeps their licence. Use it when you need to lock someone out immediately, for example while you finish deactivating them or removing them from a role or assignment rule.

:::exam-trap
Freezing does **not** free the licence. Deactivating does. Before you deactivate someone, reassign what they own and remove them from places that depend on them, such as assignment rules, approval processes and queues.
:::

### Licences, profiles, roles and permission sets: four different jobs

| It controls... | Question it answers |
|---|---|
| **Licence** | Which features of Salesforce the person may use at all |
| **Profile** | What baseline the person can do (objects, fields, apps, login rules) |
| **Role** | Which other people's records the person can see up the hierarchy |
| **Permission set** | Extra permissions added for one job |

## Sandboxes: where you practise

Never test on production. A **sandbox** is a copy of your org:

- **Developer**: copies **metadata** (your configuration) only, no real data. Good for building.
- **Developer Pro**: like Developer with more storage.
- **Partial Copy**: metadata plus a **sample** of data, chosen by a sandbox template.
- **Full**: a complete copy of metadata and **all data**. Good for final testing and training.

You move changes from a sandbox to production with change sets or a deployment tool such as DevOps Center.

## Seeing what happened: audit tools

- **Setup Audit Trail**: shows the **last 180 days** of setup changes (what, who and when). Download it for older history. Use it when "something changed and nobody knows why".
- **Login History**: shows who logged in, from where, and whether it succeeded.
- **Field history tracking**: records changes to chosen fields on records (see the objects lesson).

## Delegated administration

You can let someone who is not a full admin do part of the job, such as unlock users or reset passwords for people in one role. This is **delegated administration**. It limits risk because the delegate gets only the tasks you choose.

:::on-the-job
Keep an **admin runbook**: a short document listing "when someone leaves, do these 8 steps". Typical steps: freeze, reassign records and approvals, remove from queues, public groups and assignment rules, deactivate, log it. Most offboarding problems come from forgetting what a user owned.
:::

## Recap

- Company Information sets default language, locale, time zone and currency. Users can override their own.
- Multi-currency (and person accounts) cannot be turned off once on.
- Users need a licence and a profile. Roles are optional. Usernames are globally unique.
- You can only deactivate or freeze users, never delete. Deactivate frees the licence, freeze does not.
- Sandbox types: Developer and Developer Pro (metadata), Partial Copy (sample data), Full (all data).
- Setup Audit Trail covers the last 180 days.
