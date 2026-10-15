# UX QA report: Ponto Coffee Roasters (http://localhost:8080)

I tested it in a real browser at desktop (1280px) and phone (375px) width, and with the keyboard. I covered browsing, search, product pages, cart, checkout, signup and the accessibility tree. Everything below is something I observed.

**Verdict: don't ship yet.** Four things stop a customer from completing a purchase or trusting the prices: the cart maths, the hidden shipping charge, the price mismatches, and the broken phone checkout.

## Critical

**1. Quantity buttons and "Add to bag" change quantity by the wrong amount**
- **Where:** product page "Add to bag", cart − and + buttons
- **Steps:** Add one item. Then press − once and + once. I repeated this on Huila Sunrise, Yirga Bloom and Kenya Ruby.
- **Observed:**
  - One click on "Add to bag" adds 2 items, every time.
  - + adds 2.
  - − adds 1 (4 → 7 → 8 → 10 across my clicks).
  - A customer can't reduce the quantity. The only way down is "Empty basket".
- **Why it matters:** People end up buying several times what they meant to, and the order is charged. Breaks error prevention and user control. I ended up with 10 bags of coffee from a handful of clicks.
- **Severity:** Critical

**2. Cart line price ignores quantity**
- **Where:** cart, per-item price on the right
- **Steps:** Open the cart with a quantity above 1.
- **Observed:**
  - 10 × €16.00 shows "€16.00" on the line, while the Total correctly shows €160.00.
  - The line says €14.50 for 2 bags, but the total says €29.00.
- **Why it matters:** The numbers visibly contradict each other right before payment, which damages trust.
- **Severity:** Critical

**3. Checkout total includes a charge that isn't shown ("Free" shipping, higher total)**
- **Where:** checkout step 2, Order summary
- **Steps:** Complete the details step and look at the review.
- **Observed:** Subtotal €160.00, Shipping "Free", Total €166.90. The extra €6.90 is unexplained. The confirmation page then says "Total paid: €166.90".
- **Why it matters:** A surprise fee late in the flow, labelled "Free", reads as deceptive. It may also have legal consequences for pricing.
- **Severity:** Critical

**4. Prices differ between the shop list and the product page**
- **Where:** home product cards vs product detail pages
- **Observed:**
  - Huila Sunrise: €14.00 on the list, €14.50 on the page.
  - Kenya Ruby: €17.00 on the list, €17.50 on the page.
  - Yirga Bloom matched at €16.00. I didn't check the other products.
- **Why it matters:** The customer clicks through expecting one price and sees a higher one.
- **Severity:** Critical

**5. Checkout is broken on a phone**
- **Where:** `#/checkout` at 375px
- **Observed:** The page is 540px wide in a 375px viewport. The right-hand fields (Last name, Postcode) and the right edge of every field and the Continue button are cut off, and the page scrolls sideways.
- **Why it matters:** Most store traffic is on phones, and this is the step that takes the money.
- **Severity:** Critical

## Major

**6. A failed order wipes everything and blames the user**
- **Where:** checkout, "Place order"
- **Steps:** Place an order. It failed on my first attempt and worked on my second.
- **Observed:** I'm sent back to step 1 with every field empty. The only message is "Invalid request. Please check what you did and try again." The cart was kept.
- **Why it matters:** The customer retypes seven fields and doesn't know whether they were charged or what went wrong. Breaks heuristic 9 (recover from errors) and the forms rule that input is never lost.
- **Severity:** Major

**7. "Back" from the review step erases the form**
- **Steps:** Fill in the details, press Continue, then press Back.
- **Observed:** All fields are empty again.
- **Why it matters:** Fixing one typo means re-entering everything.
- **Severity:** Major

**8. Products can't be reached by keyboard, and focus is invisible everywhere**
- **Where:** all pages
- **Steps:** Press Tab from the top of the home page.
- **Observed:** Focus jumps from the search box straight to the newsletter field. The product cards are skipped. The page also removes the focus outline globally, so you can't see where you are on any element.
- **Why it matters:** A keyboard or screen-reader user can't open a product, so they can't buy anything.
- **Severity:** Major

**9. Logo and "← All coffees" go to the cart**
- **Where:** header logo "Ponto", and the back link on product pages
- **Observed:** Both link to `#/cart`. Clicking the logo should go home, and "All coffees" should go to the shop.
- **Why it matters:** Basic navigation is broken, and people who click "All coffees" end up in the basket.
- **Severity:** Major

**10. The cart link for an item can open the wrong product**
- **Where:** cart, product name link
- **Observed:** The "Yirga Bloom" link pointed to the Huila Sunrise page (`#/product/huila-sunrise`).
- **Severity:** Major

