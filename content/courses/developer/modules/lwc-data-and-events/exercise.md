---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself.** The video shows every step.

## Scenario

A dispatcher page lists late installations. Clicking one shows its details and lets the dispatcher mark it done.

## What to build

1. Write `InstallationController.getLate()` with `@AuraEnabled(cacheable=true)` and `markDone(Id)` without cacheable.
2. Create LWC `lateList` that uses `@wire(getLate)` and shows a `lightning-datatable`.
3. When a row is chosen, fire a `CustomEvent` called `select` with the Id in `detail`.
4. Create LWC `installationDetail` that uses `getRecord` and a `lightning-record-form`.
5. Create a parent `dispatcher` that handles `onselect` and passes the Id into `installationDetail`.
6. Add a button that calls `markDone` imperatively, then calls `refreshApex` and shows a toast.
7. Write one Jest test for `lateList`.

## What you should see when you are done

- [ ] The table lists late installations.
- [ ] Choosing a row shows its details.
- [ ] Marking done refreshes the list and shows a toast.

## Check your understanding

- [ ] Why can `markDone` not be wired?
- [ ] How does a parent give data to a child?
- [ ] What does `'$recordId'` do?

## Stretch goal

Replace the parent-child event with a Lightning Message Service channel.
