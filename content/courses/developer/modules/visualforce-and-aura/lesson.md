---
title: Visualforce and Aura Components
examSection: user-interface
objectives:
  - 'Describe Visualforce pages, standard controllers, controller extensions and custom controllers'
  - 'Use Visualforce expressions, standard components and actions'
  - 'Explain view state and how to reduce it'
  - 'Describe Aura components, controllers, helpers and events at a basic level'
  - 'Decide between LWC, Aura and Visualforce for a requirement'
  - 'Secure pages against cross-site scripting and record access problems'
youtubeId: null
estMinutes: 45
prerequisites: []
---
## Start here: older tools you will still meet

You will still find **Visualforce** and **Aura** in many orgs, and the exam still asks about them. You should be able to read them and know when to use them.

:::key-terms
- **Visualforce**: server-rendered pages written in a tag language and Apex.
- **Controller**: Apex that supplies data and actions to a Visualforce page.
- **Aura**: Salesforce's earlier component framework.
- **View state**: page data sent back and forth with a Visualforce form.
:::

## Visualforce pages

```html
<apex:page standardController="Account" extensions="AccountExt">
  <apex:form>
    <apex:pageBlock title="{!Account.Name}">
      <apex:pageBlockSection>
        <apex:inputField value="{!Account.Industry}"/>
      </apex:pageBlockSection>
      <apex:commandButton action="{!save}" value="Save"/>
    </apex:pageBlock>
  </apex:form>
</apex:page>
```

- Values and actions use **`{! }`** expressions.
- **Standard controller**: gives built-in `save`, `edit`, `delete`, and the record fields for one object. Respects the user's access.
- **Controller extension**: Apex that **adds** logic to a standard controller. Its constructor takes `ApexPages.StandardController`.
- **Custom controller**: all logic is yours. Runs in system mode unless you use `with sharing`.
- **Standard list controller**: for lists of records (`recordSetVar`).
- Use **`renderAs="pdf"`** on `apex:page` to make a PDF.

## View state

An `<apex:form>` stores page state in a hidden **view state** sent with each request. The limit is **170 KB**. Reduce it with **`transient`** variables, fewer fields, and smaller queries.

## Security

- Visualforce **escapes output** by default in most cases. Do not turn off escaping with `escape="false"` on user data. It creates **cross-site scripting (XSS)**.
- Use `with sharing`, and check field access in custom controllers.
- Use `{! }` merge fields rather than building HTML from user text.

## Aura components

Aura components are made of **bundle files**:

- `.cmp` markup, `Controller.js`, `Helper.js`, `.css`, `.design`, `.svg`.
- They use **component events** (child to parent) and **application events** (broadcast).
- Aura is the older model. **LWC can be used inside Aura**, but Aura cannot be used inside LWC.

## Which technology?

| Need | Use |
|---|---|
| New component for Lightning Experience | **LWC** |
| Wrap or extend an existing Aura app, or use a feature LWC lacks | Aura |
| PDF output, email templates, legacy or Classic pages | Visualforce |
| Page in Salesforce mobile or a Lightning page | LWC |

:::exam-trap
**Visualforce** pages run on the server and re-render the page. **LWC and Aura** run in the browser. Visualforce is the only one of the three that creates a PDF directly with `renderAs="pdf"`.
:::

:::on-the-job
Do not rewrite working Visualforce just because it is old. Rebuild in LWC only when you are changing it anyway or it causes a real problem such as slow view state.
:::

## Recap

- Visualforce: `{! }`, standard controller, extension, custom controller, view state limit 170 KB.
- Escape user output to avoid XSS. Use `with sharing`.
- Aura bundle: cmp, controller, helper. Component and application events.
- Choose LWC for new work.
