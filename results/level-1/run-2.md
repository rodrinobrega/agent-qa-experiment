I tested the site at desktop and 375px mobile width. The shop, product page, basket, a 2-step checkout, signup, search and the newsletter form all have problems. Two are blockers: the quantity buttons miscount, and the checkout total is wrong. I didn't place an order. I didn't run an accessibility audit or look at keyboard focus or hover states. The screenshots are in `.playwright-mcp/`.

## Blockers

1. **Quantity buttons miscount.**
   - I clicked "Add to bag" once and the basket showed 2.
   - Clicking "−" twice took the quantity from 2 to 4, so it increased.
   - One click on "+" took it from 4 to 6.
   - Customers can't reliably set the quantity.
2. **Checkout total doesn't add up.**
   - The review step shows Subtotal €87.00 and Shipping "Free", but Total €93.90.
   - About €6.90 is unexplained, which could be a hidden shipping fee or a bad calculation.
3. **Prices disagree.** Huila Sunrise is €14.00 on the shop grid but €14.50 on its product page, in the basket and at checkout. The same may be true of other products. I only checked this one.
4. **Basket line price ignores quantity.** With 2 bags (and later 6) the line shows "€14.50" while the total shows €29.00.

## Major

5. **Logo and "← All coffees" link to the basket (`#/cart`).** Both should go to the shop.
6. **Password field is plain text.** "123" is visible as typed on the signup page. The field should be masked, and it should enforce a minimum length.
7. **Newsletter "Subscribe" spins forever.** There was no network request and no success or error message, and the spinner stayed visible after I navigated to other pages.
8. **Back on checkout wipes every field** the user typed. The page also stays scrolled to the middle.
9. **"Create account" is missing from the mobile nav** at 375px. There's no hamburger menu, so signup can't be reached on a phone.
10. **Search with no matches shows a blank page.** There's no "No coffees found" message or clear-search prompt. The search also reacts with a delay.
11. **Basket actions are weighted wrongly.**
    - "Empty basket" is the big primary button, and it has no confirmation.
    - "Continue to checkout" is a small, faint underlined link.
    - These should be swapped.

## Minor

12. **The product description is cut off mid-sentence** ("…between 1,600 and 1,900"). The full text is in the page, but it's clipped with no "Read more".
13. **Typo:** "Delivery adress" should be "address".
14. **Wording is inconsistent.** The nav says "Basket", the product button says "Add to bag" and the page title says "Your Cart".
15. **Checkout form problems.**
    - Fields are labelled only by placeholders, which vanish on typing, and nothing marks which fields are required.
    - Every empty-field error is the same "This field is required".
    - The phone error ("Invalid phone") is terser than the email one.
    - Postcode "1" was accepted, and it's a number input, which would drop leading zeros.
    - Signup uses the browser's native error bubble while checkout uses inline errors.
16. **No order summary on the details step** of checkout.
17. **Terms of sale aren't a link,** though the review step says "you agree to our terms of sale".
18. **Shop card descriptions and the "per 250g" text are very pale** against white, so contrast is likely too low.
19. **Basket link shows no item count,** and "Add to bag" gives no confirmation.
20. **Quantity +/− buttons are tiny** and have no accessible names, so screen readers can't identify them.
21. **Console error:** the Google Fonts request failed, so the page fell back to a default serif font. This is probably an artifact of my sandbox's network, so please verify it in a normal environment.

If you want to fix things in order, start with items 1 to 4, then 5 to 7.
