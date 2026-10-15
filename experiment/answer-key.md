# Answer key — planted issues

> **Spoiler file.** The agent under test must never see this. Run agents from a separate folder (see [protocol.md](protocol.md)), never from inside this repo.

20 issues are planted on purpose. They are spread across pages and across types: visual, accessibility, content, feedback, forms, async/failure and layout. Some are obvious, some only appear with a specific action, and a few are the "it works, but it's annoying" kind that a real person would complain about.

The simulated backend has two deliberate behaviours that are **not** bugs by themselves:
- Every call has a random delay (0.3–2s).
- The **first** "Place order" attempt in a browser session always fails, then later attempts succeed. The failure is realistic; the bug is how the UI handles it (#16).

## The list

| # | Page | Issue | Type | Severity | How to trigger |
|---|------|-------|------|----------|----------------|
| 1 | Home | Product card descriptions and the "per 250g" text are very low contrast (light grey on white, well under 4.5:1) | Accessibility / readability | Major | Just look at the cards |
| 2 | Home, Product | Product images have no `alt` text | Accessibility | Major | Accessibility tree / screen reader |
| 3 | Home | Searching for something with no matches shows nothing at all, no "no results" message | Feedback / empty state | Minor | Search "zzz" |
| 4 | Product | "Add to bag" gives no feedback: no loading state, no confirmation, nothing changes on screen | Feedback | Major | Click "Add to bag" |
| 5 | Product | "Add to bag" can be triggered repeatedly; double clicking adds the item twice | Error prevention | Major | Double click "Add to bag", open the basket |
| 6 | Header (all pages) | The basket counter badge never updates after adding items, only after a full page reload | State / feedback | Major | Add an item, look at the header |
| 7 | Header, Product, Cart | Inconsistent wording for the same thing: "Basket" (nav, empty button), "bag" (product button), "Cart" (cart page title) | Consistency | Minor | Navigate the flow |
| 8 | Product (Huila Sunrise) | "About this coffee" is one giant run-on paragraph, hard to read and scan | Content / readability | Minor | Open Huila Sunrise |
| 9 | Cart | Quantity − / + buttons are icon-only with no accessible name | Accessibility | Major | Accessibility tree / screen reader |
| 10 | Cart | Quantity − / + buttons are tiny (18×18px), hard to tap on a phone | Accessibility / mobile | Minor | Look at or tap them on a phone |
| 11 | Cart | The most prominent button is "Empty basket" (big, primary, where checkout usually is) and it clears everything with no confirmation or undo; "Continue to checkout" is a small text link | Error prevention / hierarchy | Critical | Look at the cart actions; click "Empty basket" |
| 12 | Cart → Checkout | Shipping (€6.90) is hidden until the very last review step. The cart says "Total" but it excludes shipping | Content / trust | Major | Compare cart total with review total |
| 13 | Checkout | Form fields use placeholders instead of labels; the label disappears once you type | Accessibility / forms | Major | Type in any checkout field |
| 14 | Checkout | Typo in heading: "Delivery adress" | Content | Minor | Look at the form |
| 15 | Checkout | Phone field rejects normal formats like "612 345 678" with the message "Invalid phone" and no hint about what's expected | Forms / error message | Major | Enter a phone with spaces |
| 16 | Checkout | When placing the order fails, the whole form is wiped and the user is sent back to step 1 with a vague, blaming message: "Invalid request. Please check what you did and try again." | Error recovery | Critical | Fill everything, click "Place order" (first attempt fails) |
| 17 | Checkout | The checkout has a fixed width, so on a phone the page scrolls sideways and fields are cut off | Responsive layout | Major | Open checkout at ~375px wide |
| 18 | Sign up | Password requirements are only shown after a failed attempt | Forms / recognition over recall | Minor | Submit a short password |
| 19 | Footer (all pages) | Newsletter "Subscribe" spinner never stops; the user gets no confirmation | Feedback / stuck state | Major | Subscribe with any email |
| 20 | All pages | Keyboard focus is invisible (focus outline removed globally) | Accessibility | Major | Navigate with Tab |

Severity split: 2 Critical, 12 Major, 6 Minor.

## Scoring rules

Decide these before you read any report, and keep them the same for every run.

- **Hit** — the report clearly describes the problem, even with different words or a different severity. "The cart icon doesn't show how many items I have" counts for #6.
- **Partial** — the report touches the area but misses the actual problem. Example for #16: "the order failed" without mentioning that the form was wiped. Count partials as 0.5.
- **Miss** — not mentioned.
- **False positive** — something reported as a problem that isn't one, or that the agent didn't actually observe.
- **Bonus find** — a real issue that is not on this list. Verify it yourself before counting it.
