---
title: Importing, Updating, Exporting and Backing Up Data
examSection: data-analytics
objectives:
  - 'Choose between the Data Import Wizard and Data Loader for a given job'
  - 'Prepare a clean CSV file and explain why record IDs and external IDs matter'
  - 'Describe insert, update, upsert, delete, hard delete, export and export all'
  - 'Use mass transfer, mass delete, merge and the Recycle Bin safely'
  - 'Explain the ways to back up data and why a backup is not a restore'
  - 'Run a safe import in a real org: test first, load parents before children'
youtubeId: null
estMinutes: 45
prerequisites: []
---
## Start here: moving house

Khanyisa Solar has just signed a deal with a big housing developer. Sales hands you a spreadsheet with 8,000 prospects and says, "Put these in Salesforce by Friday."

Moving data into Salesforce is like moving house. You do not throw everything into the truck. You pack in boxes, label them, decide what goes in which room, and keep a copy of anything valuable. Data work follows the same habits:

- **Clean** the data before it moves.
- **Label** every row so Salesforce knows which existing record it belongs to (or that it is new).
- **Test** with a few boxes first.
- **Keep a backup** in case something goes wrong.

:::key-terms
- **CSV file**: a plain-text spreadsheet (comma separated values). Both import tools read CSV files.
- **Record ID**: the unique 15- or 18-character ID Salesforce gives every record. Used to update existing records.
- **External ID**: a custom field you mark as External ID, holding a unique key from another system (for example a customer number). It lets you match records without knowing the Salesforce ID.
- **Insert**: create new records.
- **Update**: change existing records (needs a record ID).
- **Upsert**: update if a match exists, insert if not.
- **Soft delete**: delete to the Recycle Bin. **Hard delete**: delete for good.
- **Data Export Service**: the built-in tool that packages your data into CSV files for backup.
:::

## Choosing the right tool

Salesforce gives you two main import tools. The exam asks you to pick the right one for a scenario.

| | **Data Import Wizard** | **Data Loader** |
|---|---|---|
| Where it runs | In your browser, from Setup | A desktop application you install |
| Size | Up to **50,000** records at a time | Up to **5 million** records |
| Objects | Accounts, contacts, leads, campaign members, solutions, person accounts and custom objects | Almost any object that the API supports |
| Operations | Insert, update, upsert (add new and update existing) | Insert, update, upsert, delete, hard delete, export, export all |
| Scheduling | No | Yes, through the command line |
| Best for | A small, one-off load by a non-technical user | Large, repeated or delete and export jobs |

:::exam-trap
Opportunities and cases are **not** supported by the Data Import Wizard. If the question involves those objects, or more than 50,000 records, or **deleting** or **exporting**, the answer is **Data Loader**.
:::

### Why Data Loader needs more care

Data Loader talks to Salesforce through the API, so the user needs the **API Enabled** permission. It matches records by **record ID** or **external ID** only. It does not look for duplicate names or emails for you. The Data Import Wizard, in contrast, can match on fields such as email or name and avoid creating duplicates.

## Operations in Data Loader

- **Insert**: creates new records.
- **Update**: changes existing records. Every row needs the record ID.
- **Upsert**: uses an ID or an **external ID** field to decide. Match found: update. No match: insert. More than one match: that row errors.
- **Delete**: moves records to the **Recycle Bin**.
- **Hard Delete**: removes records **permanently**, bypassing the Recycle Bin. It needs the **Bulk API Hard Delete** permission, which nobody has by default.
- **Export**: writes records to a CSV file.
- **Export All**: also includes records in the Recycle Bin.

Every run produces a **success file** and an **error file**. Always read the error file.

:::on-the-job
Real orgs have no "undo" button for a bad update. Before any update or delete, **export the records you are about to change** and keep that file. Then if something goes wrong you can load the old values back.
:::

## Record IDs and external IDs

Imagine two people called "Thabo Nkosi". Names do not identify a record. IDs do.

