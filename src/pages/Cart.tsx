import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartLine, clearCart, getCart, priceLines, setQty } from '../api/client'
import { formatPrice } from '../format'

const Minus = () => (
  <svg viewBox="0 0 16 16" width="10" height="10">
    <rect x="2" y="7" width="12" height="2" fill="currentColor" />
  </svg>
)
const Plus = () => (
  <svg viewBox="0 0 16 16" width="10" height="10">
    <rect x="2" y="7" width="12" height="2" fill="currentColor" />
    <rect x="7" y="2" width="2" height="12" fill="currentColor" />
  </svg>
)

export default function Cart() {
  const [cart, setCart] = useState<CartLine[] | null>(null)

  useEffect(() => {
    getCart().then(setCart)
  }, [])

  if (cart === null) return <div className="skeleton-block" />

  if (cart.length === 0)
    return (
      <div className="empty">
        <h1>Your Cart</h1>
        <p>Nothing here yet. Find a coffee you like and add it.</p>
        <Link to="/" className="btn btn-primary">
          Browse coffees
        </Link>
      </div>
    )

  const { lines, subtotal } = priceLines(cart)

  const change = async (id: string, qty: number) => {
    setCart(await setQty(id, qty))
  }

  const empty = async () => {
    await clearCart()
    setCart([])
  }

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      <ul className="cart-lines">
        {lines.map((l) => (
          <li key={l.productId} className="cart-line">
            <img src={l.product.image} alt={l.product.name} className="cart-thumb" />
            <div className="cart-line-info">
              <Link to={`/product/${l.productId}`}>{l.product.name}</Link>
              <span className="muted">{formatPrice(l.product.price)} each</span>
            </div>
            <div className="qty">
              <button className="qty-btn" onClick={() => change(l.productId, l.qty - 1)}>
                <Minus />
              </button>
              <span>{l.qty}</span>
              <button className="qty-btn" onClick={() => change(l.productId, l.qty + 1)}>
                <Plus />
              </button>
            </div>
            <strong className="line-total">{formatPrice(l.product.price * l.qty)}</strong>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <span>Total</span>
        <strong>{formatPrice(subtotal)}</strong>
      </div>

      <div className="cart-actions">
        <Link to="/checkout" className="text-link">
          Continue to checkout
        </Link>
        <button className="btn btn-primary btn-lg" onClick={empty}>
          Empty basket
        </button>
      </div>
    </div>
  )
}
