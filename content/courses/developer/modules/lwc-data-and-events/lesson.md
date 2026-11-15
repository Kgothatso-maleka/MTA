---
title: LWC Data, Apex and Events
examSection: user-interface
objectives:
  - 'Get record data with Lightning Data Service, wire adapters and the record form components'
  - 'Call Apex from LWC with @wire and imperatively, and know the cacheable requirement'
  - 'Pass events from child to parent using CustomEvent and handle them'
  - 'Communicate between unrelated components with Lightning Message Service'
  - 'Navigate with NavigationMixin and show messages with toast events'
  - 'Test components with Jest'
youtubeId: null
estMinutes: 55
prerequisites: []
---
## Start here: components that talk

A card that only shows fixed text is not useful. Components need **data from Salesforce** and a way to **tell each other** what the user did.

:::key-terms
- **Lightning Data Service (LDS)**: gets and saves records without Apex, with caching and security built in.
- **Wire**: a reactive link to data or a function.
- **Imperative Apex**: calling Apex from code when you choose.
- **CustomEvent**: a message a child sends to its parent.
:::

## Lightning Data Service

The simplest way to work with one record:

| Component | Use |
|---|---|
| `lightning-record-form` | Quick view or edit form with minimal code |
| `lightning-record-view-form` | Read-only layout with control |
| `lightning-record-edit-form` | Editable form with custom layout |

LDS respects **field-level security and sharing**, and shares a **cache** across components.

```javascript
import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import STATUS from '@salesforce/schema/Installation__c.Status__c';

export default class Status extends LightningElement {
  @api recordId;
  @wire(getRecord, { recordId: '$recordId', fields: [STATUS] }) record;
  get status() { return getFieldValue(this.record.data, STATUS); }
}
```

- `'$recordId'` with a **dollar sign** makes the wire reactive: it re-runs when `recordId` changes.

## Calling Apex

```apex
public with sharing class InstallationController {
  @AuraEnabled(cacheable=true)
  public static List<Installation__c> getLate() { return [SELECT Id, Name FROM Installation__c WHERE Status__c = 'Late']; }

  @AuraEnabled
  public static void markDone(Id installationId) { ... }
}
```

```javascript
import getLate from '@salesforce/apex/InstallationController.getLate';
import markDone from '@salesforce/apex/InstallationController.markDone';

@wire(getLate) late;                       // wired
async handleClick() { await markDone({ installationId: this.id }); }  // imperative
```

- Methods must be **`@AuraEnabled`** and **static**.
- **`cacheable=true`** is **required for `@wire`** and **cannot change data** (no DML).
- A method that changes data is called **imperatively**.
- To refresh cached wired data after a change, use **`refreshApex`**.

:::exam-trap
`@wire` works only with `@AuraEnabled(cacheable=true)` methods. If a method does DML, it cannot be cacheable, so call it imperatively.
:::

## Events: child to parent

```javascript
// In the child component:
this.dispatchEvent(new CustomEvent('select', { detail: { id: this.id } }));
```

```html
<c-installation-list onselect={handleSelect}></c-installation-list>
```

- Event names use **lowercase letters, with no spaces and no hyphens**.
- Data goes in **`detail`**.
- `bubbles: true` and `composed: true` let an event pass up through the DOM and across shadow boundaries. Use them sparingly.
- **Parent to child**: set a public `@api` property or call a public `@api` method.

## Unrelated components: Lightning Message Service

For components in different parts of the page, use **Lightning Message Service** with a **message channel**: publish with `publish` and subscribe with `subscribe`. It works across LWC, Aura and Visualforce on the same page.

## Navigation and messages

- **`NavigationMixin`** moves users to records, lists or pages.
- **`ShowToastEvent`** shows a toast message after an action.

```javascript
this.dispatchEvent(new ShowToastEvent({ title: 'Saved', variant: 'success' }));
```

## Testing with Jest

LWC components are tested with **Jest** (`@salesforce/sfdx-lwc-jest`). You create the component, change properties, wait for the DOM to update and assert. Wire adapters and Apex calls are **mocked**.

:::on-the-job
Prefer LDS (`lightning-record-form`, `getRecord`) over Apex for single-record work: less code, built-in security, shared cache. Use Apex for queries across many records or logic LDS cannot do.
:::

## Recap

- LDS for records. `$recordId` makes wires reactive.
- Apex methods: `@AuraEnabled`, static. `cacheable=true` is needed for `@wire` and cannot do DML. Use imperative calls for changes.
- Events: `CustomEvent` child to parent, `@api` parent to child, Lightning Message Service for unrelated components.
- Test with Jest and mocks.
