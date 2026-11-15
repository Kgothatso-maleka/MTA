---
title: Profiles, Permission Sets and Sharing
examSection: config-setup
objectives:
  - 'Explain the four layers of Salesforce access: login, object, field and record'
  - 'Compare profiles, permission sets and permission set groups, and apply least privilege'
  - 'Read and set object permissions and field-level security, including their dependencies'
  - 'Choose organization-wide defaults, role hierarchy, sharing rules and manual sharing to open up record access'
  - 'Manage users safely, including freeze, deactivate, queues and public groups'
  - 'Troubleshoot "I can''t see it" and "I can see too much" using a repeatable checklist'
youtubeId: null
estMinutes: 40
prerequisites: []
---
## Start here: two different questions

Picture the Khanyisa Solar head office. Every employee has a key card.

- Some doors open for everyone (reception). Some open only for finance (the cash room). The card decides **what kind of rooms you may enter and what you may do inside**.
- Separately, inside a shared filing room, some drawers are locked to only the person who filed the papers. That decides **which individual files you can open**.

Salesforce security answers exactly these two questions, and they are controlled by different tools:

1. **What can this user do?** (Can they create Installations? See the Discount field?) That is controlled by **profiles and permission sets**.
2. **Which records can this user see?** (Their own jobs only, or the whole team's?) That is controlled by the **sharing model**.

Most beginner mistakes come from mixing these two up.

:::key-terms
- **Profile**: a bundle of permissions and settings. Every user has exactly one.
- **Permission set**: an extra bundle of permissions you can add to any user. A user can have many.
- **Permission set group**: several permission sets packaged together for one job role.
- **Object permissions**: Create, Read, Edit, Delete (CRED), plus View All and Modify All.
- **Field-level security (FLS)**: whether a user can see or edit each individual field.
- **Organization-wide defaults (OWD)**: the baseline record access for each object.
- **Role hierarchy**: a management tree that can give managers access to their team's records.
- **Sharing rule**: an automatic rule that opens records to more people.
:::

## The four layers of access

Think of access as four gates. A user must pass the gate to get through.

1. **Organization access**: can they log in at all, from where and when? (Passwords, login hours, trusted IP ranges, multi-factor authentication.)
2. **Object access**: can they create, read, edit or delete records of this object?
3. **Field access**: can they see or edit this field?
4. **Record access**: can they open this particular record?

Gates 2 and 3 come from profiles and permission sets. Gate 4 comes from the sharing model.

## Profiles

A profile defines settings such as:

- Object permissions and field-level security
- Which apps and tabs the user can see
- Which page layouts and record types they get, including the **default** record type
- System permissions, such as "API Enabled" or "Manage Users"
- **Login hours** and **login IP ranges**, which exist **only on profiles**, not on permission sets

Rules to remember:

- **Every user has exactly one profile.** It is required.
- Salesforce provides **standard profiles** (System Administrator, Standard User, Read Only and others). You can only change a few settings on most standard profiles. To customise, **clone** one into a **custom profile**.
- A profile is linked to a **user licence**. The licence decides which permissions can even exist for that profile.

:::exam-trap
Login hours and login IP restrictions are **profile-only**. The **default** record type is also set on the profile. Permission sets can add record types to a user, but they cannot set the default.
:::

## Permission sets and permission set groups

A **permission set** only ever **adds** access. It cannot take anything away. That is why it is so useful: you give everyone a small, safe profile and then add what each person needs.

A **permission set group** bundles permission sets so you can assign one thing per job role, for example "Installation Manager". Inside a group you can **mute** specific permissions. Muting removes a permission **only within that group**. It does not change the underlying permission set for anyone else.

### Least privilege: the modern approach

**Least privilege** means giving people only the access they need. The recommended pattern is a very small base profile (such as **Minimum Access – Salesforce**) and then permission sets or groups for everything else. It is easier to audit, because you can see exactly why a person has access, and you avoid dozens of near-identical profiles.

<!-- verify: Salesforce has announced a long-term move away from permissions on profiles toward permission sets; check the current Release Notes and exam guide for timing. -->

:::on-the-job
In a mature org you will often find 40 profiles that all differ by one checkbox. Resist adding a 41st. Ask: "Could this be a permission set instead?" Build permission sets around **tasks** ("Approve discounts", "Edit installations") rather than people, and then combine them into groups by job role. Name them clearly and write a description of who should have each one.
:::

## Object permissions and field-level security

### Object permissions

For each object a profile or permission set can grant:

- **Read**, **Create**, **Edit**, **Delete**
- **View All** and **Modify All**: these let a user see (or change and delete) **all** records of that object **regardless of sharing**

Some permissions depend on others:

- **Edit** requires **Read**.
- **Delete** requires **Read and Edit**.
- **Create** requires **Read**.
- **Modify All** includes Read, Edit, Delete and View All.

At the whole-org level, the system permissions **View All Data** and **Modify All Data** work across every object and bypass sharing. Give these out very rarely.

### Field-level security

FLS has two levels for each field: **Read** and **Edit**. You can set it on the profile or permission set, or from the field itself. Because FLS is a real security control, a field a user has no access to is hidden **everywhere**: record pages, reports, list views, search and the API.

Compare that with a page layout. Removing a field from a layout hides it only on that screen.

## The sharing model: which records?

Sharing starts closed and opens up. You can **open** access beyond the baseline, but you can **never** use sharing to restrict below it.

### 1. Organization-wide defaults (OWD)

OWD is the **most restrictive** baseline per object. The common settings are:

| OWD | Meaning |
|---|---|
| **Private** | Only the owner (and people above them in the hierarchy) can see it |
| **Public Read Only** | Everyone can see it, only the owner can edit |
| **Public Read/Write** | Everyone can see and edit it |
| **Public Read/Write/Transfer** | Same, plus changing the owner (Leads and Cases only) |
| **Controlled by Parent** | Access follows the parent record |

Start with the most restrictive setting that the business can live with, then open up.

### 2. Role hierarchy

Roles form a management tree. With "**Grant Access Using Hierarchies**" turned on for an object, people higher in the tree can see and edit the records owned by people beneath them. Roles are about **record access only**. They do not give object permissions or field access.

### 3. Sharing rules

A sharing rule automatically opens records to more people. There are two kinds: **owner-based** (records owned by certain people) and **criteria-based** (records that match a field condition). You can share with **roles, roles and subordinates, public groups and queues**. You **cannot** share with a profile. Sharing rules can only **add** access.

### 4. Manual sharing

When OWD is Private or Public Read Only, the record owner (or an admin, or someone above them) can click **Sharing** on a single record to share it with a person or group. This is handy but does not scale, so do not rely on it for ongoing business rules.

### 5. Teams

Account teams and opportunity teams let a record's team members get access to it.

### The order of thinking

When someone cannot see a record, ask in this order:

1. Do they have **Read** on the object (profile or permission set)?
2. Does **OWD** let them see it? If Private, are they the owner or above the owner in the role hierarchy?
3. Is there a **sharing rule**, **team** or **manual share** that gives them access?
4. Do they hold **View All** or **Modify All** on the object, or View All Data?

:::exam-trap
Sharing can only **open up**. If OWD is Private, no sharing rule can make a record *more* private. Also, "I want everyone to see it but only the owner to edit it" is **Public Read Only**, not Private plus a sharing rule.
:::

## Managing users

- **Users cannot be deleted.** When someone leaves, **deactivate** them. This frees their licence. Their historical records stay.
- **Freeze** blocks someone from logging in **without freeing the licence**. Use it as a quick stop while you finish tasks that prevent deactivation, such as moving them out of an assignment rule.
- Before deactivating, **reassign** their records and check automation that names them as a default owner or approver.
- A **queue** is a shared holding place for records so that a team can pick work up. Queues can own **Leads, Cases and custom objects**, among others, but not Accounts or Opportunities.
- A **public group** is a named collection of users, roles or other groups. You use public groups mainly as targets for sharing rules and folders.

## Troubleshooting checklist

Use the same steps every time. This is what separates senior admins from guessing.

1. **Reproduce.** Ask for the record link and what exactly they see.
2. **Log in as the user** (Setup > Users > Login). You see exactly what they see, with no need for their password. An admin needs the org's login-as setting enabled or the user must have granted login access.
3. **Object access**: check Read/Create/Edit/Delete on the profile **and** every permission set they hold.
4. **Field access**: check FLS the same way.
5. **Record access**: check OWD, role position, sharing rules and teams. The record's **Sharing** page can show who currently has access.
6. **Fix in a sandbox first** if the fix affects many users, then deploy.

:::on-the-job
Never give someone the System Administrator profile "to get them unstuck". It hides the real problem and leaves a long-term security gap. Fix the specific permission, and write down what you changed and why.
:::

## Recap

- **Profiles and permission sets = what you can do. Sharing = which records you can see.**
- One profile per user, many permission sets. Permission sets only add. Muting works only inside a group.
- Login hours and login IP ranges are profile-only. Default record type is set on the profile.
- Edit needs Read. Delete needs Read and Edit. View All and Modify All bypass sharing for that object.
- OWD is the floor. Role hierarchy, sharing rules, manual shares and teams only open up. Sharing rules do not target profiles.
- Deactivate, do not delete. Freeze stops login without freeing the licence.
