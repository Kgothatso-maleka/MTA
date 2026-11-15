---
title: Data Modeling and Security in Code
examSection: dev-fundamentals
objectives:
  - 'Choose between lookup, master-detail and many-to-many relationships and explain the effects'
  - 'Describe the multitenant platform, the MVC pattern and declarative versus programmatic tools'
  - 'Explain custom metadata types, custom settings and custom labels and when to use each'
  - 'Explain with sharing, without sharing and inherited sharing'
  - 'Enforce object and field security in Apex with user mode, SECURITY_ENFORCED and stripInaccessible'
  - 'Describe how profiles, permission sets and sharing affect code'
youtubeId: null
estMinutes: 50
prerequisites: []
---
## Start here: a shared building

Salesforce is **multitenant**: many companies share the same servers and code base, like flats in one building. Each tenant's data and customisations are kept apart. Because everyone shares resources, Salesforce enforces **governor limits** so one tenant cannot hog the building.

:::key-terms
- **MVC**: Model (objects and fields), View (Lightning pages, LWC, Visualforce), Controller (Apex and flows).
- **Lookup**: a loose link between two objects.
- **Master-detail**: a tight parent-child link.
- **Junction object**: an object with two master-detail fields, creating many-to-many.
- **Sharing**: record-level access. **CRUD and FLS**: object-level and field-level access.
:::

## Relationships

| Type | Parent required? | Delete parent | Security and owner | Roll-up summary |
|---|---|---|---|---|
| **Lookup** | No (optional) | Child stays | Child has its own owner and sharing | Not available* |
| **Master-detail** | Yes | Child is deleted too (cascade) | Child inherits sharing and owner from parent | Yes |
| **Many-to-many** | Two parents | Via junction object | Follows the master parents | Yes |

*Roll-up summary fields work on master-detail. Lookups need a flow, trigger or declarative lookup rollup tool.

- An object can have up to **2 master-detail** relationships.
- Others: **hierarchical** (user to user), **external lookup** and **indirect lookup** for external objects.
- Choose **master-detail** when the child cannot exist without the parent. Choose **lookup** when it can.

:::exam-trap
In a master-detail relationship, the child has **no owner field**. It inherits security from the parent. Deleting a parent **cascade-deletes** children.
:::

## Where to store configuration

| Tool | Good for | Moves with deployment? |
|---|---|---|
| **Custom metadata type** | App configuration, mappings, thresholds | Yes, records deploy as metadata |
| **Custom setting** | Per user or profile values, caching | Definition yes, values usually not |
| **Custom label** | Translatable text for UI and messages | Yes |
| **Hardcoded value** | Never | n/a |

Custom metadata is the usual best answer for "configuration that must be deployed and read in code without using a query limit."

## Sharing in Apex

Apex runs in **system mode**: it can read and write everything unless you ask it to respect the user's access.

| Keyword | Meaning |
|---|---|
| `with sharing` | Respect the running user's **record sharing** |
| `without sharing` | Ignore sharing rules |
| `inherited sharing` | Use the sharing of the calling class |

```apex
public with sharing class AccountService { ... }
```

:::exam-trap
`with sharing` enforces **record sharing only**. It does **not** enforce **object and field permissions**. For those use the options below.
:::

## Enforcing CRUD and FLS

- **`WITH USER_MODE`** in SOQL, and `AccessLevel.USER_MODE` in DML: runs the query or save with the user's object, field and sharing permissions.
- **`WITH SECURITY_ENFORCED`**: older clause that throws an error if the user lacks field access.
- **`Security.stripInaccessible()`**: removes inaccessible fields from records.
- **Schema checks**: `Schema.sObjectType.Account.isAccessible()`, `fields.Name.isUpdateable()`.

```apex
List<Account> accs = [SELECT Id, Name FROM Account WITH USER_MODE];
```

## Profiles, permission sets and code

- Profiles and permission sets decide object (CRUD) and field (FLS) access.
- Sharing (org-wide defaults, roles, sharing rules, manual shares) decides which records.
- Code that must act for the user should enforce these. Code that runs in system mode must be deliberately safe: never return data the user should not see.

:::on-the-job
Default to `with sharing` and user mode. Use `without sharing` only for a narrow, documented reason, and keep that class small so reviewers can audit it.
:::

## Recap

- Multitenancy leads to governor limits.
- Master-detail: required parent, cascade delete, inherited security, roll-ups. Lookup: optional.
- Custom metadata is best for deployable configuration.
- `with sharing` covers records only. Use user mode, stripInaccessible or schema checks for CRUD and FLS.
