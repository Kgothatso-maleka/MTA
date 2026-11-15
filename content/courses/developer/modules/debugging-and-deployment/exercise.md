---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself.** The video shows every step.

## Scenario

A trigger works in the sandbox but fails in production for one user. You must find the cause and ship the fix safely.

## What to build

1. Set a **trace flag** for a test user with `Apex Code` at `FINE`.
2. Run an action as that user and read the **debug log** for the error and the limit summary.
3. Add `System.debug` lines and find them with the `USER_DEBUG` filter.
4. Install the Salesforce CLI, authorise a sandbox and run `sf project deploy start` with only your changed class and test.
5. Run a **validation-only** deploy to the production org and note the test results.
6. Create a **change set** with a custom field and class and compare it with the CLI approach.
7. Write a deployment checklist with manual steps and rollback.

## What you should see when you are done

- [ ] You found the failing line in the log.
- [ ] The validation reports tests passed and the coverage percentage.
- [ ] You can name two advantages of the CLI over change sets.

## Check your understanding

- [ ] Which sandbox types copy data?
- [ ] What is a quick deploy?
- [ ] Can a change set delete a component?

## Stretch goal

Create a scratch org from a project definition file and push your source to it.
