# Results

Nine runs on 15 October 2026: three prompt levels, three runs each, against the store with **40 planted bugs** (20 planted by Claude + 20 introduced by Codex).

## Setup

- **Agent:** Claude Code 2.1.300, headless (`claude -p`), model **Claude Sonnet 5.5** for every run
- **Browser:** Playwright MCP with a fresh isolated Chromium profile per run, at a 1280px default window
- **Tools:** the browser only. File reading, search, shell and web access were all disabled, so the agent could not see the source code or the answer key.
- **Where:** Claude's cloud sandbox, with the app served locally. Three runs at a time, one per level.
- **Known environment quirk:** the sandbox blocks Google Fonts, so pages fell back to system fonts and sometimes loaded slowly. Several agents flagged this themselves.
- **Scoring:** a separate agent scored every report blind against the answer key. A second, independent scoring came within 0.5 points on every report.

## Headline numbers

| Level | Runs (score of 40) | Average | Claude's 20 | Codex's 20 | False positives | Bonus finds | Avg time | Avg cost |
|---|---|---|---|---|---|---|---|---|
| 1 · one-liner | 24 · 25 · 25 | **24.7 (62%)** | 12.7 | 12.0 | 1 · 0 · 1 | 1 · 6 · 4 | 1.7 min | $0.51 |
| 2 · role + context | 21 · 22 · 23.5 | **22.2 (55%)** | 12.8 | 9.3 | 0 · 1 · 0 | 2 · 5 · 3 | 1.9 min | $0.51 |
| 3 · full checklist | 27.5 · 31.5 · 32 | **30.3 (76%)** | 17.0 | 13.3 | 0 · 1 · 0 | 3 · 4 · 5 | 3.5 min | $0.81 |

## What stood out

