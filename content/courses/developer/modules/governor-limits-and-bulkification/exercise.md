---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every keystroke.

## Scenario

A trigger on Contact updates the parent Account's description. It works in the UI but crashes when 200 contacts are loaded.

## What to build

1. Write the **bad** trigger with a query and update inside the loop.
2. Insert 200 contacts from Execute Anonymous and read the **limit error**.
3. Rewrite it with a **Set of Ids**, one **Map** query and one **update**.
4. Run the 200-record test again and confirm success.
5. Print `Limits.getQueries()` and `Limits.getDmlStatements()` before and after.
6. Find the **Cumulative Limits** section in the debug log.

## What you should see when you are done

- [ ] The bad version fails with too many SOQL queries.
- [ ] The good version uses 1 query and 1 DML.
- [ ] You can name three limits and their values.

## Check your understanding

- [ ] Why are limits shared across triggers and flows in one transaction?
- [ ] What structure gives fast lookups by Id?
- [ ] Can you catch a limit exception?

## Stretch goal

Add a SOQL for loop to handle a query that returns 40,000 records without a heap error.
