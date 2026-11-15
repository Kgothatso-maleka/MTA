---
title: Lightning Web Components
examSection: user-interface
objectives:
  - 'Describe the files in a Lightning web component and how they fit together'
  - 'Write templates with conditional and list rendering and bind data to the template'
  - 'Use public properties with @api and understand reactivity'
  - 'Explain the component lifecycle hooks and when each runs'
  - 'Expose a component to App Builder with the meta file and target pages'
  - 'Compare LWC with Aura and when each is used'
youtubeId: null
estMinutes: 55
prerequisites: []
---
## Start here: building blocks for pages

A **Lightning web component (LWC)** is a reusable piece of a page, such as a card showing an installation's status. LWC uses **standard web technologies**: HTML, modern JavaScript and CSS, so it is faster and easier to learn than the older Aura framework.

:::key-terms
- **Template**: the HTML of the component.
- **Decorator**: a JavaScript marker such as `@api`, `@wire`, `@track`.
- **Public property**: a value a parent can set, marked `@api`.
- **Shadow DOM**: keeps each component's HTML and CSS separate from others.
:::

## The files

A component named `installationCard` lives in a folder with the same name:

| File | Purpose |
|---|---|
| `installationCard.html` | Template |
| `installationCard.js` | Logic (class extending `LightningElement`) |
| `installationCard.css` | Styles (optional) |
| `installationCard.js-meta.xml` | Where the component can be used |

- Folder and file names use **camelCase**. In markup, you write it **kebab-case with the namespace**: `<c-installation-card>`.

## A small component

```html
<template>
  <lightning-card title="Installation">
    <template lwc:if={isLate}>
      <p class="slds-text-color_error">This job is late.</p>
    </template>
    <ul>
      <template for:each={steps} for:item="step">
        <li key={step.id}>{step.name}</li>
      </template>
    </ul>
  </lightning-card>
</template>
```

```javascript
import { LightningElement, api } from 'lwc';
export default class InstallationCard extends LightningElement {
  @api recordId;
  steps = [{ id: '1', name: 'Survey' }, { id: '2', name: 'Install' }];
  get isLate() { return this.daysLate > 0; }
  daysLate = 2;
}
```

- `{value}` binds a property or getter to the template. No JavaScript expressions go inside the braces.
- **`lwc:if`, `lwc:elseif`, `lwc:else`** show or hide content. (Older code uses `if:true` and `if:false`.)
- **`for:each`** needs a unique **`key`** on the first element inside.
- Use a **getter** for computed values.

:::exam-trap
Inside `{}` you can use a **property or getter only**, not an expression such as `{count + 1}`. Create a getter instead.
:::

## Properties and reactivity

- **`@api`** makes a property **public**. A parent sets it, and the child should **not change it**.
- Class fields are **reactive**: when the field value changes, the template re-renders. (You rarely need `@track`; it is only needed to watch changes **inside** objects or arrays by mutation in older code.)
- To update a list, **replace** it with a new array or use the spread operator.

## Lifecycle hooks

| Hook | Runs when |
|---|---|
| `constructor()` | Component is created. Call `super()` first. Do not read public properties |
| `connectedCallback()` | Component is added to the DOM. Good for starting data work |
| `renderedCallback()` | After every render. Careful: can run many times |
| `disconnectedCallback()` | Removed from the DOM. Clean up listeners |
| `errorCallback(error, stack)` | A child throws an error |

## Exposing the component

```xml
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
  <apiVersion>62.0</apiVersion>
  <isExposed>true</isExposed>
  <targets>
    <target>lightning__RecordPage</target>
    <target>lightning__AppPage</target>
    <target>lightning__HomePage</target>
  </targets>
</LightningComponentBundle>
```

- `isExposed` makes it show in **Lightning App Builder**.
- Targets include `lightning__RecordPage`, `lightning__AppPage`, `lightning__HomePage`, `lightning__FlowScreen`, `lightningCommunity__Page`.
- Add `<targetConfigs>` to give App Builder properties an admin can set.

## Use base components

Use Salesforce's **base components** (`lightning-button`, `lightning-input`, `lightning-datatable`, `lightning-card`) before building your own. They follow the Lightning Design System and handle accessibility.

## LWC or Aura?

- **LWC** is the recommended model for new development.
- **Aura** still exists. Aura components can contain LWC, but **LWC cannot contain Aura** components.

:::on-the-job
Keep components small and single-purpose. A parent that coordinates and children that display are easier to test and reuse than one giant component.
:::

## Recap

- Four files: html, js, css, meta xml. Names in camelCase, markup in kebab-case.
- Bind properties and getters with `{}`. `lwc:if` and `for:each` with `key`.
- `@api` for public properties. Lifecycle: constructor, connectedCallback, renderedCallback, disconnectedCallback, errorCallback.
- Expose with `isExposed` and targets.
