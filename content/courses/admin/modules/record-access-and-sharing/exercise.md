---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every click.

## Scenario

Khanyisa Solar's Installation records must be visible to the owner and managers only, plus the Commercial Team for commercial jobs. A temporary contractor needs to see one job.

## Before you start

- A Developer Edition org or Trailhead Playground.
- The Installation object from the earlier exercise.
- Three test users with fake emails you control.

## What to build

1. Set the **OWD** for Installation to **Private**.
2. Create roles **Installation Manager** above **Sales Rep**. Make sure Grant Access Using Hierarchies is on for Installation.
3. Assign the test users: one manager, two sales reps.
4. Create a public group **Commercial Team** and a **criteria-based sharing rule** that shares installations where Type = Commercial with the group, as Read Only.
5. Use **manual sharing** to give the contractor Read access to one installation.
6. Change the owner of that installation and check whether the manual share is still there.
7. Use **Log in as** for each user and record what each one sees.

## What you should see when you are done

- [ ] A sales rep sees only their own installations.
- [ ] The manager also sees the sales reps' installations.
- [ ] Commercial Team members see commercial installations they do not own.
- [ ] The manual share disappears after the owner changes.
- [ ] You can explain why no profile was used in the sharing rule.

## Check your understanding

- [ ] Which OWD lets everyone see but only the owner edit?
- [ ] Can a sharing rule give less access than the OWD?
- [ ] Which tool opens one record to one person, and what is its weakness?

## Stretch goal

Switch the OWD to Public Read Only and note which of your sharing steps became unnecessary.
