---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every click.

## Scenario

Khanyisa Solar tracks Installations, Technicians and the jobs they work on. Technicians may only see their own jobs.

## What to build

1. Create custom object **Installation** and **Job** with a **master-detail** from Job to Installation.
2. Create **Technician__c** and a **junction object** `Job_Technician__c` for a many-to-many with Job.
3. Add a **roll-up summary** on Installation counting Jobs.
4. Create a **custom metadata type** `Pricing_Config__mdt` with a `Rate__c` and one record.
5. Write `JobService` (`with sharing`) that queries Jobs using `WITH USER_MODE`.
6. Log in as a user whose profile has no access to a field, and compare results with and without user mode.

## What you should see when you are done

- [ ] Deleting an Installation deletes its Jobs.
- [ ] The roll-up summary updates.
- [ ] The user-mode query respects the missing field permission.

## Check your understanding

- [ ] Which relationship inherits owner and sharing?
- [ ] Does `with sharing` enforce field-level security?
- [ ] Where would you store a threshold that must deploy with the org?

## Stretch goal

Use `Security.stripInaccessible` on a list of records before returning them to a Lightning component.
