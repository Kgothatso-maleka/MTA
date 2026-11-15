---
title: Objects, Fields and Relationships
examSection: object-manager
objectives:
  - 'Explain what an object, a record and a field are, and how standard and custom objects differ'
  - 'Choose the right field type for a business need, including formula and roll-up summary fields'
  - 'Choose between lookup, master-detail, many-to-many (junction) and hierarchical relationships'
  - 'Write a validation rule and explain when it fires'
  - 'Use record types, business processes and page layouts together without mixing up their jobs'
  - 'Change and delete fields safely in an org that already has data'
youtubeId: null
estMinutes: 40
prerequisites: []
---
## Start here: the filing-cabinet idea

Imagine a filing cabinet for Khanyisa Solar, a company that installs rooftop solar systems. One drawer holds **customer** folders. Another drawer holds **installation jobs**. Each folder has the same printed form with boxes to fill in: name, address, system size, install date.

Salesforce works the same way, with different words:

- The **drawer** is an **object**.
- One **folder** is a **record**.
- One **box on the form** is a **field**.
- A **link between two drawers** ("this installation job belongs to that customer") is a **relationship**.

If you have used a spreadsheet, you already know the idea. An object is like a sheet, a record is a row, and a field is a column. Salesforce adds rules and security around those sheets, and that is what the rest of this lesson is about.

:::key-terms
- **Object**: a table that stores one kind of thing, such as Account or Case. Found under Setup > Object Manager.
- **Record**: one row in an object, such as one customer.
- **Field**: one column on an object, such as Phone.
- **Standard object**: an object that comes with Salesforce (Account, Contact, Lead, Opportunity, Case).
- **Custom object**: an object you create. Its API name ends in `__c`, for example `Installation__c`.
- **API name**: the name code and integrations use. It never has spaces. The **label** is what people see on screen.
- **Relationship**: a field that connects records in two objects.
:::

## Standard objects and custom objects

Salesforce ships with standard objects for common business needs. You can customise them (add fields, rules, layouts) but you cannot delete them.

When the business needs to track something Salesforce does not have, you create a **custom object**. Khanyisa Solar tracks installation jobs, so an admin creates `Installation__c`. Custom objects and custom fields always get the `__c` suffix on their API name.

When you create a custom object, you decide a few things up front, such as whether it allows reports, activities (tasks and events) and field history tracking. It is much easier to switch these on now than to discover later that nobody can report on the object.

:::on-the-job
Choose names carefully on day one. The **label** can be changed safely at any time. The **API name** cannot be changed without breaking anything that mentions it, such as flows, reports, integrations and code. Agree a naming convention with your team (for example, singular nouns and no abbreviations nobody can decode) before you build.
:::

## Fields: choosing the right type

Every field has a **data type**, and the type decides what can be stored and how it behaves. Pick the most specific type that fits, because a precise type gives you free validation and better reports.

| You need to store | Use this type |
|---|---|
| A short piece of text (up to 255 characters) | Text |
| A long note (up to 131,072 characters) | Long Text Area |
| A whole or decimal number | Number |
| Money | Currency |
| A percentage | Percent |
| A day, or a day and time | Date, Date/Time |
| Yes or no | Checkbox |
| One choice from a list | Picklist |
| Several choices from a list | Picklist (Multi-Select) |
| An email address, phone number or web address | Email, Phone, URL |
| A system-numbered reference such as INS-0001 | Auto Number |
| A value worked out from other fields | Formula |
| A total, count, minimum or maximum of child records | Roll-Up Summary |
| A link to another record | Lookup or Master-Detail |

### Formula fields

A **formula field** is calculated for you. People cannot type into it. For example, a formula could show "Annual saving" by multiplying system size by a rate. It always shows the current result, because it recalculates when you view the record. A formula can also read fields from a related parent record, which is called a cross-object formula.

### Picklists, dependent picklists and global value sets

A **dependent picklist** shows different choices depending on another field. For example, picking Province "Gauteng" shows only Gauteng cities. The field that decides is the **controlling field**. It must be a picklist or a checkbox. The field that changes is the **dependent field**.

A **global value set** is one list of values you define once and reuse in many picklist fields across objects. Change the list in one place and every field that uses it updates.

### Required fields: layout versus field level

You can make a field required in two different places, and they do not behave the same way.

- **Required on the page layout**: only the screen enforces it. A data load, an integration or a flow can still save a record with the field empty.
- **Required in the field definition** (the "Required" checkbox when you create the field): enforced everywhere, including the API and imports.

:::exam-trap
If a question says a field must be filled in "no matter how the record is created", including imports and integrations, the answer is the field-level Required setting (or a validation rule). A layout-only requirement is not enough.
:::

## Relationships: how records connect

A relationship is a field on the **child** record that points to a **parent** record. The most important skill in this lesson is picking the right kind.

### Lookup relationship

A lookup is a **loose** link. The child can exist without a parent (unless you make the lookup field required). The child has its own **owner** and its own sharing. If you delete the parent, you choose what happens to the child: clear the lookup value, or block the delete. Contact to Account is a lookup, and a contact can exist without an account.

### Master-detail relationship

A master-detail is a **tight** link. The **master** is the parent and the **detail** is the child.

- The detail record **must** have a master. The field is always required.
- The detail record **inherits** its sharing and security from the master and does not have its own owner field.
- Deleting the master **also deletes** all its detail records (cascade delete).
- You can create **roll-up summary fields** on the master. A roll-up summary can be a COUNT, SUM, MIN or MAX of the detail records. There is no AVERAGE.
- A custom object can have **at most two** master-detail relationships.

