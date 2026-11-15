---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every keystroke.

## Scenario

Khanyisa Solar must deactivate 10,000 old accounts at night and notify an external system.

## What to build

1. Write `AccountCleanupBatch` (`Database.Batchable<SObject>`, `Database.Stateful`) with a counter of processed records printed in `finish`.
2. Run it with `Database.executeBatch(new AccountCleanupBatch(), 200)`.
3. Write a `Schedulable` class that starts the batch and schedule it for 02:00 daily.
4. Write a `Queueable` class that calls an external endpoint (use a Named Credential) and chain a second job.
5. Write an `@future(callout=true)` method and note why you cannot pass sObjects.
6. Watch all jobs in **Setup > Apex Jobs**.

## What you should see when you are done

- [ ] The batch processes in chunks of 200.
- [ ] The schedule appears under Scheduled Jobs.
- [ ] The chained job starts after the first.

## Check your understanding

- [ ] Which three methods does a batch class need?
- [ ] Why must a future method take only primitives?
- [ ] How many batch jobs may run at once?

## Stretch goal

Replace the future method with a queueable and list two advantages.
