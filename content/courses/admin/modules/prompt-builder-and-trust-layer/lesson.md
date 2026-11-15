---
title: Prompt Builder, the Einstein Trust Layer and Data for AI
examSection: agentforce-ai
objectives:
  - 'Build and use prompt templates in Prompt Builder, including the main template types'
  - 'Explain grounding with merge fields, flows and data, and why it matters'
  - 'Describe the Einstein Trust Layer: secure retrieval, masking, zero data retention, toxicity detection and audit'
  - 'Control which AI models and features are available in the org'
  - 'Explain why data quality, permissions and testing decide how good AI results are'
  - 'Use AI responsibly: human review, transparency and testing for bias'
youtubeId: null
estMinutes: 40
prerequisites: []
---
## Start here: a good brief gets a good draft

If you ask a new employee to "write something to the customer", you will get something generic. If you say "write a friendly, two-paragraph email to Thabo Nkosi, whose inverter fault ticket has been open for three days, mention the technician visit on Thursday", you get something useful.

A **prompt** is that brief for an AI. **Prompt Builder** is where an admin writes reusable, grounded prompts. The **Einstein Trust Layer** is the safety system that protects your data while the AI works.

:::key-terms
- **Prompt**: the instruction you give a language model.
- **Prompt template**: a saved, reusable prompt with placeholders that Salesforce fills with data.
- **Prompt Builder**: the Setup tool for creating, testing and managing prompt templates.
- **Grounding**: adding real data to the prompt so the answer is based on facts.
- **Merge field**: a placeholder, such as the contact's name, filled with record data.
- **Einstein Trust Layer**: security and privacy controls around every call to a language model.
- **Zero data retention**: the model provider does not store your prompts or responses or use them to train models.
:::

## Prompt Builder

### Template types

| Type | Used to |
|---|---|
| **Sales email** | Draft an email to a contact or lead |
| **Field generation** | Fill a field with generated text, such as a summary on a record |
| **Record summary** | Summarise a record for a person |
| **Flex** | A general template with several inputs you define |

### Writing a prompt template

1. Choose the **template type** and the **object** it relates to.
2. Write the **instructions**: role, task, tone, length, what to avoid.
3. **Ground** the prompt with **merge fields** from the record and its related records (for example Account Name, latest case status).
4. You can also ground with **data from a flow, Apex or Data Cloud** when the data is not on the record.
5. **Preview** against real records. Check the **resolved prompt** to see what data was inserted.
6. **Activate** a version. Then use it in a page, a flow, an agent action or an email.

Good prompts are **specific**, give **examples** of the format, and say **what not to do** ("do not promise a refund").

:::exam-trap
Grounding means supplying **company data** in the prompt. It does **not** retrain the model. If the answer is wrong because the data is missing, add or fix the **grounding**. If the data is wrong, fix the **data**.
:::

### Who can use and build prompts

Users need **permission** to build or run prompt templates (for example through the Prompt Template Manager permission set). Merge field data is retrieved **with the running user's access**, so a user never sees data in an output that they could not see on the record.

## The Einstein Trust Layer

When a prompt goes to a language model, the Trust Layer sits in the middle:

1. **Secure data retrieval and dynamic grounding**: data is fetched with the user's permissions and inserted into the prompt.
2. **Data masking**: sensitive values, such as names or phone numbers, can be **replaced with placeholders** before leaving Salesforce, and put back in the response (**unmasking**).
3. **Prompt defense**: guardrails in the prompt that reduce prompt injection and unwanted behaviour.
4. **Secure gateway** to the model provider with **zero data retention**: the provider does not keep or train on your data.
5. **Toxicity detection**: scans responses for harmful content.
6. **Audit trail and feedback**: records the prompt, response and user feedback for review. You can turn on **audit and feedback data** in Setup.

The Trust Layer is **built into Agentforce on the Salesforce Platform**, not a separately purchased add-on.

:::exam-trap
Do not mix these up. **Masking** hides sensitive values before they go to the model. **Zero data retention** means the model provider does not store the data. **Audit trail** is Salesforce's own record of what was sent and returned. **Toxicity detection** looks at what comes back.
:::

### Controlling models and features

Admins can decide **which AI features are turned on**, who can use them through **permission sets**, and, where the controls exist, **which models may be used** in the org. Review the current Setup options each release, because AI settings change quickly. The Trust Layer's protections apply to the supported models you use.

## Data decides the quality of AI

AI is only as good as the data it can see:

- **Duplicates and missing values** make summaries and agent answers wrong.
- **Too many permissions** let the AI expose data it should not.
- **Out-of-date knowledge articles** make an agent give outdated advice.

That is why **Data and Analytics** has the largest weight on the exam: clean, governed data is the foundation for automation and AI.

Good habits:

- Clean and de-duplicate the data the AI relies on.
- Use field-level security and sharing so only the right data is available.
- Keep Knowledge articles current, with owners.
- **Test** with real examples before release and **sample** outputs after.

## Using AI responsibly

- Keep a **human in the loop** for anything that could harm a customer or has legal weight.
- Be **transparent**: tell customers when they are talking to an AI.
- **Test for bias** and unfair outcomes, and review how the AI behaves for different groups.
- Do not use AI for decisions that need **exact, auditable rules**. Use approvals, validation rules and flows.
- Follow the law: in South Africa, **POPIA** limits how personal information may be processed, so check consent and purpose before pointing AI at customer data.

:::on-the-job
Before you launch any AI feature, run a **dry run with 30 real, old examples** and have two people from the business mark each answer as Good, Needs edit or Unsafe. If more than a handful are unsafe, fix grounding and permissions before you let customers near it.
:::

## Recap

- Prompt Builder: template types (sales email, field generation, record summary, flex), merge fields, grounding, preview, activate.
- Grounding = real data in the prompt. It does not retrain a model.
- Trust Layer: secure retrieval, masking and unmasking, prompt defense, zero data retention, toxicity detection, audit trail.
- Data quality, permissions and testing decide how good and safe the AI is.
- Keep a human in the loop and use rules for decisions that must never vary.
