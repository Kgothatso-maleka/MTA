---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every step.

## Scenario

Your `InstallationTrigger` must be covered and proven correct before deployment to production.

## What to build

1. Create `TestDataFactory` with a method that returns installation records.
2. Write `InstallationTriggerTest` with `@testSetup`.
3. Test 1: a new installation gets a default planned date. Assert the value.
4. Test 2: completing an installation creates one invoice. Assert the count.
5. Test 3: insert **200** installations and assert no limit error.
6. Test 4: complete without a technician and assert the error message.
7. Test 5: use `System.runAs` with a restricted user and assert they cannot see a field.
8. Run tests from the **Developer Console > Test > New Run** and read the coverage report.

## What you should see when you are done

- [ ] All tests pass.
- [ ] The trigger and handler show high coverage.
- [ ] Each test has at least one assertion.

## Check your understanding

- [ ] What is the org-wide coverage rule?
- [ ] What does `stopTest` do to async jobs?
- [ ] Why does a test not see org data by default?

## Stretch goal

Write a callout test using an `HttpCalloutMock` and prove the code handles a 500 response.
