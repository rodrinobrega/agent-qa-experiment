I tested the home page, search, a product page, the basket, checkout, signup and the newsletter form at desktop width (1280px), and also at mobile width (375px). I found 16 issues, ordered by severity. I only had browser tools, so I couldn't read the source. The behaviour below comes from what I saw in the browser.

## Critical (money and broken core flows)

1. **The minus button in the basket adds items.** I pressed it at quantity 2 and then again at 3, and the quantity went to 3 and then 4. The basket can't be reduced.
2. **One click on "Add to bag" added 2 items.** I clicked once and the basket showed quantity 2.
3. **The basket line total doesn't update.** At quantity 2, 3 and 4 the line stayed at €14.50. Only the "Total" row changed.
4. **The checkout total doesn't add up.** The review step shows subtotal €43.50 and shipping "Free", but the total is €50.40. That's €6.90 that isn't explained anywhere.
5. **The price differs between pages.** Huila Sunrise is €14.00 on the shop list and €14.50 on its product page and in the basket.
6. **The logo and "← All coffees" both link to the cart** (`#/cart`). The logo should go home, and "All coffees" should go back to the shop.
7. **The password field on signup is `type="text"`.** The password shows in plain text as you type. It also has no autocomplete attributes.

## Major

8. **Add to bag gives no feedback.** The button doesn't change and there's no toast. On desktop the nav has no basket count either, so shoppers can't tell it worked. A "4" badge only showed up at mobile width, after a reload.
9. **The product description is cut off mid-sentence** ("…between 1,600 and 1,900"), with no "Read more". The full text is one very long unbroken sentence.
10. **Searching with no matches shows a blank page.** There's no "No coffees found" message and no way to reset the search except clearing the field.
11. **The newsletter signup gives no feedback.** I submitted "nope" and nothing happened. There was no error, and a valid address would probably get no confirmation either.
12. **The postcode field is `type="number"`.** It blocks letters, so UK, Dutch and Canadian postcodes can't be entered. It also drops leading zeros (08001 in Spain).
13. **"Create account" disappears on mobile.** The link is hidden at 375px and there's no menu to replace it, so mobile users can't reach signup.
14. **The destructive action looks like the main one.** "Empty basket" is the big filled button, with no confirmation. "Continue to checkout" is a small grey underlined link.

## Minor

15. **Smaller issues**
    - The checkout heading says "Delivery **adress**".
    - The checkout form uses placeholders instead of labels, so labels vanish as you type. Signup uses proper labels, so the two forms are inconsistent.
    - Error messages are generic ("This field is required", "Invalid phone").
    - Phone is mandatory.
    - Password rules only appear after a failed submit.
    - The basket quantity buttons are 18×18px with no accessible name.
    - The product card description text has low contrast.
    - The wording is inconsistent: Basket, Cart and Bag are all used.
    - Opening `#/product/...` directly rendered an empty page for me once, whereas clicking through worked.
    - The Google Fonts request fails (`ERR_TUNNEL_CONNECTION_FAILED`). That may just be this sandbox's network. If so, the fallback serif font showed instead.
16. **Things that worked.** There was no horizontal scroll at 375px, the empty-form checkout validation fires, and the checkout review step shows the delivery details.

Screenshots from the run are in `.playwright-mcp/` in the working directory. I stopped before clicking "Place order" and didn't create an account. I can run those next, or write the issues up as a ticket list.
