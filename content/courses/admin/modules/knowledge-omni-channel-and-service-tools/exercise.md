---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every click.

## Scenario

Khanyisa Solar wants customers to find inverter answers on the help site, agents to attach approved articles, and urgent chats to reach an available technician.

## Your goal

Set up Knowledge and basic Omni-Channel routing.

## Before you start

- A Developer Edition org or Trailhead Playground.
- Two test users, one with the Knowledge User licence.

## What to build

1. Turn on **Lightning Knowledge**, create record types for How-to and Troubleshooting, and set up **data categories** (Product > Inverters).
2. Create three articles, publish two and keep one as a draft.
3. Set **channels** so one article is internal only and one is visible to customers.
4. Attach an article to a case and send it to the customer.
5. Enable **Omni-Channel**: a service channel for Cases, a **routing configuration** with capacity 3, a queue, and a presence status "Available for Cases".
6. Add the Omni-Channel **utility** to the console and test accepting a case.
7. Build a **report** of cases by origin and by article used.

## What you should see when you are done

- [ ] An internal article does not appear to customers.
- [ ] A case routed to the queue pops up for the available agent.
- [ ] The report shows article usage.

## Check your understanding

- [ ] What do data categories control, and what do channels control?
- [ ] What four things make Omni-Channel route work to an agent?
- [ ] What happens when you edit a published article?

## Stretch goal

Add skills-based routing so only agents with the "Inverter" skill receive inverter cases.