**11. "Create account" disappears on phones**
- **Where:** header at 375px
- **Observed:** Only "Shop" and "Basket" remain. There's no menu button and no other way to reach signup.
- **Severity:** Major

**12. No feedback when adding to the bag**
- **Where:** product page
- **Observed:** After clicking "Add to bag", nothing changes: no message, no change to the button, no count on "Basket".
- **Why it matters:** People click again, which combines badly with bug 1. Breaks visibility of system status.
- **Severity:** Major

**13. Slow screens show blank or stale content with no loading indicator**
- **Where:** product pages, cart, search results
- **Observed:**
  - The product page and the cart often show a blank area for 2–8 seconds.
  - The cart route once showed a leftover product-page placeholder.
  - Right after Add to bag, the cart said "Nothing here yet" before the items appeared.
  - A search takes a few seconds to filter, with no indicator.
- **Why it matters:** The shop looks empty or broken. The false "empty" message may make people leave.
- **Severity:** Major

**14. Search with no matches shows a blank area**
- **Steps:** Search for "zzzz".
- **Observed:** The page shows only the search box, with no "no results" message and no suggestion. Only a small ✕ in the search box clears it.
- **Severity:** Major

## Minor

**15. Checkout fields have no labels, only placeholders.** Once you type, the label is gone. Signup, by contrast, does have labels, so the two forms are inconsistent. The fields also have no `autocomplete` hints, so browsers can't fill in the address.

**16. Phone validation is strict and unexplained.** "+34 600 123 456" gets "Invalid phone", with no stated format. Only digits without spaces passed. Spaces and a country code are normal input.

**17. Postcode is a number field.** It shows spinner arrows and would drop leading zeros. Spanish postcodes like 04001 start with 0. My 04001 test did display correctly, so this one is a risk rather than a confirmed failure.

**18. Password is shown as plain text on signup.** The field uses type `text`. The rules ("8 characters, one uppercase, one number") only appear after the first failed attempt, and pass/fail is shown by red and green text alone.

**19. Weak error text.** Empty-form errors all say "This field is required". The error banners (checkout failure, password) aren't announced to screen readers as alerts.

**20. Typo in the checkout form: "Delivery adress".**

**21. Low contrast on card descriptions.** I measured 1.75:1 against a 4.5:1 minimum, so the text is nearly invisible. The hero and body text are fine (about 7:1).

**22. Cart hierarchy is inverted.** "Empty basket" is the big primary button, with no confirmation and no undo. "Continue to checkout" is a small underlined link. The quantity buttons are about 18×18px, well under the 24px minimum.

**23. Inconsistent naming.** "Basket", "Your Cart" and "Add to bag" all appear for the same thing.

**24. Product description is a wall of text.** The Huila Sunrise description is one very long paragraph, which also looks clipped on the page.

**25. Icon-only quantity buttons have no accessible name.** A screen reader will announce just "button".

## Suggestions

- Show an order summary and the delivery cost on the cart page, before checkout.
- Let people edit the cart from the review step.
- Add a minimum tap size and visible focus styling across the site.
- The empty-cart state ("Nothing here yet… Browse coffees") and the "Placing order…" button state are both good.

## Unconfirmed

- **Console error:** a Google Fonts request fails (`ERR_TUNNEL_CONNECTION_FAILED`). This is probably my sandbox's network, not a site bug. If the fonts really fail, check that the page still reads well on the fallback font.
- **Refresh mid-checkout:** I didn't test whether a refresh keeps the form. The cart does survive (it's stored in the browser).
- **Checkout with an empty cart:** not tested.
- **Double-click on "Place order" and "Create account":** the buttons disabled correctly, but I couldn't tell whether a duplicate order was created.
- **Empty search results:** I tested only one no-match search term.
- **Newsletter "Subscribe" form:** not tested.
- **Failure rate:** order placement failed once in two attempts, and signup was slow but succeeded once. I didn't repeat them enough to estimate how often they fail.
- **Remaining product prices:** I didn't compare every product's list price with its page price.

## Summary: the three changes that would help most

1. **Fix the money.** Make the cart quantity logic correct (one add = one item, + and − work), make line totals multiply, show shipping as a real number, and make list prices match product pages.
2. **Make checkout work everywhere and survive failure.** Fix the phone layout. Keep what the person typed through failures and the Back button. Say what went wrong in plain words, and don't blame the user.
3. **Fix navigation and keyboard access.** The logo and "All coffees" links, the missing mobile "Create account", the product cards that can't be tabbed to, and the missing focus outline. Add loading states and a "no results" message while you're there.

I can also put this report on a shareable page if you'd like.
