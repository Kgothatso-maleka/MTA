---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself.** The video shows every step.

## Scenario

Finance wants a printable PDF quote for an Opportunity, built in Visualforce.

## What to build

1. Create page `QuotePdf` with `standardController="Opportunity"` and `renderAs="pdf"`.
2. Show the opportunity name, amount, account and line items using `apex:repeat`.
3. Add a controller extension `QuoteExt` that calculates VAT and exposes `{!vat}`.
4. Add a **custom button** on the Opportunity that opens the page.
5. Add an `apex:form` and note the view state size in the **Development Mode** footer.
6. Create a simple **Aura component** with one button and show a message.
7. Write a one-paragraph note on why new work should use LWC.

## What you should see when you are done

- [ ] The PDF shows the data and VAT.
- [ ] The button opens the page from the record.
- [ ] You can name the files in an Aura bundle.

## Check your understanding

- [ ] Which controller gives built-in save and edit?
- [ ] What is the view state limit?
- [ ] Why is `escape="false"` risky?

## Stretch goal

Reduce the page's view state with a `transient` variable and show the size before and after.
