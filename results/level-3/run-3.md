# UX QA report: Ponto Coffee Roasters (http://localhost:8080)

I tested the site in a real browser (Playwright) at desktop width (1280px) and phone width (375px). I covered the journey from browsing to checkout, signup, search, waiting and failure states, keyboard use, and the accessibility tree. I did not read the source code.

## Problems found, most severe first

### Critical

**1. The checkout total includes a hidden €6.90 charge**
- **Where:** Checkout, step 2 "Review", Order summary.
- **Steps:** Add 5 × Huila Sunrise, fill in the details, click Continue.
- **Observed:** Subtotal €72.50, Shipping "Free", Total **€79.40**. The confirmation page says "Total paid: €79.40". The €6.90 difference is never explained.
- **Why it matters:** The customer pays more than the lines add up to, so they will think it's a mistake or a trick. This is a trust and legal risk. It breaks "no surprises late in a flow" and visibility of system status.

**2. "Add to bag" adds 2 items, and the + and − buttons change the quantity wrongly**
- **Where:** Product page "Add to bag", and the cart's quantity buttons.
- **Steps:**
  - I clicked "Add to bag" once on Huila Sunrise and once on Kenya Ruby. Each time the cart showed **quantity 2**.
  - In the cart I clicked "+" once and the quantity went 2 → 4.
  - I then clicked "−" once and the quantity went 4 → **5**.
- **Observed:** The buttons don't do what their symbols say, and the quantity can't be reduced reliably.
- **Why it matters:** The customer ends up buying things they didn't ask for. In my test the final order was 5 bags, when I had added one. This breaks user control and error prevention.

**3. The line price in the cart doesn't change with quantity**
- **Where:** Cart, price on the right of each item.
- **Observed:** With quantity 5 the line still shows €14.50, while the Total shows €72.50.
- **Why it matters:** The numbers on the page contradict each other, so the customer can't check what they are paying.

**4. A failed order wipes everything the customer typed**
- **Where:** Checkout, "Place order" (the backend fails sometimes; I saw one failure and one success).
- **Steps:** Fill in the form, click Continue, click Place order, wait.
- **Observed:** I saw "Placing order…" for about 3 seconds. The form then came back **completely empty** with the message "Invalid request. Please check what you did and try again."
- **Why it matters:**
  - The customer has to retype 7 fields.
  - The message blames the user and doesn't say what to fix. Nothing was wrong with my input, and a retry with the same data succeeded.
  - It breaks "input is never lost" and "plain-language errors that help recovery".

### Major

**5. The "Back" button on the review step also erases the form**
- **Where:** Checkout step 2 → Back.
- **Observed:** All fields are empty again, so fixing one typo means retyping everything.
- **Why it matters:** It breaks user control and efficiency.

**6. No way to create an account on a phone**
- **Where:** Header navigation at 375px.
- **Observed:** The "Create account" link is not displayed on a phone (0 × 0px). It is still in the accessibility tree.
- **Why it matters:** Phone users can't find signup at all.

**7. The checkout page is wider than the phone screen**
- **Where:** `#/checkout` at 375px.
- **Observed:** The page is 540px wide in a 375px window. The form fields and the Continue button run off the right edge, and the page scrolls sideways.
- **Why it matters:** This is the most important page on a phone, and it is partly cut off.

**8. Signup accepts bad data and changes it without telling the user**
- **Where:** Signup form.
- **Steps:** Enter the email `ana@gmial` and the name "Ana Beatriz Silva", with a valid password.
- **Observed:**
  - The invalid email was accepted.
  - The name field silently cuts input at 10 characters. The welcome page said "Welcome, **Ana Beatri**!".
- **Why it matters:** A mistyped email means the customer never receives their receipts. Losing characters from a name is rude and gives no warning.

**9. Password rules only appear after a failed attempt, and the password is shown in plain text**
- **Where:** Signup, Password field.
- **Observed:**
  - The requirements (8+ characters, an uppercase letter, a number) appear only after the first failed submit.
  - They are marked red or green only, with no icon or text for pass and fail.
  - The field is a plain text field, so the password is visible on screen.
- **Why it matters:** The customer has to guess first and fix afterwards. Colour alone carries the pass/fail meaning, and anyone nearby can read the password.

**10. Valid phone numbers are rejected**
- **Where:** Checkout, Phone field.
- **Steps:** Enter `+34 612 345 678`.
- **Observed:** The field shows "Invalid phone" and doesn't say which format is accepted. Digits only (`612345678`) worked.
- **Why it matters:** This is the most common way to write a phone number. The form should accept it or show the format beforehand.

**11. Keyboard focus is never visible**
- **Where:** All links, buttons and inputs.
- **Observed:** Every element I checked has no focus outline or shadow, including the nav, product links, inputs and buttons.
- **Why it matters:** Keyboard users can't tell where they are, which fails WCAG focus-visible.

