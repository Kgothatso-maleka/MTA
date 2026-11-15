---
youtubeId: null
---
**Watch the walkthrough above, then do the exercise yourself in your own org.** The video shows every click and keystroke.

## Scenario

Khanyisa Solar needs a helper class that prices installations: add VAT, apply a discount, and refuse bad input.

## Before you start

- A Developer Edition org, and the Developer Console open (**gear icon > Developer Console**).

## What to build

1. Create class `PriceCalculator` with a `public static Decimal addVat(Decimal amount)` that uses a `private static final Decimal VAT = 0.15`.
2. Add `applyDiscount(Decimal amount, Decimal percent)` that throws a custom `PriceException` when percent is below 0 or above 100.
3. Add `totalFor(List<Decimal> amounts)` that returns the sum, skipping null values.
4. Create `Map<String, Decimal>` of three product names to prices and loop through it.
5. Open **Debug > Open Execute Anonymous Window** and run your methods. Use `System.debug`.
6. Open the debug log and find your output (filter by `USER_DEBUG`).

## What you should see when you are done

- [ ] `addVat(100)` prints 115.
- [ ] A discount of 150 throws your `PriceException`.
- [ ] A null in the list does not cause a `NullPointerException`.
- [ ] You can find your debug lines in the log.

## Check your understanding

- [ ] What is the difference between a List and a Set?
- [ ] Why can you not catch a limit exception?
- [ ] What must a parent method have so a child can override it?

## Stretch goal

Create an interface `Priceable` with `Decimal price()` and two classes that implement it.
