---
title: Chatter, AppExchange and the Salesforce Mobile App
examSection: productivity-collab
objectives:
  - 'Use Chatter feeds, groups, topics and mentions, and control what is tracked'
  - 'Choose the right Chatter group type'
  - 'Share and manage files in Salesforce'
  - 'Install and manage AppExchange apps, and explain managed versus unmanaged packages'
  - 'Configure the Salesforce mobile app and decide what to show on mobile'
  - 'Select productivity tools for a collaboration problem'
youtubeId: null
estMinutes: 35
prerequisites: []
---
## Start here: the team WhatsApp group, but attached to the work

At Khanyisa Solar, deal chatter happens in WhatsApp groups. Nothing links back to the customer record, new joiners see nothing of the history, and when someone leaves, the conversation leaves too.

**Chatter** is Salesforce's built-in collaboration space. Conversations live **on the record**, so everyone sees the same story. **AppExchange** adds ready-made apps. The **mobile app** takes it all on the road.

:::key-terms
- **Chatter**: social collaboration tools inside Salesforce (feed, groups, files).
- **Feed**: the stream of posts and updates.
- **Mention (@)**: notifies a person or group.
- **Topic (#)**: a hashtag that groups posts.
- **Feed tracking**: automatic posts to a record's feed when chosen fields change.
- **AppExchange**: Salesforce's marketplace for apps and consultants.
- **Package**: a container for an app that you install.
:::

## Chatter

### What Chatter can do

- **Post, poll and ask questions** in feeds, on records and in groups.
- **@mention** people or groups. **#topics** organise posts.
- **Follow** records, people and groups to see their updates.
- **Like**, **comment**, **bookmark** and **share** posts. Mark an answer as **best answer** on a question.
- **Files**: attach and share files in posts.

### Feed tracking

An admin can turn on **feed tracking** for an object so that changes to chosen fields, up to **20 fields per object**, post automatically to the record's feed for followers. This is a light audit tool, but it is **not** the same as field history tracking.

### Groups

| Group type | Who can see it | Who can join |
|---|---|---|
| **Public** | Everyone in the org | Anyone |
| **Private** | Name and description only | Members **approved** by owner or manager |
| **Unlisted** | Hidden from lists and search | **Invitation** only |
| **Broadcast-only** (option) | As above | Only owners and managers post, everyone reads |

Groups can also include **customers** (customer groups) when an Experience Cloud site is used.

:::exam-trap
In a **private** group, non-members can see that the group exists but not its posts. Posts in an **unlisted** group are hidden and the group is not listed at all. For announcements where only managers should post, use a **broadcast** group.
:::

## Files

- **Salesforce Files** are stored in Salesforce, can be **shared by link**, with people or groups, and can have **versions**.
- **Libraries** (Salesforce CRM Content) organise files with permissions for teams.
- **Attach files to records**, such as a signed quote.
- Sharing settings matter: files shared by link can be seen by anyone with the link.

## AppExchange

The **AppExchange** has thousands of apps, from e-signature to project tools.

### Installing apps

1. Find the app and read the reviews and security information.
2. **Install in a sandbox first**.
3. Choose who gets access: **admins only, all users, or specific profiles**.
4. Assign **licences** and permission sets, and test.

### Managed versus unmanaged packages

| | **Managed package** | **Unmanaged package** |
|---|---|---|
| Source code | Hidden and protected | Visible and editable |
| Upgrades | Publisher pushes **upgrades** | No upgrades, you edit it yourself |
| Use | Commercial apps | Sharing templates and samples |

:::exam-trap
A **managed package** can be upgraded by its publisher and its components are locked. An **unmanaged package** is a one-time copy that you can change but that cannot be upgraded.
:::

## The Salesforce mobile app

Reps are rarely at their desks, so the **Salesforce mobile app** (iOS and Android) gives them records, tasks, Chatter and reports on a phone.

Mobile admin tasks:

- Choose the **mobile navigation menu** (what appears in the menu).
- Design **compact layouts** (key fields at the top of the record).
- Add **mobile-ready actions** (log a call, new task, check in).
- Use **mobile-only** or **Lightning page** settings to show less on a small screen.
- Control who can use the app with profiles and permission sets, and secure devices with **MFA** and session settings.
- Some features, such as **offline access**, depend on the licence and set-up.

:::on-the-job
Design mobile for the **ten-second job**: log a call, change a stage, take a note. If it needs a keyboard and a coffee, it belongs on the desktop. Ask two reps to use it in a car park on weak signal, then fix what hurts.
:::

## Choosing a collaboration tool

| Need | Use |
|---|---|
| Talk about a deal on the record | **Chatter** feed on the record |
| An announcement from management | **Broadcast** group |
| Hand over a customer to a colleague | **Mention** and a task |
| An industry-standard e-signature tool | **AppExchange** |
| Reps updating deals on the road | **Salesforce mobile app** |

## Recap

- Chatter: feed, groups, topics, mentions, files. Feed tracking follows up to 20 fields per object.
- Public groups are open. Private groups need approval. Unlisted groups are invite-only and hidden. Broadcast groups limit who posts.
- AppExchange: install in a sandbox first. Managed packages are upgradeable and locked. Unmanaged are editable copies.
- Mobile: navigation menu, compact layouts, actions, and security.