**12. Form fields have no visible labels at checkout**
- **Where:** Checkout form.
- **Observed:** The only label is placeholder text, which disappears when typing. Phone is required but looks the same as any other field.
- **Why it matters:** The customer can't check what they typed in each field. Signup does have proper labels, so the two forms are inconsistent.

**13. The Subscribe box has no feedback and no stated purpose**
- **Where:** Footer newsletter box (not fully tested).
- **Observed:** I did not test submission. I'm noting only that the label is the placeholder example `you@example.com`.

### Minor

**14. Several navigation links go to the wrong place**
- **Where:** The "Ponto" logo links to the **cart**, and "← All coffees" on the product page also links to the **cart**.
- **Why it matters:** The logo should go home, and "All coffees" should go back to the shop.

**15. Price on the shop list doesn't match the product page**
- **Where:** Huila Sunrise.
- **Observed:** The list shows **€14.00**, the product page and cart show **€14.50**. Other products may differ too.
- **Why it matters:** A price change on click erodes trust.

**16. No confirmation when adding to the basket**
- **Where:** Product page.
- **Observed:** After clicking "Add to bag" nothing changes: no message and no count on "Basket" in the header.
- **Why it matters:** The customer doesn't know whether it worked, and may click again. Combined with bug 2, this is how people overbuy.

**17. "Empty basket" is the main button and "Continue to checkout" is a small underlined link**
- **Where:** Cart.
- **Observed:** The destructive action has the strongest styling and no confirmation. The action we want customers to take looks like a footnote.
- **Why it matters:** It invites accidental loss of the cart and hurts conversion.

**18. A search with no results shows a completely blank area**
- **Where:** Shop search, `zzzz`.
- **Observed:** The product grid shows loading placeholders, then nothing at all. There is no "no results" message and no suggestion.
- **Why it matters:** The customer can't tell whether the search is broken. Empty states should say what to do next.

**19. Product text is too faint to read**
- **Where:** Short descriptions and "per 250g" on the shop cards.
- **Observed:** Light grey text on white or cream. It looks well under the 4.5:1 contrast minimum. I judged this by eye and did not measure it.

**20. Quantity buttons and nav links are tiny**
- **Where:** Cart "+" and "−" are 18 × 18px. Header links are about 21px tall.
- **Why it matters:** They are hard to tap on a phone. The target is about 44px.

**21. Icon buttons and images have no accessible names**
- **Where:** The "+" and "−" buttons in the cart are announced as just "button". Product images on the shop page have no alt text (the cart images do).
- **Why it matters:** A screen reader user can't tell what the buttons do.

**22. Inconsistent words and typos**
- **Where:** "Basket" in the nav, "bag" on the button, "Cart" as the page title. "Delivery **adress**" at checkout.
- **Why it matters:** Mixed names make people wonder if these are different things.

**23. The terms of sale are mentioned but not linked**
- **Where:** Review step: "you agree to our terms of sale".

**24. The product description is one huge sentence**
- **Where:** Product page, "About this coffee".
- **Observed:** About 150 words with no breaks, and the visible part appears cut off at 4 lines in the layout I saw.
- **Why it matters:** It is hard to scan. Key information such as roast date and brew method is buried.

### Suggestions

- Add a **postcode as text** field instead of a number field (the current one shows spinner arrows and would drop leading zeros).
- Add a quantity picker and a grind option on the product page.
- Show an order summary beside the checkout form.
- Show a shipping cost or a free-shipping threshold in the cart.

## Unconfirmed

- **Google Fonts failed to load** (a console error). It may only be a sandbox limit, so I did not count it as a site bug.
- **The page title never changes** between pages (always "Ponto Coffee Roasters"), which is bad for navigation and screen readers. I only noticed it in the tool output and did not test it further.
- **Possible tab-order oddity:** after two Tab presses the page was scrolled to the footer. I couldn't tell where focus had gone because there is no visible focus style.
- **Double-click on "Place order"** did not create a visible duplicate order, but I can't be sure the button was disabled in time.
- I did not test the newsletter box, refresh in the middle of checkout, or the unhappy path for a failed signup.

## Summary: the three changes that would help most

1. **Fix the money and quantity logic.** Make "Add to bag" add 1, make +/− work, make line prices follow quantity, and show every charge (including the €6.90) before the customer pays.
2. **Make forms safe to fail.** Keep what people typed after any error or Back, write real error messages, accept normal phone and name input, validate emails, and show password rules up front.
3. **Make it work on a phone and without a mouse.** Fix the checkout width, bring back the "Create account" link, enlarge the tap targets, and add a visible keyboard focus style and names for icon buttons.
