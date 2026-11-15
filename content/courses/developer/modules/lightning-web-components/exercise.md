---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself.** The video shows every step.

## Scenario

Khanyisa Solar wants a card on the Installation record page showing the status, planned date and a warning when the job is late.

## Before you start

- Visual Studio Code with the Salesforce extensions, the Salesforce CLI (`sf`), and a Developer Edition org authorised.

## What to build

1. Run **SFDX: Create Lightning Web Component** named `installationCard`.
2. Add `@api recordId` and a getter `isLate`.
3. Render a `lightning-card` with `lwc:if` to show a warning.
4. Add a list of steps using `for:each` and a `key`.
5. Set `isExposed` and `lightning__RecordPage` in the meta file.
6. Deploy it and drag it onto the Installation record page in **Lightning App Builder**.
7. Add a `console.log` in `connectedCallback` and read it in the browser console.

## What you should see when you are done

- [ ] The card appears on the record page.
- [ ] The warning shows only when the job is late.
- [ ] Each list item has a key and no console warning.

## Check your understanding

- [ ] Which file decides where a component can be placed?
- [ ] Can you put an expression inside `{}`?
- [ ] Can an LWC contain an Aura component?

## Stretch goal

Add a `targetConfig` property so an admin can set the "late after days" number in App Builder.
