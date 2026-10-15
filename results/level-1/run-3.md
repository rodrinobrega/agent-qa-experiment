I tested the Ponto Coffee Roasters site at http://localhost:8080 and found 21 UX problems. The worst are a failing checkout, wrong quantity buttons, a visible password field, and a total that doesn't add up. I tested at 1280px and 375px wide. I checked the shop, search, product page, basket, checkout, signup and newsletter. I didn't read the source or run an accessibility audit.

## Critical (blocks purchase or loses trust)
1. **Placing an order fails.** After "Place order" and a "Placing order…" state, the page goes back to step 1 with an empty form. It shows only "Invalid request. Please check what you did and try again." That message is vague and blames the user. The error banner is also partly hidden under the sticky header.
2. **Quantity buttons are wrong.** One click on "Add to bag" put 2 in the basket. The "−" button increases the quantity by 1, and "+" increases it by 2. I got from 2 to 10 using only those two buttons.
3. **Totals don't add up.**
   - The basket line price stays at €14.50 whatever the quantity.
   - The checkout summary shows subtotal €145.00 and shipping "Free", but the total is €151.90.
4. **Prices disagree.** Huila Sunrise is €14.00 in the shop listing and €14.50 on its product page and in the basket.
5. **The signup password field is plain text.** It uses `type="text"`, so the password is visible as it's typed.
6. **The postcode field only accepts numbers.** It uses `type="number"`, so it rejects letters and drops leading zeros. Spanish postcodes such as 03001 start with 0, and the shop is in Valencia. The Delivering to summary rendered it as "x, 03001 y".

## Navigation and feedback
7. **The "Ponto" logo links to `#/cart`.** It should go to the home page.
8. **"← All coffees" on the product page also links to `#/cart`.**
9. **"Add to bag" gives no feedback.** There's no toast, no button change and no basket count.
10. **A search with no matches shows a blank area.** There's no "No coffees found" message and no clear-search action.
11. **The newsletter "Subscribe" button's spinner never ended.** I waited about 10 seconds. The screenshot may have been stale, so please re-check this one.
12. **Mobile (375px) loses the "Create account" link.** The nav has no menu to replace it.
13. **"Empty basket" is the primary button, and "Continue to checkout" is a faint text link.** Emptying the basket has no confirmation step.
14. **The page loads slowly with only a skeleton, about 3 seconds on the product page.**

## Forms
15. **Checkout fields use placeholders instead of labels.** The labels vanish once you type. Signup does use labels, so the two forms are inconsistent.
16. **Error messages are inconsistent.** Checkout shows "This field is required", "Invalid phone" and "Please enter a valid email address". Signup uses the browser's native bubble. Checkout doesn't focus the first bad field, and the Continue button ends up below the fold.
17. **The inputs have no `autocomplete` attributes**, so browsers can't autofill name, email or address.

## Content, visual and accessibility
18. **Typo: "Delivery adress".**
19. **The basket heading says "Your Cart", but the nav says "Basket".**
20. **Low contrast on product card descriptions and the "per 250g" text.** They are pale grey on white. The cards also aren't aligned: prices sit at different heights because the descriptions have different lengths.
21. **The product description is one huge paragraph.** It's clipped at three lines mid-sentence with no "read more", and the full text is a single sentence of about 150 words.

Smaller points:
- The basket's +/− buttons have no accessible names and are about 18px wide, which is too small to tap.
- The Google Fonts request fails in my environment, which is probably a sandbox limit.

I didn't change any files. I can write these up as tickets with reproduction steps if that's useful.
