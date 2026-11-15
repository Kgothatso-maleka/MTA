---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every keystroke.

## Scenario

Khanyisa Solar needs a nightly clean-up: list accounts with their contacts, create follow-up tasks and report any failures.

## What to build

1. In Execute Anonymous, query Accounts with a **parent-to-child subquery** on Contacts.
2. Query Contacts with their **Account.Name** (child to parent).
3. Write an **aggregate query** that counts Opportunities by Stage.
4. Write a **SOSL** search for a name across Account and Contact.
5. Build a list of Tasks and insert them with `Database.insert(tasks, false)`. Print any failed rows.
6. Add an **external ID** field on Account and use `upsert` with it.
7. Try an `insert` inside a loop, then rewrite it to one DML on a list.

## What you should see when you are done

- [ ] Subquery results appear in the debug log.
- [ ] A deliberately bad record fails while the good ones are saved.
- [ ] The rewritten code uses one DML statement.

## Check your understanding

- [ ] How do you query child records from a parent?
- [ ] What does `allOrNone = false` change?
- [ ] Why is string concatenation in a query dangerous?

## Stretch goal

Write a dynamic SOQL method that uses a bind variable safely.
