---
title: Testing Apex
examSection: testing-deploy
objectives:
  - 'Write test classes with @isTest, test data, assertions and Test.startTest and stopTest'
  - 'Explain code coverage rules for deployment'
  - 'Test triggers, bulk behaviour, negative cases and different users with System.runAs'
  - 'Mock callouts and use @testSetup'
  - 'Explain why tests should not depend on existing org data'
youtubeId: null
estMinutes: 45
prerequisites: []
---
## Start here: proof that your code works

Tests are code that checks your code. Salesforce **requires** them: you cannot deploy Apex to production without enough coverage.

:::key-terms
- **Test class**: a class marked `@isTest` that checks other code.
- **Code coverage**: the percentage of Apex lines that ran during tests.
- **Assertion**: a statement that fails the test if untrue.
- **Test data**: records you create inside the test.
:::

## The rules

- **75% of Apex code in the org** must be covered to deploy to production. Every **trigger must have some coverage**. Aim for much more, and for meaningful checks.
- **All tests must pass** during deployment.
- Test records are **rolled back**: they are **never saved** to the database.
- Tests do **not see existing org data** by default (`SeeAllData=false`). Create your own data.
- Test methods are `static` and `testMethod` or `@isTest`.
- Test classes and methods **do not count** toward the org's Apex size limit.

## A good test

```apex
@isTest
private class PriceCalculatorTest {
  @isTest static void addsVat() {
    Decimal result = PriceCalculator.addVat(100);
    System.assertEquals(115, result, 'VAT should be 15%');
  }
  @isTest static void rejectsBadDiscount() {
    try { PriceCalculator.applyDiscount(100, 150); System.assert(false, 'Expected exception'); }
    catch (PriceException e) { System.assert(e.getMessage().contains('percent')); }
  }
}
```

- Use **`Assert.areEqual`** / `System.assertEquals` to check results. A test with no assertion proves nothing even if it covers lines.
- Test **positive**, **negative** and **bulk (200 records)** cases.

## Test data and @testSetup

```apex
@testSetup static void setup() {
  insert new Account(Name = 'Test Co');
}
```

- `@testSetup` creates data **once** for every test method in the class. Changes made by a method are rolled back for the next.
- A **test data factory** class (a utility class marked `@isTest`) keeps data creation in one place.

## startTest and stopTest

`Test.startTest()` and `Test.stopTest()` give the code in between **fresh governor limits**. `stopTest` also **forces asynchronous work** (future, queueable, batch) to finish so you can assert on the result.

```apex
Test.startTest();
System.enqueueJob(new RecalcJob());
Test.stopTest();
System.assertEquals(5, [SELECT COUNT() FROM Invoice__c]);
```

## Testing as another user

```apex
User u = [SELECT Id FROM User WHERE Profile.Name = 'Standard User' LIMIT 1];
System.runAs(u) { /* code runs with u's sharing and permissions */ }
```

`System.runAs` tests sharing and permissions. It also gets around **mixed DML** errors in tests.

## Mocking callouts

Tests **cannot make callouts**. Use `Test.setMock(HttpCalloutMock.class, new BillingMock())`. Also use **`Test.loadData`** to load records from a static resource CSV.

## Testing triggers and flows

- Create or update records with DML in the test and assert the **result**: fields changed, child records created.
- The record-triggered **flows also run** during the test, so account for them.

:::exam-trap
Tests do not need 100% coverage, but **75% across the org** is the deployment rule. High coverage with **no assertions** still passes the rule but does not give real protection.
:::

:::on-the-job
Write the test for the **business rule** ("a completed installation creates exactly one invoice") rather than for the method name. Good tests catch the bug that a later change introduces.
:::

## A worked example: testing the invoice rule

The rule: "When an Installation becomes Completed, create exactly one Invoice."

```apex
@isTest
private class InstallationInvoiceTest {
  @isTest static void createsOneInvoiceOnCompletion() {
    Installation__c i = new Installation__c(Name = 'Test', Status__c = 'Scheduled');
    insert i;

    Test.startTest();
    i.Status__c = 'Completed';
    update i;
    Test.stopTest();

    System.assertEquals(1, [SELECT COUNT() FROM Invoice__c WHERE Installation__c = :i.Id]);
  }

  @isTest static void doesNotCreateInvoiceWhenStatusUnchanged() {
    Installation__c i = new Installation__c(Name = 'Test', Status__c = 'Scheduled');
    insert i;
    update i;
    System.assertEquals(0, [SELECT COUNT() FROM Invoice__c]);
  }
}
```

Why this is a good pair of tests:

- The **first** proves the rule. The **second** proves it does not fire when it should not.
- Each test creates its **own data**.
- Each asserts on the **result** (the count), not on how the code works.

## Mocking a callout

```apex
public class BillingMock implements HttpCalloutMock {
  public HTTPResponse respond(HTTPRequest req) {
    HttpResponse res = new HttpResponse();
    res.setStatusCode(200);
    res.setBody('{"status":"ok"}');
    return res;
  }
}
// in the test
Test.setMock(HttpCalloutMock.class, new BillingMock());
```

Write a second mock that returns **500** to prove the code handles failure.

## Common testing mistakes

- Asserting nothing, or asserting something that is always true.
- Using `SeeAllData=true` to avoid building data.
- Testing only one record, so the bulk bug appears in production.
- Hardcoding Ids or names from one org that do not exist in another.
- Forgetting that flows and other triggers also run on the test DML.
- Writing tests only to reach 75%, instead of to prove behaviour.

## Recap

- 75% org-wide coverage, all tests pass, triggers need some coverage.
- Create your own data. Use `@testSetup`, factories and `System.runAs`.
- `startTest/stopTest` reset limits and run async work to completion.
- Mock callouts. Always assert.
