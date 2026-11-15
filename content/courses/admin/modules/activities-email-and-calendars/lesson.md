---
title: Activities, Email and Calendars
examSection: productivity-collab
objectives:
  - 'Tell tasks from events and use them correctly, including recurring and multi-day events'
  - 'Explain the Name and Related To fields on an activity'
  - 'Use the Activity Timeline, Log a Call, and shared activities'
  - 'Connect email and calendar with the Outlook and Gmail integrations and Einstein Activity Capture'
  - 'Create email templates and send email from Salesforce'
  - 'Set up public calendars and calendar sharing'
youtubeId: null
estMinutes: 35
prerequisites: []
---
## Start here: the sales diary

A Khanyisa Solar rep's week is full of promises: "Call Thabo on Tuesday", "Site visit on Thursday at 10:00", "Send the quote by Friday." If those live only in a rep's head, they are forgotten when the rep goes on leave, and the manager cannot see what the team has been doing.

**Activities** are Salesforce's diary. Every call, email, meeting and to-do is recorded against the **customer record**, so anyone can see the full history.

:::key-terms
- **Activity**: a task or an event.
- **Task**: something to do, with a due date, but not a fixed time (call, send a quote).
- **Event**: something at a fixed date and time (meeting, site visit). It shows on calendars.
- **Name (Who)**: the lead or contact the activity is about.
- **Related To (What)**: the record it relates to, such as an account, opportunity or case.
- **Activity Timeline**: the record page component that shows past and upcoming activities.
- **Log a Call**: record a call that already happened.
:::

## Tasks and events

| | **Task** | **Event** |
|---|---|---|
| Has a fixed time on a calendar | No (a due date only) | **Yes** (start and end) |
| Example | Send quote by Friday | Site visit Thursday 10:00 |
| Can recur | **Yes** | **Yes** |
| Has a status | **Yes** (Not started, Completed) | No |
| Multi-day | No | **Yes** (all-day, multi-day events) |

:::exam-trap
If the question says a meeting is booked at a specific time, it is an **event**. If it says "remind me to call by Friday", it is a **task**. Only events appear as time blocks on the calendar.
:::

### Name and Related To

- **Name** (Who) links to a **lead or contact** (or several).
- **Related To** (What) links to one **account, opportunity, case, campaign or custom object**.

An activity can relate to **both** at once: a call with the contact Thabo about the opportunity "Pretoria Rooftop".

### Shared activities and recurring activities

- With **Shared Activities** an event or task can include **several contacts** (up to 50 on an event), so it appears on each contact's timeline.
- **Recurring tasks and events** repeat on a pattern, such as every Monday. You can edit one occurrence or the whole series.
- **Multi-day events** span several days, for example a three-day conference.

## Seeing and managing activities

- **Activity Timeline**: on records shows **upcoming and overdue** items and **past activity**, including emails and logged calls.
- **Activities related list**: the classic list of open and past activities.
- **My Tasks list** and **calendar** views for the user.
- **Log a Call** and **New Task** are quick actions on records.
- **Task list views**, such as today's tasks and overdue, help reps work through them.
- **Public calendars** let a team share a calendar (for example "Site Visits"), and **calendar sharing** lets users see one another's calendars (free/busy or full details).

## Email and calendar integrations

Reps live in their inbox, so Salesforce connects to it:

- **Outlook and Gmail integrations**: a side panel in the email client shows Salesforce records for the people on the email and lets reps log emails and create records.
- **Einstein Activity Capture**: automatically syncs **emails and events** between the user's email and calendar and Salesforce so reps do not log them by hand. Admins decide which users get it and what syncs.
- **Lightning Sync / Salesforce for Outlook** are older tools. New orgs use the integrations above.
- **Email in Salesforce**: reps can send an email from a record with **templates** and the **email composer**, and replies attach to the record.

## Email templates

**Lightning email templates** hold standard text with **merge fields** (such as the contact's first name). Store them in **folders** and share the folders with the right users. A **letterhead** adds branding. Templates can also be used by email alerts and automation.

:::exam-trap
**Merge fields** fill in data **from a record** when the email is sent. If a template shows a blank name, the field on the record is empty or the user lacks access to it, so do not assume the template is broken.
:::

## Keeping calendars and activities healthy

- Make **activity logging** easy: quick actions, email integration and Einstein Activity Capture beat training reminders.
- Use **list views** and **dashboards** for overdue tasks.
- Decide the **activity retention** policy. Old activity data uses storage.

:::on-the-job
Do not ask reps to log everything. Ask what **managers will actually look at** (for example last contact date on key deals), and automate that. Reps log what helps them sell, not what helps you report.
:::

## Recap

- Tasks have a due date, events have a start and end time. Both can recur. Only events are time blocks.
- Name (Who) is a lead or contact. Related To (What) is an account, opportunity, case or similar.
- Shared activities allow several contacts on one activity. Multi-day events span several days.
- Outlook and Gmail integrations and Einstein Activity Capture connect email and calendars.
- Email templates use merge fields and are shared through folders.
