---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every click.

## Scenario

Khanyisa Solar's service team wants an AI-written summary of every long case, and sales wants a draft follow-up email after a site visit. The security officer asks how customer data is protected and how you will prove what was sent.

## Your goal

Build two prompt templates and explain the Trust Layer controls.

## Before you start

- A Developer Edition or Trailhead org with Prompt Builder enabled.
- A few test cases with long descriptions and comments, and a test contact and opportunity.

## What to build

1. A **record summary** or **field generation** template on Case that summarises the case in three bullets, grounded with the case description, status and latest comments.
2. A **sales email** template on Contact that drafts a follow-up after a site visit, grounded with the contact's name, the opportunity and the next step.
3. Add **instructions** with tone, length and a "do not promise discounts" rule.
4. **Preview** with three real records and read the **resolved prompt**.
5. **Activate** the templates and place them on a page or in a flow.
6. Turn on **audit and feedback data** (if available) and find an example record.
7. Write a one-page **explanation for the security officer** covering secure retrieval, masking, zero data retention, toxicity detection and audit.
8. List **three data-quality fixes** you would make before rolling out.

## What you should see when you are done

- [ ] The summary uses the case's own data.
- [ ] A user without access to a field does not see it in the output.
- [ ] The security note correctly names the Trust Layer steps.
- [ ] The data-quality list ties to duplicates, missing fields and permissions.

## Check your understanding

- [ ] What is the difference between grounding and retraining?
- [ ] Which Trust Layer feature hides sensitive values before they leave Salesforce?
- [ ] Why should a compliance decision not be left to an agent?

## Stretch goal

Build a flow that calls your prompt template and writes the summary to a case field when the case closes.
