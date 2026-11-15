---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every click.

## Scenario

Khanyisa Solar has three groups of staff: **Sales Reps** who create installation jobs, **Installation Managers** who manage jobs and see their team's work, and **Finance** who must see the system size but never the customer discount. Management is worried that too many people can see everything.

## Your goal

Build least-privilege access for Installations using a permission set group and the sharing model.

## Before you start

- A Developer Edition org or Trailhead Playground.
- The Installation object from the previous exercise (or any custom object you can use).
- At least three test users (create them with fake email addresses you control).

## What to build

1. Set the **organization-wide default** for Installation to **Private** (the next module covers sharing in depth).
2. Create a permission set **Installation Editor** (Read, Create, Edit on Installation) and **Installation Viewer** (Read only).
3. Create a permission set group **Sales Rep Access** that includes Installation Editor, and a separate permission set that grants only the Discount field.
4. Use a **Minimum Access – Salesforce** base profile for a test user and add the right permission sets.
5. Create a queue **Unassigned Installations** if your object supports it, and add two users.

## What you should see when you are done

- A Sales Rep with Read access and a Private OWD sees only installations they own.
- A user without the Discount permission cannot see the Discount field on the page **or in a report**.
- **Log in as** each test user and confirm the experience matches.

## Self-check

- [ ] Can I explain why the sharing rule did not need a profile?
- [ ] Which setting stopped the Finance user from seeing Discount, and why is a page layout change not enough?
- [ ] If a Sales Rep needs Delete on Installation, which other permissions are required?
- [ ] Which gate (object, field or record) blocked each "can't see it" test case?

## Stretch goal

Mute one permission inside your permission set group and prove the underlying permission set is unchanged for another user who holds it directly.
