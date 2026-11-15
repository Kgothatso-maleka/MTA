---
title: Governor Limits and Bulkification
examSection: process-logic
objectives:
  - 'Explain why governor limits exist and recall the main synchronous limits'
  - 'Rewrite code with SOQL or DML inside loops into bulk-safe code'
  - 'Use collections and maps to avoid repeated queries'
  - 'Recognise per-transaction versus per-call limits and how asynchronous limits differ'
  - 'Describe how to monitor limits with the Limits class'
youtubeId: null
estMinutes: 45
prerequisites: []
---
## Start here: fair use in a shared building

Because many companies share Salesforce, each transaction gets a **budget**. If your code uses more than its budget, Salesforce **stops it with an uncatchable limit exception**. The skill the exam tests most often is writing code that stays within budget when 200 records arrive at once.

:::key-terms
- **Governor limit**: a cap on resources used in one transaction.
- **Bulkification**: writing code that handles many records together.
- **Transaction**: all the work from one save or request, which commits or rolls back as a whole.
:::

## The limits to memorise (synchronous)

| Limit | Value |
|---|---|
| SOQL queries | **100** |
| Records returned by SOQL | **50,000** |
| DML statements | **150** |
| Records processed by DML | **10,000** |
| CPU time | **10,000 ms** |
| Heap size | **6 MB** |
| Callouts | **100** |
| SOSL queries | **20** |
| Future calls | **50** |
| Queueable jobs added | **50** |

Asynchronous transactions get **higher** limits: for example **200 SOQL queries**, **12 MB heap** and **60,000 ms CPU time**.

:::exam-trap
Limits are **per transaction**, not per class or per trigger. If two triggers and a flow all run in one save, they share one budget of 100 queries.
:::

## The classic mistake

```apex
// BAD: one query and one update for each record
for (Contact c : Trigger.new) {
  Account a = [SELECT Id, Name FROM Account WHERE Id = :c.AccountId];
  a.Description = 'Updated';
  update a;
}
```

With 200 contacts this runs **200 queries** and **200 DML statements** and fails.

## The bulk-safe version

```apex
Set<Id> accIds = new Set<Id>();
for (Contact c : Trigger.new) { accIds.add(c.AccountId); }

Map<Id, Account> accs = new Map<Id, Account>(
  [SELECT Id, Description FROM Account WHERE Id IN :accIds]
);
List<Account> toUpdate = new List<Account>();
for (Contact c : Trigger.new) {
  Account a = accs.get(c.AccountId);
  if (a != null) { a.Description = 'Updated'; toUpdate.add(a); }
}
update toUpdate;
```

Rules to follow:

- **No SOQL or DML inside a loop.**
- **Collect Ids in a Set**, query once with `IN :set`, store in a **Map**.
- **Collect changed records in a List**, do **one DML** after the loop.
- Avoid nested loops over large lists. Use a Map for lookup.

## Watching your budget

```apex
System.debug(Limits.getQueries() + ' of ' + Limits.getLimitQueries());
```

The `Limits` class shows what you have used and what is allowed. The debug log summary also lists limits.

## Other things that save budget

- Query only the fields you need.
- Use **SOQL for loops** for big data.
- Use **`Database.query` only when needed**.
- Cache values in **static variables** for the life of the transaction.
- Move heavy work to **asynchronous Apex** (next module).

:::on-the-job
Always test a trigger with 200 records. If it passes, it is almost certainly bulk-safe. A trigger that works for one record in the UI and fails in a data load is the most common production bug.
:::

## Recap

- Limits are per transaction and uncatchable: 100 SOQL, 150 DML, 50,000 query rows, 10,000 DML rows, 10 s CPU, 6 MB heap.
- No SOQL or DML in loops. Use Sets, Maps and one DML on a List.
- Async limits are higher. Use `Limits` to monitor.
