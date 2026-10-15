# UX QA report: Ponto Coffee Roasters (http://localhost:8080)

I did the main journey on desktop: browse, product page, basket, checkout, then sign-up. I then checked the home page, search and basket at 375px wide. I did not test keyboard-only navigation or the newsletter box, and I did not check browser Back behaviour. The only console error was a Google Fonts request that failed. I put that down to the sandbox's network access, so I'm not counting it as an app bug.

## Critical

**1. The order could not be placed, and the error blames the customer**
- **Where:** Checkout, Review step, "Place order".
- **What happened:** I entered valid details and clicked "Place order" (I double-clicked it). The button changed to "Placing order…", then the page went back to an empty, blank Details form. It showed a red banner: "Invalid request. Please check what you did and try again."
- **Why it matters:** The customer loses everything they typed and has no idea what went wrong. The message implies they made a mistake when the details were valid. Failures are expected in this setup, so this is the likely end of the purchase journey. I didn't test whether a retry works.
- **Severity:** Critical

**2. Basket quantity buttons change the amount by the wrong number**
- **Where:** Product page "Add to bag", and the +/− buttons in the basket.
- **What happened:**
  - I double-clicked "Add to bag" and the basket showed 4.
  - I clicked "−" once and the quantity went from 4 to 5.
  - I clicked "+" once and it went from 5 to 7.
- **Why it matters:** The customer can't control how much they order. They can easily pay for coffee they didn't want. I didn't work out the exact rule behind the jumps, but the results were consistently wrong.
- **Severity:** Critical

## Major

**3. The prices shown don't add up**
- **Where:** Home page, product page, basket and checkout.
- **What happened:**
  - Huila Sunrise is €14.00 on the home page and €14.50 on its own page.
  - In the basket, the line for 7 bags shows €14.50 (a single bag's price) instead of €101.50.
  - At checkout, the subtotal is €101.50 and shipping is "Free", yet the total is €108.40. That is €6.90 unexplained.
- **Why it matters:** Price mismatches destroy trust and could cause chargebacks or legal trouble. Customers notice when the total doesn't match the lines above it.
- **Severity:** Major

**4. Wrong links on the logo and the "← All coffees" link**
- **Where:** The "Ponto" logo in the header, and "← All coffees" on the product page.
- **What happened:** Both take you to the basket (`#/cart`). The "Shop" link goes to the right place.
- **Why it matters:** Clicking the logo is how most people go home. People looking for more coffees land on a basket page instead.
- **Severity:** Major

**5. The phone layout has no way to reach "Create account"**
- **Where:** Header at 375px wide.
- **What happened:** Only "Shop" and "Basket" remain. "Create account" disappears and there is no menu button.
- **Why it matters:** Phone users can't find sign-up from the header at all.
- **Severity:** Major

**6. No feedback when you add to the basket**
- **Where:** Product page "Add to bag", and the "Basket" link in the header.
- **What happened:** Nothing visibly changed after I clicked. There was no message and no item count on "Basket".
- **Why it matters:** People click again, which makes the quantity problem (#2) worse. They also can't tell whether the click worked.
- **Severity:** Major

## Minor

**7. The password is shown in plain text**
- **Where:** Sign-up form, Password field.
- **What happened:** I typed "abc" and then "Coffee2026", and both were fully visible. There is no show/hide toggle.
- **Why it matters:** Passwords can be seen by anyone watching the screen, and typing by hand with no masking is unusual enough to look unsafe.
- **Severity:** Minor

**8. Password rules only appear after a failed attempt**
- **Where:** Sign-up form.
- **What happened:** The rules (8 characters, an uppercase letter, a number) showed up only after I submitted "abc". They turned green once the password met them.
- **Why it matters:** A rule list shown upfront would save a failed attempt.
- **Severity:** Minor

**9. Sign-up doesn't change the site**
- **Where:** Header after sign-up.
- **What happened:** After "Welcome, Ana Silva!", the header still said "Create account". There is no sign-in link, account page or name shown anywhere.
- **Why it matters:** It's unclear whether you're logged in, and a returning customer has no way to sign in.
- **Severity:** Minor

**10. Search with no matches shows a blank page**
- **Where:** Home page search box.
- **What happened:** I typed "zzzz" and the product area went empty, with no "no results" message.
- **Why it matters:** It looks like the page is broken, with no hint to clear the search.
- **Severity:** Minor

**11. The Details step of checkout has no order summary**
- **Where:** Checkout step 1.
- **What happened:** There is no total, item list or "Back to basket" link. The total only appears on step 2.
- **Why it matters:** Customers can't confirm what they're buying while filling in the form.
- **Severity:** Minor

**12. The checkout form uses placeholders as labels**
- **Where:** Checkout Details form.
- **What happened:** Field names are only placeholder text and disappear while typing. Errors are terse: "Invalid phone" gives no example format, and a phone number is required.
- **Why it matters:** People forget which field they're in, and the unexplained required phone number can put them off.
- **Severity:** Minor

**13. The basket's main button is "Empty basket", not "Checkout"**
- **Where:** Basket page.
- **What happened:** "Empty basket" is the big filled button. "Continue to checkout" is a small underlined text link. There is no confirmation before emptying (I didn't click it).
- **Why it matters:** The main action looks secondary, and the destructive one looks like the main action.
- **Severity:** Minor

**14. The quantity +/− buttons are tiny and have no accessible names**
- **Where:** Basket, quantity controls.
- **What happened:** They are about 16px, and a screen reader hears only "button". The same problem is worse on a phone.
- **Why it matters:** They are hard to tap accurately, and screen reader users can't tell what the buttons do.
- **Severity:** Minor

**15. Low-contrast product descriptions**
- **Where:** Home page product cards, and the "per 250g" text.
- **What happened:** The descriptions are very pale grey on white.
- **Why it matters:** They are hard to read, especially on a phone in daylight.
- **Severity:** Minor

## Suggestions

**16. Typo: "Delivery adress"**
- **Where:** Checkout heading.
- **What happened:** "address" is misspelled.
- **Why it matters:** It looks careless at the point where trust matters most.
- **Severity:** Suggestion

**17. Inconsistent wording for the basket**
- **Where:** Throughout the site.
- **What happened:** The same thing is called "Basket", "Cart" ("Your Cart") and "bag" ("Add to bag").
- **Why it matters:** It's a small thing, but it can make people wonder whether these are different things.
- **Severity:** Suggestion

**18. The product description is one huge paragraph**
- **Where:** Product page, "About this coffee".
- **What happened:** It is a single sentence-chain of about 150 words with no breaks.
- **Why it matters:** Most people won't read it. Splitting it into short paragraphs would help.
- **Severity:** Suggestion

**19. Blank skeleton cards for several seconds on slow loads**
- **Where:** Home page and basket on first load (seen at phone width).
- **What happened:** Grey placeholder boxes showed for a few seconds before the content appeared.
- **Why it matters:** This is acceptable, but a long wait with no text may make people leave.
- **Severity:** Suggestion