- To **update** records, your CSV needs the Salesforce **record ID** column. Get it by running a report that includes the ID or by exporting the records first.
- To **connect** new records to others (a new Contact to an existing Account), you use the parent's ID or its external ID.
- An **external ID** is a custom field with the External ID box ticked. It is usually a text, number or email field and is often unique. Use it when your data comes from another system that has its own keys, because then you can **upsert** without looking up Salesforce IDs.

An object can have up to 25 external ID custom fields.

## Preparing a clean import file

Most failed imports are caused by the file, not the tool. Before loading:

- One header row, one record per row, no blank rows or merged cells.
- Remove duplicates inside the file itself.
- Picklist values must match the Salesforce values exactly (including spelling and case rules).
- Check dates, phone numbers and number formats.
- Make sure **required fields** have values.
- Remember **validation rules** and **automation** (flows, triggers) still run on imported records. A rule that blocks a bad record will also block a bad row.
- Records you do not assign to an owner are owned by the user running the import.

### Load in the right order

Children point at parents, so the parent must exist first. For Khanyisa Solar: **Accounts → Contacts → Opportunities**. Loading Contacts before their Accounts exist fails, because there is nothing to link to.

:::exam-trap
Salesforce does not decide the order for you. If a scenario says contact rows fail because the account is missing, the fix is to load the parent records first, then link children by ID or external ID.
:::

## Mass transfer, mass delete and merge

These are built-in admin tools in Setup for fixing data you already have.

- **Mass Transfer Records**: move many records from one owner to another. It works for **accounts, leads, campaigns, service contracts and custom objects**. A common case is a rep leaving the company. To change the owner of opportunities or cases in bulk, use a list view (Change Owner) or Data Loader.
- **Mass Delete Records**: delete many records of one object at once, using filters. Deleted records go to the Recycle Bin.
- **Merge**: combine up to **three** duplicate accounts, contacts or leads into one. You pick the **master record**. Related records move to it and the others go to the Recycle Bin.

### The Recycle Bin

Deleted records are kept in the Recycle Bin for **15 days** and can be restored. After that, or after a hard delete or emptying the bin, they are gone. Deleting an account also deletes related records such as its contacts and opportunities (with some exceptions), and restoring the account can bring them back.

## Backing up data

Salesforce is in the cloud, but you are still responsible for knowing how to get your data out. The common ways:

- **Data Export Service** (Setup > Data Export): creates CSV files of your data on a **weekly or monthly** schedule, depending on your edition, or on demand. You get an email with a download link, and the files are only available for **48 hours**, so download them promptly.
- **Data Loader export**: for specific objects, including scheduled exports from the command line.
- **Reports**: export report results to Excel or CSV for a small, specific data set.
- **Paid backup tools**: Salesforce Backup and Restore, or AppExchange products, offer automatic backup **and restore**.

:::exam-trap
The Data Export Service gives you CSV files. That is a **backup**, not a one-click **restore**. Putting the data back means importing the files again. Only dedicated backup products restore for you.
:::

## A safe import, step by step

1. Ask what the business needs and which object and fields are involved.
2. **Back up** the target data (export what you will touch).
3. Clean the file and map your columns to Salesforce fields.
4. Test with 5 to 10 rows in a **sandbox** or developer org.
5. Check validation rules, duplicate rules and automations for side effects. Consider turning off non-essential automation for the load, with approval.
6. Load parents, then children.
7. Check the success and error files, then run a report to confirm counts.
8. Document what you did.

:::on-the-job
Tell the business **before** a big load: new records can trigger emails, assignments and flows, and a load can slow the org down for other users. Schedule large jobs for quiet hours and warn the team.
:::

## Recap

- Import Wizard: up to 50,000 records, browser-based, can match on email or name, no delete or export, no opportunities or cases.
- Data Loader: up to 5 million, all operations including hard delete and export, needs API Enabled, matches by ID or external ID only.
- Update needs record IDs. Upsert needs an ID or external ID field.
- Load parents before children. Clean first, test in a sandbox, back up before changing.
- Recycle Bin = 15 days. Merge = up to 3 records. Data Export files stay for 48 hours.
- Data Export is a backup, not a restore.
