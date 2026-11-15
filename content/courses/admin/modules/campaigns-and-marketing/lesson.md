---
title: Campaigns and Marketing Tools
examSection: sales-marketing
objectives:
  - 'Set up a campaign, its hierarchy and its member statuses'
  - 'Add leads and contacts to campaigns and track responses'
  - 'Explain campaign influence and the standard ROI fields'
  - 'Describe how web-to-lead and lead scoring support marketing'
  - 'Describe at a high level what Marketing Cloud Account Engagement does'
  - 'Report on campaign results for a marketing manager'
youtubeId: null
estMinutes: 30
prerequisites: []
---
## Start here: the Saturday roadshow

Khanyisa Solar runs a roadshow at a shopping centre in Midrand: a stand, a form and a prize draw. Sixty people sign up. Marketing needs to know: who came, who showed interest, who became a customer, and was the roadshow worth the money?

A **campaign** is how Salesforce records a marketing effort and its results.

:::key-terms
- **Campaign**: a marketing effort such as an event, an email or an advert.
- **Campaign member**: a lead or contact connected to a campaign.
- **Member status**: how a member relates to the campaign (for example Sent, Responded).
- **Responded**: a member status flag that counts the person as a response.
- **Campaign hierarchy**: a parent campaign that groups several child campaigns and rolls up their results.
- **Campaign influence**: credits campaigns for the opportunities they helped create.
:::

## Setting up a campaign

A campaign has a **name, type** (Event, Email, Webinar...), **status** (Planned, In Progress, Completed), **start and end date**, and **ROI fields**:

- **Budgeted cost** and **actual cost**.
- **Expected revenue**.
- **Number sent**: how many messages or invitations went out.

Salesforce calculates fields such as **Total Leads, Converted Leads, Total Opportunities, Won Opportunities and Value**, and **Total Responses**. These help you work out ROI.

### Member statuses

Each campaign has its own set of **member statuses**. By default, a campaign type has **Sent** and **Responded**. You can add others, such as **Registered**, **Attended** and **Purchased**. Each status is flagged as **Responded** or not. A member who reaches a status flagged **Responded** counts in the response numbers.

### Campaign hierarchy

Put several campaigns under a **parent campaign** (for example "Spring Roadshows" containing five venue campaigns). Hierarchy statistics **roll up** the results.

## Adding people to a campaign

- From a **lead or contact record**: use "Add to Campaign".
- From a **list view or report**: select records and add them.
- **Import** members with the Data Import Wizard (campaign members are one of its supported objects).
- **Web-to-lead** or an integration can add members automatically.

A person can be a member of **many campaigns**. A lead and its converted contact keep their history.

:::exam-trap
Only **leads and contacts** (and person accounts) can be campaign members. An **account** or **opportunity** cannot be a campaign member.
:::

## Seeing whether it worked

- **Campaign Influence** links campaigns to opportunities so marketing can see which efforts contributed to revenue. **Customizable campaign influence** supports multiple attribution models.
- **Standard campaign reports**: campaigns with leads, with contacts, with opportunities and so on.
- **Dashboard**: pipeline by campaign source.

### Lead sources

Set a **Lead Source** on every lead (Web, Roadshow, Referral). Combine with campaigns to report on where growth really comes from.

## Marketing tools beyond Sales Cloud

- **Web-to-Lead**: captures leads from your website forms.
- **Lead scoring**: ranks leads by how likely they are to convert, from rules or AI.
- **Marketing Cloud Account Engagement** (formerly Pardot): a B2B marketing automation product. It scores and grades prospects, runs email programmes and nurture journeys, and syncs with Salesforce campaigns, leads and contacts. It is a **separate product** from the core Salesforce platform.
- **Marketing Cloud**: for large-scale, consumer-facing marketing across channels such as email, SMS and social.

:::on-the-job
Agree with marketing **before** the event on the member statuses ("Registered, Attended, Bought a quote"), because changing them afterwards breaks the reports. And always load the sign-up list within 24 hours, while the leads are warm.
:::

## Worked example: was the roadshow worth it?

Khanyisa Solar spent **R18,000** on the Midrand roadshow (actual cost). The numbers a month later:

| Measure | Value |
|---|---|
| People who signed up (campaign members) | 60 |
| Members with a **Responded** status (Attended or Registered) | 42 |
| Leads converted | 6 |
| Won opportunities from the campaign | R240,000 |

A simple way to judge it: **ROI = (revenue - cost) / cost**. Here (240,000 - 18,000) / 18,000 is about **12.3, or 1,233%**.

What you learn from the other numbers:

- **42 of 60 responded** (70%) tells you the event worked at getting attention.
- **6 of 60 converted** (10%) tells you what to improve in follow-up.
- If the 6 leads took 90 days to convert, set a **follow-up task** for the first week next time.

:::exam-trap
Campaign ROI uses **actual cost** and revenue from **won opportunities** linked to the campaign. A campaign with high responses and no won opportunities can still have a poor ROI.
:::

## Which tool for which marketing problem?

| Problem | Best fit |
|---|---|
| Record who attended an event and report on it | **Campaign** with member statuses |
| Capture website enquiries automatically | **Web-to-Lead** |
| Group many events under one season | **Campaign hierarchy** |
| Show which campaigns helped win an opportunity | **Campaign influence** |
| Rank leads so reps call the hottest first | **Lead scoring** |
| Run automated B2B nurture emails | **Account Engagement** |
| Send mass consumer email and SMS | **Marketing Cloud** |

## Common mistakes

- Using **Lead Source** only and no campaign. Lead Source records the **first** origin. A campaign records **each** touch.
- Forgetting to mark the **Responded** flag on a new status, so responses show as zero.
- Loading the attendee list weeks later, after leads have gone cold.
- Putting a **converted** lead's history only on the lead. The campaign history carries over to the contact.

## Recap

- A campaign tracks a marketing effort, its cost and its results. It can have a parent for roll-ups.
- Only leads, contacts and person accounts are campaign members.
- Member statuses are customisable and flagged as Responded or not.
- Campaign influence credits campaigns for opportunities.
- Account Engagement (formerly Pardot) is B2B marketing automation and Marketing Cloud serves large-scale consumer marketing. Both are separate products.
