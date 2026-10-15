# UX QA report: Ponto Coffee Roasters (http://localhost:8080)

I walked the main journey end to end at desktop size (1280px): browse, product page, basket, checkout, sign-up. I then checked the phone size (375px) and search. I did not test keyboard-only use, so nothing below covers it.

I did not read the source. Every item is something I saw in the browser. I've marked the few I only saw once.

## Critical

**1. Checkout total doesn't match the order summary**
- **Where:** Checkout, step 2 (Review), order summary.
- **What happened:** Subtotal was €58.00 and Shipping was "Free", but Total was €64.90. That is €6.90 that nothing on the page explains.
- **Why it matters:** Shoppers will think they're being overcharged, or that the shop is hiding a fee. This is the point where people abandon a purchase or start disputing charges.

**2. Order failed with a vague error, and the form was wiped**
- **Where:** Checkout, "Place order".
- **What happened:** The button showed "Placing order…" for about 2 seconds. Then I was sent back to an empty step 1 with the banner "Invalid request. Please check what you did and try again." Every field I had filled in was gone.
- **Why it matters:** The message blames the user without saying what went wrong. Having to retype everything after a failure is how you lose customers. The failure may be simulated, but it should be handled gracefully. The basket contents were not checked after the failure, so I don't know whether the order went through.

## Major

**3. One click on "+" added 2 items, and the line price doesn't update**
- **Where:** Basket, quantity "+" button and the line price.
- **What happened:** I clicked "+" once and the quantity went from 2 to 4. A single "Add to bag" click on the product page also seemed to produce a quantity of 2. The line price stayed at €14.50 for quantities of 2 and 4. Only the Total updated (€29.00, then €58.00).
- **Why it matters:** Customers can end up buying more than they meant to. A line price that doesn't change looks like a pricing error. I could not be sure of the "Add to bag" result because my first click on it failed on my side.

**4. Product prices differ between list and detail page**
- **Where:** Shop grid vs. the Huila Sunrise product page.
- **What happened:** The grid showed €14.00 per 250g. The product page and basket showed €14.50.
- **Why it matters:** A price that changes after the click erodes trust. I only checked this one product.

**5. Logo and "← All coffees" both link to the basket**
- **Where:** Header logo "Ponto" and the back link on the product page.
- **What happened:** Both lead to `#/cart` instead of the shop. "← All coffees" took me to the basket.
- **Why it matters:** This breaks two of the most basic navigation habits.

**6. Password is shown in plain text on sign-up**
- **Where:** Create account, Password field.
- **What happened:** What I typed ("a", then "Coffee2026") was readable on screen.
- **Why it matters:** Anyone looking over the user's shoulder can read it. It's a privacy and security issue, and it's unexpected for a password field.

**7. No way to reach sign-up on a phone**
- **Where:** Header navigation at 375px.
- **What happened:** "Create account" is missing from the nav. Only "Shop" and "Basket" remain.
- **Why it matters:** Account creation is a main goal, and phone shoppers can't find it.

**8. Slow loading with no useful feedback**
- **Where:** Shop page, and sign-up.
- **What happened:** The product list showed grey placeholder boxes for about 3 to 5 seconds. Sign-up showed "Creating account…" for about 5 seconds. Placeholders are better than a blank page, but nothing told the user how long to wait.
- **Why it matters:** Slow responses are expected here by design. Without a clear wait message, some people will click again or leave.

## Minor

**9. No feedback after "Add to bag"**
- **Where:** Product page.
- **What happened:** Nothing visibly changed. There was no toast, no basket count and no button change. The only way to know it worked was to open the basket.
- **Why it matters:** Users will click again, which makes problem 3 worse.

**10. "Empty basket" is the main button; "Continue to checkout" is a faint link**
- **Where:** Basket.
- **What happened:** "Empty basket" is a large filled button. "Continue to checkout" is a small underlined link.
- **Why it matters:** The destructive action is the most prominent one, and the action that earns money is easy to miss. It's easy to empty the basket by accident, and there was no confirmation step.

**11. Checkout form issues**
- **Where:** Checkout, step 1.
- **What happened:**
  - Fields are labelled only by placeholder text, so the labels vanish once you type.
  - Nothing marks which fields are required.
  - Phone is required, and it rejected a normal international number (`+34 600 123 456`) with "Invalid phone". It accepted `600123456`, and the error never said which format is allowed.
  - Error wording is inconsistent ("This field is required", "Please enter a valid email address", "Invalid phone").
  - The page did not scroll back to the top between steps. I landed partway down on the next step.
  - Step 2 had a "Back" button. After an error, the Continue button can be off-screen.
- **Why it matters:** Each of these adds friction at the moment users are most likely to give up.

**12. Sign-up password rules appear only after a failed attempt**
- **Where:** Create account.
- **What happened:** The rules (8 characters, an uppercase letter, a number) showed up only after I submitted a weak password. They then turned green once I met them.
- **Why it matters:** Users learn the rules by failing. They should be visible up front.

**13. Signed in, but the page doesn't show it**
- **Where:** Header after sign-up.
- **What happened:** After "Welcome, Ana Test!", the nav still said "Create account".
- **Why it matters:** It's unclear whether the user is logged in, and the link invites them to sign up again.

**14. Search shows a blank area when nothing matches**
- **Where:** Shop search box.
- **What happened:** Searching "zzz" removed all products and showed an empty gap. There was no "No coffees found" message and no suggestion.
- **Why it matters:** Users can't tell whether search is broken or there are simply no results.

**15. Very long product description**
- **Where:** Product page, "About this coffee".
- **What happened:** One paragraph of about 150 words with no breaks. It also looked cut off after "1,900" in my screenshot, so I could not confirm the full text is visible.
- **Why it matters:** Hard to scan. The key points (taste, brewing advice) are buried.

**16. Basket buttons have no accessible names**
- **Where:** Basket, quantity "−" and "+".
- **What happened:** In the page's accessibility tree the two buttons were unnamed.
- **Why it matters:** Screen-reader users won't know what they do. The buttons are also tiny, which makes them hard to tap on a phone.

## Suggestions

**17. Inconsistent naming and a typo**
- "Basket" in the nav, "Your Cart" as the page title, and "Add to bag" on the button all mean the same thing. The checkout heading reads "Delivery adress" (should be "address").

**18. Phone product cards are huge**
- At 375px each product card takes more than a full screen height, so browsing 8 coffees needs a lot of scrolling.

**19. Web font failed to load**
- The console showed a failed request for Google Fonts. This may be a limit of my test environment rather than a real fault. Check that a fallback font looks acceptable.

## Not covered

- Keyboard-only use.
- The empty-basket state.
- Whether the failed order was recorded.
- Other products' prices.
