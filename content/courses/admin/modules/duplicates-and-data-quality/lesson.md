---
title: Duplicate Management and Data Quality
examSection: data-analytics
objectives:
  - 'Explain why bad data hurts reports, automation and AI'
  - 'Tell matching rules and duplicate rules apart and say which does what'
  - 'Configure a duplicate rule to allow with an alert, allow and report, or block'
  - 'Find and merge duplicate records'
  - 'Layer validation rules, required fields, picklists and lookup filters to keep data clean'
  - 'Plan an ongoing data quality routine'
youtubeId: null
estMinutes: 35
prerequisites: []
---
## Start here: the messy phone book

Imagine Khanyisa Solar's sales team shares one address book. Over two years, "Mthunzi Dlamini", "M. Dlamini" and "Mthunzi Dlamini (Pty) Ltd" have each been added by three different reps. Now there are three records for one customer.

Problems start immediately:

- Two reps phone the same customer on the same morning.
- Reports show three customers instead of one, so the pipeline looks bigger than it is.
- Automation and AI tools that read this data give poor answers, because they cannot tell which record is the truth.

Data quality is therefore a core part of an admin's job. Salesforce gives you layers of defence, and the exam expects you to know which tool does which job.

:::key-terms
- **Duplicate record**: two or more records that describe the same real-world person or company.
- **Matching rule**: defines **how** Salesforce decides two records are alike (which fields, exact or fuzzy).
- **Duplicate rule**: defines **what happens** when a match is found (alert, block or just report).
- **Fuzzy matching**: finds near matches, such as "Jon" and "John" or "Intl" and "International".
- **Duplicate record set**: a group of records Salesforce has flagged as duplicates of each other.
- **Merge**: combine duplicates into one master record.
:::

## Matching rules and duplicate rules: two pieces, two jobs

The most common exam trap in this topic is mixing these two up.

- A **matching rule** is the **detective**. It says "these records look alike" by comparing fields. Example: same last name, similar first name and same email domain.
- A **duplicate rule** is the **policeman**. It says "when the detective finds a match, do this."

A duplicate rule always **points at a matching rule**. Without one, it has nothing to compare.

Salesforce provides **standard** matching and duplicate rules for accounts, contacts and leads that you can activate. You can also build **custom** ones.

### What a duplicate rule can do

A duplicate rule runs when a record is **created** or **edited**, and you choose the action for each:

- **Allow** the save, and show the user an **alert** ("this looks like a duplicate").
- **Allow** the save and **report** it, so you can review duplicates later in a report.
- **Block** the save, with a message telling the user why.

A rule can also compare **across objects**, for example a new Lead against existing Contacts, and can apply **conditions** (for example only when the record owner is in a certain role).

:::exam-trap
"The system must **stop** users creating duplicates" means a **duplicate rule set to Block**. "Find **similar** records" means a **matching rule**. A matching rule alone never blocks or warns anyone.
:::

### Where duplicates show up

When a rule is set to alert, the user sees a list of possible matches and can open them. If you tick **Report**, Salesforce records the pair so an admin can build a report of duplicate record items.

:::on-the-job
Start with **Allow plus alert** for a few weeks. If you set **Block** on day one, reps will find workarounds, such as adding "x" to the name. Once users trust the matches, tighten the rule to Block for the cases where the match is very strong.
:::

## Cleaning up the duplicates you already have

Rules stop **new** duplicates. Old ones you must handle yourself:

- **Merge** up to three accounts, contacts or leads. You pick the **master**, and for each conflicting field you choose which value survives. Related records (opportunities, activities) move to the master. The other records go to the **Recycle Bin**.
- Use a **report** on duplicate record items to find them.
- For very large clean-ups, export the records, clean them in a spreadsheet, then use **Data Loader** to update and delete.

Merging cannot be undone with one click, so merge carefully and tell the team.

## Keeping data clean from the start: the layers

No single tool does everything. Think in layers, from soft to hard:

1. **Picklists and dependent picklists**: users choose rather than type, so spelling is consistent. A **restricted** picklist refuses any value not on the list, even from an import or the API.
2. **Required fields**: a field that must be filled. Required on the **field** means required everywhere. Required on the **page layout** only means required on that screen.
3. **Validation rules**: check logic, such as "Completion Date is required when Status is Completed", and block the save with a message.
4. **Lookup filters**: limit which records can be chosen in a lookup, for example only active customers.
5. **Duplicate rules**: stop or warn on duplicates.
6. **Automation**: for example a flow that fills a default value or formats a phone number.
7. **Reports and dashboards**: show where data is missing so you can fix it.

:::exam-trap
A field marked required only on the **page layout** is not enforced for imports, the API or other layouts. If the data **must always** be present, make it required on the **field** or use a validation rule.
:::

## Data quality is a routine, not a project

Good admins make it a habit:

- Build a **report** of records missing key fields (no industry, no phone, no owner).
- Review **possible duplicates** weekly or monthly.
- Remove or archive stale records according to company policy and privacy law.
- Give each important object a **data steward**, a named person responsible for it.
- Document the rules so the next admin knows why they exist.

In South Africa, remember that customer data is personal information. Good data quality also helps you meet the requirements of POPIA, such as keeping personal information accurate and not holding more than you need.

## Recap

- Matching rule = **how** records are compared. Duplicate rule = **what** happens when they match.
- Duplicate rules can allow with an alert, allow and report, or block, on create and edit.
- Merge handles old duplicates: up to three records, you choose the master.
- Layer your defences: picklists, required fields, validation rules, lookup filters, duplicate rules, reports.
- Required on the layout is weaker than required on the field.
