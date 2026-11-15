---
youtubeId: null
---
**Watch the walkthrough above, then build this yourself in your own org.** The video shows every click. Pause it and follow along.

## Scenario

Khanyisa Solar installs rooftop systems for households and businesses. Management wants to track every installation job against a customer, record which installers worked on it, and make sure no job is marked Completed without a completion date.

## Your goal

Build the data model for Khanyisa Solar's installations.

## Before you start

- A free Salesforce Developer Edition org or a Trailhead Playground (never your employer's production org).
- You can log in and open Setup.

## What to build

1. A custom object **Installation** (API name `Installation__c`) with a text Name field.
2. Fields on Installation: **System Size (kW)** (number), **Status** (picklist: Planned, In Progress, Completed), **Completion Date** (date), **Customer Type** (picklist: Residential, Commercial).
3. A relationship that connects each Installation to its customer **Account**, set up so that you can roll up the total kW per account.
4. A roll-up summary on Account called **Total kW Installed** that sums System Size (kW).
5. A custom object **Installer** and a junction object **Installation Installer** that lets many installers work on many installations.
6. Two validation rules: system size must be greater than zero, and Completed needs a Completion Date.
7. Two record types on Installation, **Residential** and **Commercial**, each with its own page layout.

## What you should see when you are done

- Opening an Account shows a related list of Installations and the Total kW Installed value.
- Saving an Installation with a size of 0 shows your error message.
- Setting Status to Completed with no Completion Date shows the second error.
- Creating an Installation prompts you to pick a record type.
- On an Installation, the Installation Installers related list lets you add several installers.

## Self-check

- [ ] Which relationship type did I use between Installation and Account, and why does the roll-up depend on it?
- [ ] Does my junction object have exactly two master-detail relationships?
- [ ] Did I use `ISPICKVAL` for the Status check?
- [ ] Do my validation rules return TRUE only for bad data?
- [ ] Do both record types appear for my profile, and does each have a layout?

## Stretch goal

Add a lookup filter so the Installer field only lets users pick active installers. Then explain in one sentence why the layout-only Required setting would not protect a data import.
