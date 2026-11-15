---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every keystroke.

## Scenario

Khanyisa Solar wants every new Installation to get a default planned date, and every Completed installation to create an Invoice record.

## What to build

1. Create a trigger `InstallationTrigger` that calls `InstallationHandler`.
2. In a **before insert** handler method, set `Planned_Date__c` to 14 days from today when empty.
3. In an **after update** method, create an `Invoice__c` for installations whose Status changed to `Completed`. Use `Trigger.oldMap` to detect the change.
4. Use `addError` to block marking Complete when `Technician__c` is empty.
5. Load 200 installations with Data Loader or Execute Anonymous to prove the trigger handles bulk.
6. Turn on a debug log and find the order: flow, before trigger, validation, after trigger.

## What you should see when you are done

- [ ] Empty planned dates are filled.
- [ ] One invoice is created per completed installation, no duplicates.
- [ ] The error appears when no technician is set.
- [ ] 200 records save without a limit error.

## Check your understanding

- [ ] Why use a before trigger to change fields on the same record?
- [ ] Which context variable is missing on insert?
- [ ] What stops a trigger from running endlessly?

## Stretch goal

Add a static Boolean guard and show that a recursive update no longer fires twice.
