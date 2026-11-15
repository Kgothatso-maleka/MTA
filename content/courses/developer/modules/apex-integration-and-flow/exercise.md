---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every click and keystroke.

## Scenario

When an Installation is Completed, Salesforce must post it to the billing system. A flow starts the process.

## What to build

1. Create a **Named Credential** `Billing_System` pointing at a free test endpoint (for example a public mock API).
2. Write `BillingService.send(List<Id>)` that posts JSON with `HttpRequest` and checks the status code.
3. Write an `@InvocableMethod` that calls the service, then call it from a **record-triggered flow**.
4. Write a mock class implementing `HttpCalloutMock`, and a test using `Test.setMock`.
5. Expose `GET /installations/{id}` using `@RestResource` and call it from Postman with a Connected App.
6. Try a DML then a callout in one transaction and read the error. Fix it with a queueable.

## What you should see when you are done

- [ ] The flow triggers a callout.
- [ ] The test passes without a real network call.
- [ ] The DML-then-callout error disappears after your fix.

## Check your understanding

- [ ] Why use a Named Credential?
- [ ] What annotation exposes a method to Flow?
- [ ] Why can tests not make real callouts?

## Stretch goal

Log each failed callout to a custom object and retry it from a scheduled job.
