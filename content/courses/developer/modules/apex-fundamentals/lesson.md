---
title: Apex Fundamentals
examSection: dev-fundamentals
objectives:
  - 'Explain what Apex is, where it runs and when to use code instead of clicks'
  - 'Declare variables and use primitives, sObjects, collections (List, Set, Map) and enums'
  - 'Write control flow: if, switch, for loops and while loops'
  - 'Write classes with methods, constructors, static members and access modifiers'
  - 'Use interfaces, inheritance, abstract and virtual classes'
  - 'Handle errors with try, catch, finally and custom exceptions'
youtubeId: null
estMinutes: 55
prerequisites: []
---
## Start here: when clicks are not enough

At Khanyisa Solar, a flow can already create an Installation when an Opportunity closes. But finance now wants a rule: "split the installation cost across three suppliers by weight, round to the nearest rand, and stop if the total is over budget." That logic is awkward in a flow. This is where **Apex** helps.

**Apex** is Salesforce's programming language. It looks like Java, runs **on Salesforce servers** (not in the browser), and is **strongly typed** and **object-oriented**. You write it in classes and triggers.

:::key-terms
- **Class**: a blueprint that holds variables and methods.
- **Method**: a named block of code that does one job.
- **sObject**: any Salesforce record, such as an Account, held in code.
- **Collection**: a group of values: List, Set or Map.
- **Static**: belongs to the class, not to one copy of it.
- **Exception**: an error that stops code unless you catch it.
:::

## Declarative first, code when needed

Salesforce recommends **clicks before code**. Use validation rules, flows and formulas when they can do the job. Use Apex when you need:

- Complex logic or calculations.
- Work on large sets of records.
- Callouts to other systems.
- Custom web services.

## Variables and types

```apex
Integer count = 5;
Decimal price = 199.99;
String name = 'Khanyisa Solar';
Boolean active = true;
Date today = Date.today();
Id accountId = '001000000000001AAA';
Account acc = new Account(Name = 'Thabo Traders');
```

- **Primitives**: Integer, Long, Decimal, Double, String, Boolean, Date, Datetime, Time, Id, Blob.
- **Strings** use single quotes.
- A variable that was never set is **null**. Calling a method on null causes a `NullPointerException`.
- Use `final` for constants.

## Collections

| Collection | Ordered? | Duplicates? | Typical use |
|---|---|---|---|
| **List** | Yes, by index | Allowed | Records from a query, records to insert |
| **Set** | No | Not allowed | Unique Ids to filter a query |
| **Map** | Key to value | Keys unique | Fast lookup by Id |

```apex
List<String> cities = new List<String>{'Pretoria', 'Durban'};
Set<Id> ids = new Set<Id>();
Map<Id, Account> byId = new Map<Id, Account>([SELECT Id, Name FROM Account]);
```

:::exam-trap
A **Map built from a SOQL query** uses the record **Id as the key** automatically. A Set removes duplicates silently. Lists are zero-based: the first item is index 0.
:::

## Control flow

```apex
if (amount > 1000) { discount = 0.1; } else { discount = 0; }

for (Account a : accounts) { System.debug(a.Name); }

Integer i = 0;
while (i < 3) { i++; }

switch on status {
  when 'New' { stage = 1; }
  when 'Closed', 'Lost' { stage = 9; }
  when else { stage = 0; }
}
```

## Classes and methods

```apex
public with sharing class PriceCalculator {
  private static final Decimal VAT = 0.15;

  public static Decimal addVat(Decimal amount) {
    return amount * (1 + VAT);
  }
}
```

- **Access modifiers**: `private` (this class only), `protected` (this class and subclasses), `public` (your namespace), `global` (everywhere, used in packages).
- A **constructor** has the class name and no return type.
- **Static** members are called on the class: `PriceCalculator.addVat(100)`.
- `this` refers to the current object.
- Inner classes are allowed.

## Interfaces and inheritance

- An **interface** lists methods with no body. A class that `implements` it must supply them. Salesforce has built-in ones such as `Database.Batchable` and `Schedulable`.
- A **virtual** class can be extended. An **abstract** class can have methods with no body and cannot be created directly.
- A subclass uses `extends`. To change a parent method, the parent method must be `virtual` and the child must `override` it.

## Handling errors

```apex
try {
  insert acc;
} catch (DmlException e) {
  System.debug(e.getMessage());
} finally {
  // always runs
}
```

- Common exceptions: `DmlException`, `QueryException`, `NullPointerException`, `ListException`.
- Create your own by ending the name with `Exception`: `public class PriceException extends Exception {}`.
- **Limit exceptions cannot be caught.**

:::exam-trap
Apex is **case-insensitive**. `ACCOUNT` and `Account` are the same. Strings compared with `==` are case-insensitive too, while `.equals()` is case-sensitive.
:::

:::on-the-job
Put each job in a small, named method. Methods under 30 lines are easier to test and debug. Keep logic out of triggers by moving it into a handler class, as the next modules show.
:::

## Recap

- Apex runs on Salesforce servers, is typed, and looks like Java. Use clicks first.
- Collections: List, Set, Map. Maps from queries key on Id.
- Access modifiers: private, protected, public, global.
- Interfaces need implementing. Virtual and abstract classes allow inheritance.
- Catch exceptions with try/catch/finally. Limit exceptions cannot be caught.
