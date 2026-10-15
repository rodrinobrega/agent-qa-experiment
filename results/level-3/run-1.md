# UX QA report: Ponto Coffee Roasters (http://localhost:8080)

I tested the home page, a product page, the basket, checkout, signup, search, phone width (375px) and keyboard focus. Everything below I saw myself. I didn't read the source code.

## Critical

**1. The basket quantity buttons add the wrong amounts**
- **Where:** Product page "Add to bag", and the basket's − / + buttons.
- **Steps:**
  1. Open a product and click "Add to bag" once, then open the basket.
  2. Click "+" once.
  3. Click "−" twice.
- **Observed:**
  - One "Add to bag" click gave a quantity of 2. I repeated it on Kenya Ruby and got the same result.
  - One "+" click took the quantity from 2 to 4.
  - "−" raised the quantity from 4 to 5, then to 6.
  - The line price stayed at €14.50 while the total kept rising (€29, €58, €87).
- **Why it matters:** People will pay for coffee they didn't ask for, and they can't reduce the quantity. This breaks Nielsen's heuristics on status, control and error prevention.
- **Severity:** Critical

**2. A failed order wipes the whole checkout form and blames the user**
- **Where:** Checkout, "Place order".
- **Steps:** Fill in the form, click Continue, then double-click "Place order".
- **Observed:**
  - After "Placing order…", I got a red banner: "Invalid request. Please check what you did and try again."
  - I was sent back to step 1 with every field empty.
  - Every field then showed "This field is required".
  - My second attempt worked.
- **Why it matters:** Customers have to retype everything and don't know what went wrong. This breaks the rules on error recovery and never losing input.
- **Severity:** Critical

**3. The final total includes a charge that was never shown**
- **Where:** Checkout review step and confirmation page.
- **Observed:** Subtotal €87.00, Shipping "Free", Total €93.90. A €6.90 difference is unexplained. The confirmation page says "Total paid: €93.90".
- **Why it matters:** Hidden fees at the last step cost trust, and this one also contradicts "Free".
- **Severity:** Critical

## Major

**4. Product-page prices don't match the listing prices**
- **Where:** Home page cards versus product pages.
- **Observed:** Huila Sunrise is €14.00 on the home page and €14.50 on its page. Kenya Ruby is €17.00 and €17.50.
- **Why it matters:** The price changes after the customer has clicked in. It also breaks consistency.
- **Severity:** Major

**5. Three navigation links go to the wrong place**
- **Where:** The "Ponto" logo, and "← All coffees" on product pages.
- **Observed:** Both link to the basket (`#/cart`).
- **Why it matters:** The logo is the usual way home, and the back link leaves the catalogue. This breaks user control and standard conventions.
- **Severity:** Major

**6. Adding to the basket gives no feedback**
- **Where:** Product page and header.
- **Observed:** After "Add to bag" there is no message, the button doesn't change, and the "Basket" link shows no count. I confirmed this on desktop and phone.
- **Why it matters:** People click again, which makes the doubled-quantity bug worse. This breaks visibility of system status.
- **Severity:** Major

**7. Signup accepts an invalid email**
- **Where:** Create account.
- **Steps:** Enter "ana@gmial" as the email, with a valid password.
- **Observed:** "Welcome, Ana! Your account is ready."
- **Why it matters:** The customer may never get receipts or reset emails, and typos aren't caught.
- **Severity:** Major

**8. The signup password is visible and its rules only show after an error**
- **Where:** Create account, Password field.
- **Observed:**
  - The typed password "123" was displayed as plain text.
  - The three rules (8 characters, an uppercase letter, a number) only appeared after I submitted.
  - Met and unmet rules are shown only by red or green colour.
- **Why it matters:** Anyone nearby can read the password. Rules should be visible before typing and shouldn't rely on colour alone.
- **Severity:** Major

**9. Checkout fields have no labels, only placeholders**
- **Where:** Checkout step 1.
- **Observed:**
  - Labels vanish as soon as you type.
  - Every error is the same "This field is required".
  - A phone number written as "+34 600 123 456" was rejected with a bare "Invalid phone". "600123456" was accepted.
  - Signup does use real labels, so the two forms are inconsistent.
- **Why it matters:** People forget what a field was for and can't tell what format is wanted. Common phone formats should be accepted.
- **Severity:** Major

**10. There is no keyboard focus indicator**
- **Where:** All pages.
- **Observed:** Every link and button computed to `outline: none` with no replacement. After pressing Tab, no focus ring was visible.
- **Why it matters:** Keyboard users can't tell where they are. This fails a core WCAG rule.
- **Severity:** Major

**11. The basket's icon buttons have no accessible name and are tiny**
- **Where:** Basket − / + buttons.
- **Observed:** The accessibility tree lists them as bare "button". Each measures 18×18px.
- **Why it matters:** Screen-reader users can't tell which is which, and phone users will mis-tap. The guideline is at least 24px, ideally 44px.
- **Severity:** Major

**12. A search with no results shows a blank page**
- **Where:** Home page search.
- **Steps:** Type "zzzz" and wait about 3 seconds.
- **Observed:** The product grid disappears and nothing replaces it. During the wait, the old results stay on screen.
- **Why it matters:** The visitor can't tell whether it's broken or empty. The empty basket has a good message, so this is an inconsistency too.
- **Severity:** Major

## Minor

**13. On phone, "Create account" disappears from the header.** There is no menu or other route to it (375px, every page).

**14. The primary and secondary actions in the basket are reversed.** "Empty basket" is a large filled button, while "Continue to checkout" is a small underlined link. "Empty basket" also clears everything instantly, with no confirmation or undo.

**15. The long product description is one huge paragraph.** It is a single sentence of roughly 140 words. On Huila Sunrise it appeared cut off mid-sentence in my screenshot, so I couldn't confirm the full text is readable.

**16. Wording is inconsistent.** The header says "Basket", the button says "Add to bag", and the page title says "Your Cart".

**17. Typo: "Delivery adress"** (should be "address").

**18. Product description text on the home cards is very pale grey on white.** It looks well under 4.5:1 contrast, though I only judged this by eye.

**19. The Postcode field is a numeric spinner**, which risks losing leading zeros and invites accidental changes from scrolling.

## Suggestions
- Show shipping cost and the real total in the basket, before checkout.
- Say how long the backend wait is likely to be. Product pages and the cart took 3–6 seconds, and skeleton placeholders showed during that time.
- Save the checkout form as the customer types, so a failure can't wipe it.

## Unconfirmed
- **Double-click on "Place order".** My first order attempt was a double-click and it failed. I can't tell whether the double-click caused the failure, or whether it could create two orders.
- **Whether the failure is random or caused by something I did.** I only saw one checkout failure, so I couldn't repeat it.
- **Web fonts failing to load.** The console shows a Google Fonts request error. This sandbox blocks outside network access, so it may not happen for real visitors.
- **Back-button and refresh behaviour.** I didn't test refreshing in the middle of checkout.
- **Whether the basket survives a refresh.** I didn't test this.
- **The full keyboard-only journey.** I confirmed there's no visible focus ring. I didn't confirm every step can be completed with the keyboard alone.

## Summary: the three changes that would help most
1. **Fix the basket maths.** One click should add one item, "−" should subtract, and line totals should match. Show every cost, including the €6.90, before the final step.
2. **Make checkout safe to fail.** Keep everything the customer typed, give specific error messages next to the field, accept common phone formats, and use real labels.
3. **Fix the basics of navigation and feedback.** Make the logo and back link go to the right pages, show a basket count and confirmation after adding, and add visible keyboard focus.
