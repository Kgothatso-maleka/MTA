---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every click.

## Scenario

Khanyisa Solar's finance team handles supplier banking details. The auditor wants evidence that only finance can see them, only from the office, and that changes are traceable. A salesperson also reports a login alert from an unfamiliar country.

## Your goal

Layer the controls and respond to the alert.

## Before you start

- A Developer Edition org or Trailhead Playground.
- Two test users: one Finance, one Sales.

## What to build

1. Create a **Finance** profile (clone a standard one). Set **login hours** (07:00 to 18:00) and **login IP ranges** to a range you control.
2. Create a custom field **Bank Account Note** on Account. Use field-level security so only Finance can see it.
3. Turn on **field history tracking** for the Bank Account Note and change it a few times.
4. Set a **password policy** (length, complexity, lockout) and a shorter **session timeout**.
5. Add a **trusted IP range** in Network Access and explain in one line how it differs from step 1.
6. Check **Login History** for a user, then **freeze** the user and unfreeze.
7. Write a five-line **incident checklist** for a suspected compromise.

## What you should see when you are done

- [ ] A Finance user cannot log in from outside the IP range or hours.
- [ ] A Sales user cannot see Bank Account Note at all, including in reports.
- [ ] The field history related list shows old and new values.
- [ ] You can explain which layer stopped each test.

## Check your understanding

- [ ] Which setting blocks a login: login IP range or trusted IP range?
- [ ] What would you turn on to see who exported a report?
- [ ] How long does the Setup Audit Trail keep changes?

## Stretch goal

Research which encryption option (classic or Shield) would be needed to encrypt the Bank Account Note and list two side effects you would plan for.
