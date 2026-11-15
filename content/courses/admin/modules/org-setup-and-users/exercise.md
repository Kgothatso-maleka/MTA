---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every click.

## Scenario

Khanyisa Solar is opening a Durban branch. It operates in South African rand and exports to Namibia. Support is open 08:00 to 17:00 on weekdays and has public holidays off. Three new staff start on Monday, and one old user has just resigned.

## Your goal

Set up the org basics and onboard and offboard users the safe way.

## Before you start

- A Developer Edition org or Trailhead Playground.
- Fake email addresses you control.

## What to build

1. In **Company Information**, set the language, locale, time zone and currency for South Africa.
2. Set a **fiscal year** starting in March.
3. Create **Business Hours** (weekdays 08:00 to 17:00, South Africa time zone) and a **Holiday** for Human Rights Day. Attach the holiday to the hours.
4. Create three users with a Salesforce licence, a profile and a role. Give one a different time zone through the user's own settings.
5. **Freeze** one user and try to log in as them. Then **unfreeze** and **deactivate** them. Compare what happens to the licence count.
6. Open the **Setup Audit Trail** and find your changes from steps 1 to 4.
7. Open **Login History** and find your own logins.

## What you should see when you are done

- [ ] The org's currency, locale and fiscal year are correct.
- [ ] A business hours record with a holiday exists.
- [ ] Freezing blocked the login but the licence count did not change. Deactivating freed a licence.
- [ ] The audit trail shows who changed what.

## Check your understanding

- [ ] Why can you not delete a user, and what do you do instead?
- [ ] Which setting could you never switch back off after enabling it?
- [ ] Which sandbox type would you use for user acceptance testing with realistic data?

## Stretch goal

Create a delegated administrator group that can unlock users and reset passwords only for the Sales Rep role.