1. **Level 2 did worse than the one-liner.** Its exploration was about the same size (~60 steps), but its reports were longer per issue and covered fewer issues. Most of the gap is on Codex's bugs (9.3 vs 12.0).
2. **The checklist changed behaviour, not just wording.** Level 3 was the only level that pressed Tab, so it was the only one to catch the invisible focus ring (3/3 vs 0/6) and the products that can't be reached by keyboard. It was also the only level to catch the checkout overflowing on a phone (2/3). Every run resized to 375px, but levels 1 and 2 never opened checkout at that size. One level-1 run reported "no horizontal scroll at 375px".
3. **The checklist also narrowed attention.** The newsletter spinner that never stops was found by 2 of 3 one-liner runs and by none of the six skill runs. Levels 2 and 3 skipped the footer.
4. **Five bugs were never found by any run:** double-click adding twice (#5), last name cut at 8 characters (#26), search limited to 12 characters (#30), search clearing on blur (#31), and the wrong product image (#33). Four of the five are from Codex's set. They are silent bugs: nothing errors, and you only notice by typing something long, clicking away, or remembering what another page looked like.
5. **Money and navigation bugs were caught by everyone.** Nine out of nine found the "Free" shipping total that didn't add up, the cart line price, the list/product price mismatch, the logo and back link going to the cart, the visible password, and the hidden mobile "Create account" link.
6. **Very few false alarms.** At most one per run, and almost all of them were slow-loading complaints caused by the sandbox's blocked fonts.
7. **Real bonus finds.** Every run found genuine issues nobody planted, such as "ana@gmial" accepted as an email, the header not changing after signup, missing autocomplete attributes, and password rules shown by colour only.

## Every bug, every run

✅ hit · ½ partial · — miss

| # | Bug | Planted by | L1 r1 | L1 r2 | L1 r3 | L2 r1 | L2 r2 | L2 r3 | L3 r1 | L3 r2 | L3 r3 | Found |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Product card short descriptions and "per 250g" text are very low contrast (light grey on white). | Claude | ✅ | ✅ | ✅ | — | — | ✅ | ✅ | ✅ | ✅ | 7/9 |
| 2 | Product images (home cards and product page) have no alt text. | Claude | — | — | — | ½ | — | — | — | — | ✅ | 1.5/9 |
| 3 | Search with no matches shows nothing — no "no results" empty state. | Claude | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 9/9 |
| 4 | "Add to bag" gives no feedback (no loading state, no confirmation, nothing changes). | Claude | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 9/9 |
| 5 | "Add to bag" button is not disabled while saving, so double-clicking adds the item twice. | Claude | — | — | — | — | — | — | — | — | — | 0/9 |
| 6 | Header basket count badge never updates after adding items (only after full reload) — user sees no count. | Claude | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 9/9 |
| 7 | Inconsistent wording: "Basket" (nav / empty button), "bag" (product button), "Cart" (cart page title). | Claude | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 9/9 |
| 8 | Huila Sunrise "About this coffee" is one giant run-on paragraph / wall of text. | Claude | ✅ | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 8/9 |
| 9 | Cart quantity − / + buttons are icon-only with no accessible name. | Claude | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ | ✅ | ✅ | 8/9 |
| 10 | Cart quantity − / + buttons are tiny (18×18px) tap targets. | Claude | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ | ✅ | ✅ | 8/9 |
| 11 | "Empty basket" is the big primary button with no confirmation; "Continue to checkout" is a small text link. | Claude | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 9/9 |
| 12 | Shipping cost is not shown in the cart (cart "Total" excludes it) and only shows up at the last step — a surprise fee late in the flow. | Claude | — | ½ | — | — | — | ½ | ✅ | ✅ | ✅ | 4/9 |
| 13 | Checkout fields use placeholders instead of labels. | Claude | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 9/9 |
| 14 | Typo "Delivery adress". | Claude | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 9/9 |
| 15 | Phone field rejects normal formats with spaces (e.g. "612 345 678" / "+34 600 111 222") with a vague "Invalid phone". | Claude | ½ | ½ | ½ | ✅ | ✅ | ½ | ✅ | ✅ | ✅ | 7/9 |
| 16 | First "Place order" fails; the UI wipes the whole form, returns to step 1, and shows a vague blaming message ("Invalid request. Please check what you did..."). | Claude | — | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 7/9 |
| 17 | Checkout page has a fixed width → horizontal scroll / cut-off fields at 375px phone width. | Claude | — | — | — | — | — | — | — | ✅ | ✅ | 2/9 |
| 18 | Signup password requirements only appear after a failed attempt. | Claude | ✅ | — | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 7/9 |
| 19 | Newsletter "Subscribe" spinner never stops / no confirmation after subscribing. | Claude | ½ | ✅ | ½ | — | — | — | — | — | — | 2/9 |
| 20 | Keyboard focus outline is invisible (removed globally). | Claude | — | — | — | — | — | — | ✅ | ✅ | ✅ | 3/9 |
| 21 | Header logo ("Ponto") links to the cart instead of home. | Codex | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 9/9 |
| 22 | Cart item name link always opens Huila Sunrise, whatever the item. | Codex | — | — | — | — | — | — | — | ✅ | — | 1/9 |
| 23 | Cart "−" button increases quantity (by 1) instead of decreasing. | Codex | ✅ | ✅ | ✅ | — | — | ✅ | ✅ | ✅ | ✅ | 7/9 |
| 24 | Cart "+" button adds 2 instead of 1. | Codex | — | ✅ | ✅ | — | ✅ | ✅ | ✅ | ✅ | ✅ | 7/9 |
| 25 | Cart line total shows the unit price, not price × quantity. | Codex | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 9/9 |
| 26 | Checkout "Last name" field silently truncates at 8 characters. | Codex | — | — | — | — | — | — | — | — | — | 0/9 |
| 27 | Checkout postcode is a number input (spinner, drops leading zeros, rejects letters). | Codex | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ | ✅ | 7/9 |
| 28 | Review step says Shipping "Free" but the total includes €6.90 (total doesn't add up). | Codex | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 9/9 |
| 29 | "Back" on the review step wipes the checkout form. | Codex | — | ✅ | — | — | — | — | — | ✅ | ✅ | 3/9 |
| 30 | Search box limited to 12 characters (can't type longer queries). | Codex | — | — | — | — | — | — | — | — | — | 0/9 |
| 31 | Search query clears itself when the search box loses focus (blur). | Codex | — | — | — | — | — | — | — | — | — | 0/9 |
| 32 | Product cards can't be reached with the keyboard (tabIndex -1 / skipped by Tab). | Codex | — | — | — | — | — | — | — | ✅ | ½ | 1.5/9 |
| 33 | Huila Sunrise card on the home page shows the wrong product image (Yirga Bloom's). | Codex | — | — | — | — | — | — | — | — | — | 0/9 |
| 34 | Home page prices are rounded down (e.g. €14.00 on list vs €14.50 on product page). | Codex | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 9/9 |
| 35 | "← All coffees" link on product page goes to the cart instead of the shop. | Codex | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 9/9 |
| 36 | A single "Add to bag" click adds 2 units. | Codex | ✅ | ✅ | ✅ | ½ | ½ | ½ | ✅ | ✅ | ✅ | 7.5/9 |
| 37 | Signup name field silently truncates at 10 characters. | Codex | — | — | — | — | — | — | — | — | ✅ | 1/9 |
| 38 | Signup password field shows the password in plain text (type="text"). | Codex | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 9/9 |
| 39 | Product description is clipped (max-height, overflow hidden) with no "read more". | Codex | ✅ | ✅ | ✅ | ✅ | ½ | — | ½ | ½ | ½ | 6/9 |
| 40 | "Create account" nav link is hidden on mobile (≤720px) with no alternative. | Codex | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 9/9 |

## False positives

- **level-1-run-1:** Direct-load of #/product/... 'rendered an empty page once' (likely slow-load/environment noise)
- **level-1-run-3:** Slow ~3s skeleton loading on product page presented as an app issue (environment noise)
- **level-2-run-2:** Slow loading 3-5s placeholders / 'Creating account...' 5s presented as Major issue (environment noise)
- **level-3-run-2:** Slow screens blank/stale 2-8s, cart briefly 'Nothing here yet', presented as Major (environment noise)

## Bonus finds (real issues not on the list)

- **level-1-run-1:** Signup password field lacks autocomplete attributes
- **level-1-run-2:** Terms of sale not linked; Scroll position kept between checkout steps; No order summary on checkout details step; Postcode '1' accepted (weak validation); Required fields not marked; Signup native bubbles vs checkout inline errors inconsistent
- **level-1-run-3:** Inputs lack autocomplete attributes; Error banner partly hidden under sticky header; Checkout doesn't focus first invalid field; Card prices misaligned due to varying description length
- **level-2-run-1:** Header unchanged after signup (still 'Create account'); Scroll position kept between steps
- **level-2-run-2:** Header unchanged after signup; Scroll position kept between steps; Required fields not marked; Inconsistent error wording; Product cards taller than screen at 375px
- **level-2-run-3:** Header unchanged after signup / no sign-in; No order summary on checkout details step; No password show/hide toggle
- **level-3-run-1:** Invalid email 'ana@gmial' accepted; Password rules pass/fail by colour only; Empty basket has no undo
- **level-3-run-2:** Checkout inputs lack autocomplete; Password rules by colour only; Error banners not announced to screen readers; Can't edit cart from review step
- **level-3-run-3:** Invalid email 'ana@gmial' accepted; Password rules by colour only; Terms of sale not linked; Page title never changes (unconfirmed); Header nav links ~21px tall tap targets

## Files

- `level-*/run-*.md`: each agent's full final report
- `scores.json`: every score, false positive and bonus find
