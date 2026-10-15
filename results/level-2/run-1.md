I tested the store on desktop and at 375px wide: browsing, a product page, the cart, checkout, signup, search and form errors. I didn't get to a keyboard-only pass or a retry of the failed order, so those are untested.

## Critical

**1. Shipping is shown as "Free" but the total includes extra money**
- **Where:** Checkout, step 2 (Review), order summary.
- **What happened:** The summary showed Subtotal €29.00, Shipping "Free" and Total €35.90. About €6.90 is unexplained.
- **Why it matters:** The shopper pays more than the page says. That breaks trust at the moment of payment and is a likely cause of abandoned orders or complaints.

**2. Placing the order failed, blamed the user and wiped the form**
- **Where:** Checkout, "Place order" button.
- **What happened:** I double-clicked it. The button changed to "Placing order…" after a few seconds, then I was sent back to an empty step 1. The banner said "Invalid request. Please check what you did and try again."
- **Why it matters:** The message blames the shopper and gives no next step. Losing every field forces them to retype it all. The failure may have been a simulated backend error, but a real visitor has no way to tell. I did not retry or confirm whether a double submit could create two orders.

## Major

**3. Phone number format is rejected with no guidance**
- **Where:** Checkout, Phone field.
- **What happened:** "+34 600 111 222" gave "Invalid phone". "600111222" was accepted. Neither the field nor the error says which format is allowed.
- **Why it matters:** The valid number is turned away. International customers will be blocked, and the error doesn't help them fix it.

**4. "Create account" is missing from the phone header**
- **Where:** Header navigation at 375px.
- **What happened:** Only "Shop" and "Basket" show. The link exists but is hidden.
- **Why it matters:** On a phone, the way to sign up can't be found, and there is no menu to replace it.

**5. Price differs between the list and the product page**
- **Where:** Home grid versus Huila Sunrise page.
- **What happened:** The grid said €14.00 and the product page said €14.50. The cart used €14.50.
- **Why it matters:** The price rises after the shopper has clicked in. That looks like a bait-and-switch.

**6. Cart line price is wrong**
- **Where:** Cart.
- **What happened:** The quantity was 2. The line showed "€14.50 each" and "€14.50" on the right, but the total was €29.00. I clicked "Add to bag" once, so I can't say why the quantity was 2.
- **Why it matters:** The line figure doesn't match the quantity, so the cart looks wrong. An unexpected quantity can mean an item was added twice.

**7. Wrong link targets in the header and product page**
- **Where:** The "Ponto" logo and the "← All coffees" link.
- **What happened:** Both go to the cart (`#/cart`). I read this from the link addresses and didn't click the logo.
- **Why it matters:** Visitors expect the logo to go home and "All coffees" to go back to the shop. Both send them to the cart.

**8. "Add to bag" gives no feedback**
- **Where:** Product page.
- **What happened:** After the click, nothing changed. There was no message, no basket count and no change to the button.
- **Why it matters:** The shopper can't tell whether it worked. They may click again, which could explain the quantity of 2.

**9. Search with no matches shows nothing**
- **Where:** Home search box.
- **What happened:** I typed "zzzz". After a couple of seconds the product grid disappeared and there was no message. Straight after typing, a product was still on screen, so the grid lagged behind the box.
- **Why it matters:** A blank area looks like a broken page. The visitor needs a "no results" message.

## Minor

**10. Password field shows what you type.** On signup, "abc" and "Coffee2026" were visible in plain text. The password rules appear only after a failed attempt.

**11. Checkout and cart actions are poorly weighted.** In the cart, "Empty basket" is the big primary button, while "Continue to checkout" is a small grey underlined link. Shoppers may empty the basket by mistake or miss the way to pay.

**12. Checkout form has no visible labels.** Fields have placeholders only, which vanish when typing. The empty-form errors all say "This field is required".

**13. Postcode accepts numbers only.** It is a number field with up and down arrows. This will break postcodes with letters or leading zeros.

**14. Long product description is cut off mid-sentence.** The Huila Sunrise text stops after about three lines, with no "read more". The full text is very long and is one block.

**15. No signed-in state after signup.** The welcome screen worked, but the header still says "Create account".

**16. Typo.** "Delivery adress" on checkout.

**17. Terms mismatch.** The page and the button say "bag", but the nav and cart say "Basket" and "Cart".

**18. Page position kept between steps.** Moving to the review step left the page scrolled halfway down.

## Suggestions
- **Web fonts failed to load:** the console showed a Google Fonts error, so the page fell back to default fonts. Consider hosting the fonts yourself.
- **Product images:** the first load showed grey placeholder cards. Give product images a text alternative and a clear state if loading fails.

The first things to fix are items 1, 2, 4 and 5, because they affect trust and the ability to buy.
