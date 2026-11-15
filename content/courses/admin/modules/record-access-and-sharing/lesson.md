---
title: Record Access and the Sharing Model
examSection: config-setup
objectives:
  - 'Explain how sharing opens up record access in layers, starting from the organization-wide default'
  - 'Choose the right OWD for an object, including Controlled by Parent'
  - 'Use the role hierarchy, public groups, queues and sharing rules correctly'
  - 'Use manual sharing, teams and implicit sharing, and know what each can and cannot do'
  - 'Pick the least open tool that meets a requirement'
  - 'Troubleshoot "can''t see the record" and "can see too much" for record access'
youtubeId: null
estMinutes: 45
prerequisites: []
---
## Start here: a building with locked rooms

Imagine Khanyisa Solar's office. The **profile and permission sets** decide which *kinds* of room you may enter at all (Installation, Account, Case). The **sharing model** decides which *individual rooms* of that kind you may open: which actual records.

Sharing is built like a set of doors. It starts **locked** at the OWD and you add keys to open it up. You can never use sharing to lock a door that the OWD left open.

:::key-terms
- **Record access**: whether a user can see or edit a particular record.
- **OWD (organization-wide default)**: the most restrictive baseline for an object.
- **Role hierarchy**: a management tree that gives managers access to their team's records.
- **Sharing rule**: an automatic extra key for a group of records.
- **Public group**: a named set of users, roles or other groups used as a sharing target.
- **Implicit sharing**: built-in access that links accounts, contacts, opportunities and cases.
:::

## Step 1: set the OWD

OWD is set per object under **Setup > Sharing Settings**.

| OWD | Who can see and edit |
|---|---|
| **Private** | The owner and people above them in the role hierarchy |
| **Public Read Only** | Everyone can see, only the owner (and above) can edit |
| **Public Read/Write** | Everyone can see and edit |
| **Public Read/Write/Transfer** | As above, plus change owner (Leads and Cases only) |
| **Controlled by Parent** | Access follows the parent record |
| **No Access / View Only / Use** | Special values for Price Books |

- Choose the **most restrictive** setting the business can live with, then open up.
- **Controlled by Parent** is used on the child side of a master-detail relationship. It is not a setting you pick for a lookup child.
- Changing OWD triggers a **sharing recalculation**, which can take time on large orgs.

:::exam-trap
"Everyone should see Opportunities but only the owner should edit them" is **Public Read Only**, not Private plus a sharing rule. And no sharing rule can ever make a record *more* private than the OWD.
:::

## Step 2: the role hierarchy

- Roles form a tree. Users **higher in the tree** can see and edit the records of users below them.
- It only works for an object when **Grant Access Using Hierarchies** is ticked. It is on by default for standard objects. For a custom object you can turn it off.
- A role grants **record access only**. It does not give the user the object permission, and it does not give field access.
- A user has **one role**. A role is not a profile.

## Step 3: public groups, queues and sharing rules

A **public group** can contain users, roles, roles with subordinates, and other groups. It is a handy target for rules and for manual shares.

A **sharing rule** opens up records to more people. It can only **add** access.

| Kind | Picks records by | Shares with |
|---|---|---|
| **Owner-based** | Who owns the records (roles, public groups, queues) | Roles, roles and subordinates, public groups |
| **Criteria-based** | Field values (for example Type = Commercial) | Roles, roles and subordinates, public groups |

- You **cannot share with a profile.**
- A queue can be part of an **owner-based** rule to choose which records are covered, but it is not a sharing target.
- You choose **Read Only** or **Read/Write** for the target group. You cannot give less than the OWD.

## Step 4: manual sharing, teams and Apex sharing

- **Manual sharing**: on one record, the owner (or an admin, or a user above the owner) clicks **Sharing** and adds a person or group. It is useful for exceptions. It **does not scale**, and it is **lost when the owner changes** because manual shares are removed on a change of owner.
- **Account, opportunity and case teams**: the record's team members get access at a level you set for each member role.
- **Apex managed sharing**: a developer writes code to create share records for rules that clicks cannot express. Developers see this in the sharing table (for custom objects named `ObjectName__Share`).
- **Territory management**: shares accounts by territory instead of by owner. It is an optional feature and is built for sales structures that change often.

## Implicit sharing

Salesforce builds some access automatically:

- Access to a **child** record (a contact, opportunity or case) gives **read access** to its **parent account** for the user.
- Access to a **parent account** gives access to child records, based on role and the account's settings.

You do not set this. It is why you may see an account in a list that you do not own.

:::exam-trap
Implicit sharing is **not** the same as Controlled by Parent. Implicit sharing is built-in behaviour between standard objects. Controlled by Parent is an OWD choice for a master-detail child.
:::

## Choosing the least open tool

Pick the **narrowest** tool that does the job:

1. Need everyone to see it? Raise the **OWD** to Public Read Only. One setting.
2. Managers need to see their team's records? **Role hierarchy.**
3. One department needs the records of another? **Sharing rule** to a public group.
4. A few people need one account? **Account team** or **manual sharing.**
5. A rule that depends on logic clicks cannot do? **Apex managed sharing.**
6. Someone must see **everything** of an object? **View All** (object) or **View All Data** (org) on a permission set. Use sparingly.

## Troubleshooting record access

When a user "cannot see the record":

1. Do they have **Read** on the object? (Profile or permission set.)
2. What is the **OWD**? Are they the owner or above the owner?
3. Is there a **sharing rule**, **team**, **manual share** or **View All** that applies?
4. Is a **list view filter** or **report filter** hiding it? Records may be visible but filtered out.

When a user "sees too much", find which door opened: a role above, a sharing rule, a View All permission, or a Public Read OWD. Use **Log in as** to confirm.

:::on-the-job
Draw the sharing model on one page before you build: OWD per object, role tree, public groups and rules. A one-page drawing prevents most "why can Thabo see this?" calls.
:::

## Recap

- Sharing starts at the OWD and can only open access up.
- Role hierarchy gives managers access, but not object or field permissions.
- Sharing rules share with roles and public groups, never with profiles.
- Manual shares are removed when the owner changes. Teams, territory and Apex sharing cover special cases.
- Use the narrowest tool that works, and troubleshoot object first, then OWD, then extra access.
