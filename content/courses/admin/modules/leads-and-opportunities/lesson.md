---
title: Leads, Accounts, Opportunities and Products
examSection: sales-marketing
objectives:
  - 'Explain the sales journey from lead to opportunity and the role of accounts and contacts'
  - 'Convert a lead and explain what is created and what cannot be edited afterwards'
  - 'Configure a sales process, stages, probability and forecast categories'
  - 'Set up products, price books, quotes and contracts correctly'
  - 'Use Path, opportunity teams, forecasts and territories to help the sales team'
  - 'Capture leads automatically with web-to-lead, assignment rules and queues'
youtubeId: null
estMinutes: 45
prerequisites: []
---
## Start here: from stranger to customer

A woman in Pretoria fills in a form on Khanyisa Solar's website: "I want solar panels." That is a **lead**: someone who might buy. A salesperson calls her, finds she has a real budget and a roof, and decides it is worth a proper quote. That moment is **lead conversion**. Salesforce creates a customer **account**, a **contact** for her, and an **opportunity** for the deal.

The sales team works the opportunity through stages until it is **Closed Won** or **Closed Lost**. Reports and forecasts show managers what money is likely to arrive.

:::key-terms
- **Lead**: an unqualified prospect. A person, with a company name.
- **Account**: a company (or, with person accounts, an individual) you do business with.
- **Contact**: a person who works at or is linked to an account.
- **Opportunity**: a potential sale, with an amount, stage and close date.
- **Sales process**: the list of stages an opportunity moves through.
- **Product**: something you sell. **Price book**: a list of products with prices.
- **Quote**: a formal price offer to a customer, built from opportunity products.
:::

## Leads

### Capturing leads

- **Manual entry** by a rep.
- **Import** with the Data Import Wizard.
- **Web-to-Lead**: an HTML form on your website that creates leads in Salesforce. It can capture up to **500 leads per day**. After that, you need a different method.
- **Marketing tools** such as Account Engagement or integrations.

### Routing leads

- **Lead assignment rules** decide the owner. Only **one** can be active. Leads can go to a user or a **queue**.
- **Queues** hold records for a team to pick up. A queue is not a user: records in a queue can be claimed by its members.
- **Auto-response rules** can email the person who submitted the form.

### Lead conversion

When you **convert** a lead, Salesforce:

- Creates (or links to) an **account**.
- Creates (or links to) a **contact**.
- Optionally creates an **opportunity**.
- Marks the lead as **Converted**.

You can choose to attach the lead's existing activities to the new contact.

:::exam-trap
**Converted leads cannot be edited** and cannot be converted again. Also: **lead fields do not map to account, contact and opportunity automatically unless you set up the mapping.** Custom lead fields need **lead field mapping** (Setup > Object Manager > Lead > Fields & Relationships > Map Lead Fields) so their values land in the right place.
:::

You also set which **Lead Status** value means "Converted".

## Accounts and contacts

- An **account** holds company details. Accounts can have a **parent account** (hierarchy), such as a head office and branches.
- **Contacts** belong to an account. **Contacts to Multiple Accounts** lets one person be related to several accounts, for example a consultant who works with many customers.
- **Account teams** and **opportunity teams** share the work of a deal among several people with roles.
- **Person accounts** treat an individual as an account for B2C business. Once enabled, they **cannot be turned off**.

## Opportunities and the sales process

An opportunity has: **name, account, amount, close date, stage**. Each **stage** has:

- A **probability** (for example Prospecting 10%, Closed Won 100%).
- A **forecast category** (Pipeline, Best Case, Commit, Closed, Omitted) that controls how it appears in the forecast.

A **sales process** is the list of stages used by a **record type**. Different products can use different processes. For example, a residential install might skip "Proposal". You assign sales processes to record types, and record types to profiles.

:::exam-trap
The set of **stage** values for an opportunity lives in a **sales process** (not directly in the record type). If the question asks how to give two business lines different stages, the answer is **two sales processes with two record types**.
:::

### Helping reps: Path and guidance

Add **Path** to opportunities so each stage shows **key fields** and **guidance for success**. This keeps data consistent and trains new reps.

## Products, price books, quotes and contracts

Selling products needs several pieces:

- **Products**: the things you sell, each with a code and description.
- **Price books**: lists of prices. Every org has a **standard price book**. You can create **custom price books** for different markets or customers.
- **Price book entries**: the price of one product in one price book.
- **Opportunity products** (line items): the products and quantities on a deal.
- **Quotes**: a formal offer with line items, generated as a PDF from a **template**. A quote can **sync** with the opportunity.
- **Contracts**: record the agreed terms and dates.

:::exam-trap
A product must have an entry in the **standard price book** before it can be added to a **custom** price book. The standard price book cannot be deleted.
:::

You can also add **revenue schedules** (spread revenue over periods) and **product families** to group products in reports.

## Forecasting and territories

- **Collaborative Forecasts**: managers and reps see rolled-up forecasts by forecast category, based on opportunities. Managers can adjust numbers.
- **Opportunity splits** share credit between several reps.
- **Territory management** (Enterprise Territory Management) gives access and reporting by sales territory such as region or industry, independent of the role hierarchy.

## Sales productivity

- **Home page** with key deals, assistant and goals.
- **Einstein features**: lead and opportunity scoring and insights predict which leads and deals are most likely to close.
- **Email integration** (Outlook and Gmail) logs emails and events against records.
- **Reports and dashboards** for the pipeline.

:::on-the-job
Reps ignore fields that do not help them. Before you add a required field to opportunities, ask "who uses this?" and whether Path guidance or a validation rule at a **specific stage** would do the same job with less friction.
:::

## Recap

- Lead → convert → account + contact + (optional) opportunity. Converted leads cannot be edited.
- Web-to-Lead: up to 500 leads a day. One active lead assignment rule. Queues hold leads for teams.
- Sales process = set of stages for a record type. Stage has probability and forecast category.
- Product must be in the standard price book before any custom price book.
- Quote = formal offer. Contract = agreed terms. Path guides stages.
- Person accounts cannot be turned off.
