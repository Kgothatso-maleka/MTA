---
title: Asynchronous Apex
examSection: process-logic
objectives:
  - 'Choose between @future, Queueable, Batch and Schedulable Apex'
  - 'Write each type with the correct signature and know its limits'
  - 'Chain queueable jobs and monitor jobs with the Apex Jobs page'
  - 'Explain why asynchronous Apex has higher limits'
  - 'Describe platform events as an asynchronous, event-based option'
youtubeId: null
estMinutes: 50
prerequisites: []
---
## Start here: leave it to run later

Some work is too big or too slow to do while a user waits: updating 2 million records, calling a slow external system, or running every night. **Asynchronous Apex** runs in the background with **higher limits**.

:::key-terms
- **Future method**: simple background method with primitive parameters.
- **Queueable**: a job class you add to the queue. Can use sObjects and be chained.
- **Batch Apex**: processes huge numbers of records in chunks.
- **Schedulable**: runs on a schedule.
:::

## Which one to use

| Need | Use |
|---|---|
| Quick callout or mixed-DML workaround | `@future` |
| Background work with objects, chaining, job Id | **Queueable** |
| Millions of records | **Batch** |
| Run at a set time | **Schedulable** |
| Decouple systems by messages | Platform events |

## @future

```apex
public class Notifier {
  @future(callout=true)
  public static void sendUpdate(Set<Id> installationIds) { ... }
}
```

- Must be **static void**.
- Parameters must be **primitives or collections of primitives** (pass Ids, not sObjects).
- Add `callout=true` for callouts.
- Cannot call a future from a future or batch. Up to **50 calls per transaction**.
- No job Id is returned, and order is not guaranteed.

## Queueable

```apex
public class RecalcJob implements Queueable {
  public void execute(QueueableContext ctx) { ... }
}
Id jobId = System.enqueueJob(new RecalcJob());
```

- Accepts **sObjects and custom types** as members.
- Returns a **job Id** you can monitor.
- Can **chain**: call `System.enqueueJob` from `execute` to start one more job.
- Up to **50 jobs** can be added per transaction, and **one** child job from a queueable.
- Add `Database.AllowsCallouts` to allow callouts.

## Batch Apex

```apex
public class CleanupBatch implements Database.Batchable<SObject> {
  public Database.QueryLocator start(Database.BatchableContext bc) {
    return Database.getQueryLocator('SELECT Id FROM Account WHERE Active__c = false');
  }
  public void execute(Database.BatchableContext bc, List<SObject> scope) { delete scope; }
  public void finish(Database.BatchableContext bc) { }
}
Database.executeBatch(new CleanupBatch(), 200);
```

- Three methods: **start**, **execute**, **finish**.
- `Database.QueryLocator` can handle up to **50 million records**.
- Default scope is **200** records per `execute`. You can set 1 to 2,000. Each `execute` has **fresh limits**.
- Use `Database.Stateful` to keep member variables across `execute` calls.
- Up to **5 batch jobs** run at once. Others wait in the **flex queue**, up to **100** jobs.

## Schedulable

```apex
public class NightlyJob implements Schedulable {
  public void execute(SchedulableContext sc) { Database.executeBatch(new CleanupBatch()); }
}
System.schedule('Nightly clean', '0 0 2 * * ?', new NightlyJob());
```

- The cron string sets time. You can also schedule from **Setup > Apex Classes > Schedule Apex**.
- Up to **100 scheduled jobs** at once.
- A scheduled class often starts a batch.

## Monitoring

**Setup > Apex Jobs** shows status of future, queueable and batch jobs. **Scheduled Jobs** shows schedules.

## Platform events

An event is **published** with `EventBus.publish(event)` and **handled by a trigger** on the event object (`after insert`) or by a flow or LWC. They are good for decoupled, near real-time messages.

:::exam-trap
Future methods take **primitives only** because the object could change before it runs. If you need to pass records or chain jobs, use **Queueable**.
:::

:::on-the-job
Prefer **Queueable** over `@future` for new code. Use batch only when the volume really needs it. For a nightly clean-up, schedule a small class that starts a batch.
:::

## Recap

- Future: static, void, primitives. Queueable: objects, chaining, job Id. Batch: start/execute/finish, huge data. Schedulable: cron.
- Async transactions have higher limits (for example 200 queries, 12 MB heap).
- Monitor in Apex Jobs. Platform events decouple systems.
