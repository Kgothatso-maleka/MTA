---
title: Apex Triggers and the Order of Execution
examSection: process-logic
objectives:
  - 'Write triggers for before and after events and choose the right context variables'
  - 'Explain what you can and cannot change in before versus after triggers'
  - 'Describe the order of execution when a record is saved'
  - 'Apply the one-trigger-per-object pattern with a handler class'
  - 'Prevent recursion and decide when a trigger is better than a flow'
youtubeId: null
estMinutes: 55
prerequisites: []
---
## Start here: code that reacts

A **trigger** is Apex that runs automatically **before or after** a record is inserted, updated, deleted or undeleted. When a Khanyisa Solar installation is marked Complete, a trigger can create the invoice record.

:::key-terms
- **Trigger**: Apex attached to one object and fired by data events.
- **Context variables**: values Salesforce gives a trigger, such as `Trigger.new`.
- **Before trigger**: runs before the record is saved. Used to change or check the record itself.
- **After trigger**: runs after the record has an Id. Used to change other records.
- **Recursion**: a trigger that fires itself again through its own update.
:::

## Trigger syntax

```apex
trigger InstallationTrigger on Installation__c (before insert, before update, after insert) {
  if (Trigger.isBefore && Trigger.isInsert) {
    for (Installation__c i : Trigger.new) {
      if (i.Planned_Date__c == null) { i.addError('Planned date is required.'); }
    }
  }
}
```

Events: `before insert`, `before update`, `before delete`, `after insert`, `after update`, `after delete`, `after undelete`.

## Context variables

| Variable | Meaning |
|---|---|
| `Trigger.new` | List of new versions of records |
| `Trigger.old` | List of old versions |
| `Trigger.newMap` / `Trigger.oldMap` | Maps keyed by Id |
| `Trigger.isInsert`, `isUpdate`, `isDelete`, `isUndelete` | Which operation |
| `Trigger.isBefore`, `isAfter` | Which timing |
| `Trigger.size` | Number of records |

- `Trigger.new` is **not available on delete**. `Trigger.old` is **not available on insert**.
- `Trigger.newMap` is **not available on before insert** (no Ids yet).
- In **before** triggers you can **change** `Trigger.new` fields directly, with no DML. In **after** triggers `Trigger.new` is **read-only**.
- **`addError()`** blocks the save and shows a message.

:::exam-trap
Use a **before** trigger to update fields on the **same record** (no extra DML needed). Use an **after** trigger when you need the **record Id** or must change **related** records.
:::

## Order of execution (simplified)

1. System validation and **before-save record-triggered flows**.
2. **Before triggers**.
3. Custom **validation rules** (and required-field checks).
4. **Duplicate rules**.
5. The record is saved to the database (not yet committed).
6. **After triggers**.
7. Assignment, auto-response, workflow rules (legacy).
8. **After-save record-triggered flows**.
9. Roll-up summaries and sharing recalculation.
10. **Commit** to the database, then post-commit work (emails, async jobs).

Remember the shape: **before-save flow, before trigger, validation, after trigger, after-save flow, commit.**

:::exam-trap
Because the transaction is not committed until the end, an error anywhere **rolls everything back**. Validation rules run **after** before triggers, so a before trigger can fix data that a validation rule would otherwise reject.
:::

## One trigger per object, logic in a handler

```apex
trigger InstallationTrigger on Installation__c (before insert, before update, after insert) {
  InstallationHandler.run(Trigger.operationType, Trigger.new, Trigger.oldMap);
}
```

- **One trigger per object** gives you a known order of work.
- Keep the trigger **thin**. Put logic in a **handler class** that can be tested.
- A trigger must be **bulk-safe**: it receives up to **200 records** at a time.

## Preventing recursion

If an after trigger updates the same object, it may fire itself again. Use a **static Boolean** in a handler to run once, or compare `Trigger.oldMap` to detect real changes.

```apex
if (Trigger.oldMap.get(i.Id).Status__c != i.Status__c) { /* run only on change */ }
```

## Trigger or flow?

- Use **flows** for admin-maintained rules and simple updates.
- Use **triggers** for complex logic, many-object coordination, or when flows hit limits.
- Mixing both on one object is allowed but must be planned, because their order matters.

:::on-the-job
Before adding a trigger, ask which flows already run on the object. Use the Developer Console log to see the order. A hidden flow that updates the same field is the most common cause of "my trigger does nothing."
:::

## Recap

- Before triggers change the same record. After triggers need the Id or touch other records.
- Know which context variables exist for each event.
- Order: before-save flow, before trigger, validation, after trigger, after-save flow, commit.
- One thin trigger per object, bulk-safe, with a handler. Guard against recursion.
