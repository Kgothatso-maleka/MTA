---
title: Apex Integration and Flow Together
examSection: process-logic
objectives:
  - 'Call external REST services using HttpRequest, HttpResponse and Named Credentials'
  - 'Expose Apex as a REST service with @RestResource'
  - 'Explain why you cannot make a callout after uncommitted DML in the same transaction'
  - 'Call Apex from Flow using invocable methods and choose between Flow and Apex'
  - 'Use custom metadata, platform events and error handling in integrations'
youtubeId: null
estMinutes: 50
prerequisites: []
---
## Start here: Salesforce talks to other systems

Khanyisa Solar's billing runs in another system. Salesforce must send it each completed installation, and the billing system must be able to ask Salesforce for status. That is **integration**.

:::key-terms
- **Callout**: Apex calling an external web service.
- **Named Credential**: stores the endpoint and authentication so no secrets appear in code.
- **Invocable method**: Apex a flow can call.
- **REST resource**: Apex that other systems call.
:::

## Outbound REST callout

```apex
HttpRequest req = new HttpRequest();
req.setEndpoint('callout:Billing_System/api/invoices');
req.setMethod('POST');
req.setHeader('Content-Type', 'application/json');
req.setBody(JSON.serialize(payload));

HttpResponse res = new Http().send(req);
if (res.getStatusCode() == 200) {
  Map<String, Object> body = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
}
```

- `callout:Name` uses a **Named Credential**. It holds the URL and the OAuth or password settings. Never hardcode secrets.
- Limits: **100 callouts** per transaction and a **120-second** total callout time.
- Use `JSON.serialize` and `JSON.deserialize` for typed data.

:::exam-trap
You **cannot make a callout after DML in the same transaction** ("uncommitted work pending"). Make the callout first, or move it to an `@future(callout=true)` or queueable job.
:::

## Remote Site Settings and Named Credentials

An external endpoint must be authorised. **Named Credentials** do this and handle authentication. Older code used **Remote Site Settings**.

## Inbound: expose Apex as REST

```apex
@RestResource(urlMapping='/installations/*')
global with sharing class InstallationApi {
  @HttpGet
  global static Installation__c getOne() {
    String id = RestContext.request.requestURI.substringAfterLast('/');
    return [SELECT Id, Status__c FROM Installation__c WHERE Id = :id];
  }
}
```

- Annotations: `@HttpGet`, `@HttpPost`, `@HttpPut`, `@HttpPatch`, `@HttpDelete`.
- The class and methods are `global` and the methods `static`.
- Callers authenticate with **OAuth** through a **Connected App**.

## Testing callouts

Tests **cannot make real callouts**. Use **`Test.setMock(HttpCalloutMock.class, new MyMock())`** to return a fake response.

## Flow and Apex together

- An Apex method marked **`@InvocableMethod`** appears as an **action** in Flow.
- It takes a **List** as input (bulk-friendly) and returns a list.

```apex
public class InvoiceAction {
  @InvocableMethod(label='Create Invoice')
  public static List<Id> create(List<Id> installationIds) { ... }
}
```

- Use **flow** for simple, admin-owned logic. Call **Apex** from flow for what flow cannot do (complex maths, callouts, bulk logic).
- **Screen flows** can host **LWC components** and call Apex.

## Platform events and custom metadata in integrations

- Publish a **platform event** so any subscriber (flow, trigger, outside system through the Pub/Sub API) can react.
- Store endpoints, mappings and thresholds in **custom metadata**.

## Errors and retries

- Check **status codes** and handle failures. Do not assume success.
- Log failures to a custom object for review.
- For retries, use a **queueable** that re-enqueues itself after a failure.

:::on-the-job
Build integrations with a Named Credential from day one. Then the same code runs against sandbox and production URLs without edits, and no password ever sits in source control.
:::

## Recap

- Callouts use `Http`, `HttpRequest`, `HttpResponse` and Named Credentials. Limit 100 per transaction.
- No callout after uncommitted DML. Tests use `HttpCalloutMock`.
- `@RestResource` exposes Apex. `@InvocableMethod` makes Apex callable from Flow.
