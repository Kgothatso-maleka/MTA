---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every click.

## Scenario

Khanyisa Solar signed a deal with a housing developer. Sales gave you a spreadsheet of 40 prospects (companies and the people who work there). Two of the contacts have left the company, and one sales rep is going on leave and her accounts must be handed over.

## Your goal

Load, update, transfer and back up data safely, choosing the right tool at each step.

## Before you start

- A Developer Edition org or Trailhead Playground (never a production org).
- Data Loader installed, or the browser-based Data Import Wizard available.
- Two or three test users.

## What to build

1. Make a CSV with 40 accounts (name, industry, phone, city) and add a custom text field **Customer Number** marked as an **External ID** on Account.
2. Import the accounts with the **Data Import Wizard**. Include one duplicate row on purpose and see how matching handles it.
3. Make a second CSV of contacts that refer to accounts by **Customer Number**. Load them with **Data Loader** using **upsert** on the external ID relationship.
4. Export the accounts with Data Loader, change the industry on five rows, and **update** them using the exported record IDs.
5. Use **Mass Transfer Records** to move all of one test user's accounts to another user.
6. **Delete** two contacts, find them in the **Recycle Bin**, and restore one.
7. Run the **Data Export Service** (or an export of one object) and open the CSV.

## What you should see when you are done

- [ ] Accounts and contacts are in Salesforce and the contacts are linked to the right accounts.
- [ ] The error file from your first Data Loader run is understood, and any bad rows are fixed.
- [ ] The transferred accounts show the new owner.
- [ ] The restored contact is back and the other is gone from the bin after you empty it.

## Check your understanding

- [ ] Why could you not use the Import Wizard to delete the two contacts?
- [ ] What would have happened if you loaded the contacts before the accounts?
- [ ] Which tool would you use for 2 million records, and which for a one-off list of 300 leads?
- [ ] Why is an exported CSV not a full restore?

## Stretch goal

Hard-delete a test record with Data Loader (grant yourself the Bulk API Hard Delete permission in your own test org only) and prove it can no longer be found in the Recycle Bin.