At Khanyisa Solar, if `Installation__c` is the detail of Account, you can add a roll-up on Account called "Total kW installed" that sums the system size of all installations for that customer, with no code.

### Many-to-many: the junction object

One installation needs several installers, and one installer works on many installations. A single lookup cannot model that. You create a **junction object**, for example `Installation_Installer__c`, that has **two master-detail relationships**: one to Installation and one to Installer. Each junction record is one pairing.

The first master-detail you create is the **primary** one. It decides things such as ownership behaviour. A junction record inherits sharing from **both** masters, so a user needs access to both parents to see the pairing. Deleting either master deletes the junction records.

### Hierarchical relationship

A hierarchical relationship is a special lookup that is available only on the **User** object. It links a user to another user, for example the Manager field.

### Quick comparison

| | Lookup | Master-detail |
|---|---|---|
| Parent required? | No (optional by default) | Yes, always |
| Child has its own owner? | Yes | No, follows the master |
| Sharing | Independent | Inherited from master |
| Delete parent | Clear value or block | Deletes the children |
| Roll-up summary on parent | No | Yes |

:::exam-trap
Remember the limits that questions love: a custom object has **at most two** master-detail relationships; **roll-up summaries need master-detail**; **hierarchical relationships exist only on User**; and a many-to-many needs **two master-detail** fields on a junction object.
:::

:::on-the-job
Converting is possible but has conditions. A lookup can become a master-detail only if **every existing record already has a value** in the lookup field. A master-detail can become a lookup only if there are **no roll-up summary fields** relying on it. When you must add a master-detail to an object that already holds records, create it as a lookup first, fill in the blanks, then convert it. Plan the relationship type before data exists, because changing it later is real work.
:::

### Lookup filters

A **lookup filter** limits which records people can choose in a lookup field. For example, the Installer field on a job might only allow installers whose Status is Active. Filters can be required (they block bad choices) or optional (they warn).

## Validation rules: stopping bad data at the door

A **validation rule** checks the data when someone saves a record. You write a formula that returns **TRUE when the data is wrong**. If it returns TRUE, the save is blocked and your error message appears, either at the top of the page or next to a field.

Two examples for Khanyisa Solar:

```
System_Size_kW__c <= 0
```
Error: "System size must be greater than zero."

```
AND(ISPICKVAL(Status__c, "Completed"), ISBLANK(Completion_Date__c))
```
Error: "Add a completion date before marking an installation as Completed."

Notice `ISPICKVAL`. Picklist fields cannot be compared with `=` in a formula, so you must use `ISPICKVAL(field, "value")`.

:::exam-trap
A validation rule formula returns **TRUE when the record is INVALID**, the opposite of what many beginners expect. Rules fire when records are saved from the screen **and** from imports, flows and code, not just the UI.
:::

## Record types, business processes and page layouts

These three are often mixed up. Learn the job of each.

- **Record type**: lets different groups of users see **different picklist values**, a **different page layout**, and (on some objects) a **different business process** for the same object. Khanyisa Solar might have "Residential" and "Commercial" installation record types.
- **Business process**: the set of stages or statuses for a record type. There are four kinds: the **sales process** (Opportunity stages), the **lead process** (Lead status), the **support process** (Case status) and the **solution process** (Solution status).
- **Page layout**: controls which **fields, sections, related lists and buttons** appear on a record page, and which fields are read-only or required on that screen.

Record types are made available to users through **profiles and permission sets**. Each profile also has a **default record type**, and page layouts are assigned per profile and record type.

### Layouts and field-level security together

If a field is on the page layout but **field-level security** hides it from the user's profile, the user does **not** see it. Field-level security wins. Hiding a field with a page layout only hides it on that screen. The field can still appear in reports, list views and the API. Only field-level security truly hides it.

:::exam-trap
"Remove the field from the page layout" is **not** a security control. If the question is about stopping someone from seeing or editing data anywhere, think field-level security.
:::

## Working safely in a real, busy org

Real orgs have years of fields, rules and automation built by different people. Before changing anything:

- **Check where a field is used.** Use the field's "Where is this used?" tool and search the Setup pages. A custom field used in a formula, validation rule, flow, report or layout cannot be deleted until you remove those references.
- **Know that deleting is reversible for a short time.** A deleted custom field is kept for about **15 days** and can be restored from the Deleted Fields list. After that it is gone. **Standard fields cannot be deleted at all.**
- **Be careful when changing a field's type.** Some changes lose data, such as changing text to a number. Test in a **sandbox** first.
- **Use field history tracking sparingly.** An object can track up to 20 fields. Pick the fields that matter for audit.
- **Write a description on every field.** The next admin, who may be you in a year, will thank you.

:::on-the-job
Your first move on a new project is rarely to build. It is to read: open Object Manager, look at the fields, relationships, rules and layouts, and ask "who uses this?" Senior admins are trusted because they change very little by accident.
:::

## Recap

- Object = table, record = row, field = column. Custom items end in `__c`.
- Match the field type to the data. Formula calculates; roll-up summarises children.
- Lookup = loose, optional, own owner. Master-detail = tight, required, inherited sharing, cascade delete, enables roll-ups. Many-to-many = junction object with two master-details. Hierarchical = User only.
- Validation rules return TRUE for bad data and fire everywhere a record is saved.
- Record types vary picklists, layouts and processes. Page layouts arrange the screen. Field-level security is the real lock.
