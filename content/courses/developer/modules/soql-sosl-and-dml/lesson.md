---
title: SOQL, SOSL and DML
examSection: dev-fundamentals
objectives:
  - 'Write SOQL with WHERE, ORDER BY, LIMIT, bind variables and aggregate functions'
  - 'Query across relationships: child to parent with dots and parent to child with subqueries'
  - 'Explain when to use SOSL instead of SOQL'
  - 'Perform DML with insert, update, upsert, delete, undelete and merge'
  - 'Use Database methods with allOrNone and read SaveResult errors'
  - 'Avoid SOQL injection and mixed DML errors'
youtubeId: null
estMinutes: 55
prerequisites: []
---
## Start here: asking Salesforce questions

**SOQL** (Salesforce Object Query Language) reads records from **one object** at a time. **DML** (Data Manipulation Language) changes records. Together they are the heart of most Apex.

:::key-terms
- **SOQL**: query records from an object and related objects.
- **SOSL**: search text across many objects at once.
- **DML**: insert, update, upsert, delete, undelete, merge.
- **Bind variable**: a code variable used inside a query with a colon.
:::

## SOQL basics

```apex
List<Account> accs = [
  SELECT Id, Name, Industry
  FROM Account
  WHERE Industry = 'Energy' AND AnnualRevenue > :minRevenue
  ORDER BY Name
  LIMIT 50
];
```

- `:minRevenue` is a **bind variable**. It is safe and fast.
- **Fields not in the SELECT** cannot be read. Reading them causes an error.
- `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()` are aggregate functions. Use `GROUP BY` and `HAVING` to filter groups.
- `ALL ROWS` includes deleted records. `FOR UPDATE` locks rows.

```apex
AggregateResult[] r = [SELECT Industry, COUNT(Id) c FROM Account GROUP BY Industry];
```

## Relationship queries

| Direction | Syntax | Example |
|---|---|---|
| **Child to parent** | Dot notation | `SELECT Name, Account.Name FROM Contact` |
| **Parent to child** | Subquery using the **child relationship name** (plural) | `SELECT Name, (SELECT LastName FROM Contacts) FROM Account` |
| Custom objects | Relationship name ends in `__r` | `Owner__r.Name`, `Jobs__r` |

- You can go up to **5 levels** child to parent in a query, and one level parent to child in a subquery.

:::exam-trap
For a custom lookup field `Installation__c`, the **field** is `Installation__c` but the **relationship name** to traverse is `Installation__r`. Parent-to-child subqueries use the **child relationship name**, not the object name.
:::

## SOQL for loops

```apex
for (Account a : [SELECT Id FROM Account]) { ... }
```

A SOQL **for loop** retrieves records in chunks of 200, which saves heap memory on big queries.

## SOSL

```apex
List<List<SObject>> r = [FIND 'Thabo*' IN NAME FIELDS RETURNING Account(Name), Contact(LastName)];
```

- Searches **text fields in several objects at once** and returns a **list of lists**.
- Use SOQL when you know the object. Use SOSL for "find this text anywhere".

## DML

| Statement | Use |
|---|---|
| `insert` | Create records. Ids are filled in afterwards |
| `update` | Change records that have an Id |
| `upsert` | Insert or update by Id or **external ID** |
| `delete` / `undelete` | Move to and out of the recycle bin |
| `merge` | Combine up to 3 records of the same type |

- Always DML **on lists**, outside loops, so you use one statement for many records.
- **`insert`/`update`** throws an exception on any failure and rolls back all records.
- **`Database.insert(records, false)`** allows **partial success**. It returns a `SaveResult` list. Check `isSuccess()` and `getErrors()`.

```apex
Database.SaveResult[] res = Database.insert(accs, false);
for (Database.SaveResult r : res) {
  if (!r.isSuccess()) { System.debug(r.getErrors()[0].getMessage()); }
}
```

## Mixed DML

You cannot change **setup objects** (such as User or PermissionSetAssignment) and **non-setup objects** (such as Account) in the same transaction. Separate them with `@future` or a queueable job, or `System.runAs` in tests.

## SOQL injection

Never build a query by gluing user input into a string. Use **bind variables**, or `String.escapeSingleQuotes()` if you must use dynamic SOQL with `Database.query`.

:::on-the-job
Select only the fields you need. Filter on **indexed fields** (Id, Name, lookups, external IDs) for large tables. A query that scans millions of rows will time out.
:::

## Recap

- SOQL reads one object, with dot notation up and subqueries down. SOSL searches text across objects.
- DML on lists, not in loops. `upsert` uses external ID.
- `Database` methods with `allOrNone = false` allow partial success.
- Bind variables prevent SOQL injection. Mixed DML is blocked.
