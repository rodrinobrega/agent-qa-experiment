import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartLine, OrderDetails, getCart, placeOrder, priceLines } from '../api/client'
import { SHIPPING_FEE } from '../api/data'
import { formatPrice } from '../format'

const EMPTY: OrderDetails = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postcode: '',
}

type Errors = Partial<Record<keyof OrderDetails, string>>

function validate(d: OrderDetails): Errors {
  const e: Errors = {}
  ;(Object.keys(d) as (keyof OrderDetails)[]).forEach((k) => {
    if (!d[k].trim()) e[k] = 'This field is required'
  })
  if (d.email && !/^\S+@\S+\.\S+$/.test(d.email)) e.email = 'Please enter a valid email address'
  if (d.phone && !/^\+?\d{9,15}$/.test(d.phone)) e.phone = 'Invalid phone'
  return e
}

export default function Checkout() {
  const navigate = useNavigate()
  const [cart, setCart] = useState<CartLine[] | null>(null)
  const [form, setForm] = useState<OrderDetails>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [step, setStep] = useState<1 | 2>(1)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getCart().then(setCart)
  }, [])

  if (cart === null) return <div className="skeleton-block" />
  if (cart.length === 0)
    return (
      <div className="empty">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="btn btn-primary">
          Browse coffees
        </Link>
      </div>
    )

  const { lines, subtotal } = priceLines(cart)

  const field = (name: keyof OrderDetails, placeholder: string, type = 'text') => (
    <div className="field">
      <input
        type={type}
        name={name}
        maxLength={name === 'lastName' ? 8 : undefined}
        placeholder={placeholder}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className={errors[name] ? 'invalid' : ''}
      />
      {errors[name] && <span className="field-error">{errors[name]}</span>}
    </div>
  )

  const next = (e: React.FormEvent) => {
    e.preventDefault()
    const v = validate(form)
    setErrors(v)
    if (Object.keys(v).length === 0) {
      setError('')
      setStep(2)
    }
  }

  const submit = async () => {
    setSubmitting(true)
    try {
      const order = await placeOrder(form)
      navigate(`/order/${order.id}`)
    } catch {
      setForm(EMPTY)
      setStep(1)
      setError('Invalid request. Please check what you did and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <ol className="steps">
        <li className={step === 1 ? 'active' : ''}>1. Details</li>
        <li className={step === 2 ? 'active' : ''}>2. Review</li>
      </ol>

      {error && <div className="alert">{error}</div>}

      {step === 1 && (
        <form onSubmit={next} noValidate>
          <h2>Contact</h2>
          <div className="row">
            {field('firstName', 'First name')}
            {field('lastName', 'Last name')}
          </div>
          {field('email', 'Email', 'email')}
          {field('phone', 'Phone', 'tel')}

          <h2>Delivery adress</h2>
          {field('address', 'Street and number')}
          <div className="row">
            {field('city', 'City')}
            {field('postcode', 'Postcode', 'number')}
          </div>

          <button className="btn btn-primary btn-lg btn-block">Continue</button>
        </form>
      )}

      {step === 2 && (
        <div className="review">
          <h2>Order summary</h2>
          <ul className="review-lines">
            {lines.map((l) => (
              <li key={l.productId}>
                <span>
                  {l.qty} × {l.product.name}
                </span>
                <span>{formatPrice(l.product.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="review-totals">
            <div>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="grand">
              <span>Total</span>
              <span>{formatPrice(subtotal + SHIPPING_FEE)}</span>
            </div>
          </div>

          <div className="review-address">
            <h3>Delivering to</h3>
            <p>
              {form.firstName} {form.lastName}
              <br />
              {form.address}, {form.postcode} {form.city}
            </p>
          </div>

          <p className="fine-print">
            By placing your order you agree to our terms of sale. Orders are roasted on Tuesdays and shipped within 48 hours.
          </p>

          <div className="review-actions">
            <button className="btn btn-secondary" onClick={() => { setForm(EMPTY); setStep(1) }} disabled={submitting}>
              Back
            </button>
            <button className="btn btn-primary btn-lg" onClick={submit} disabled={submitting}>
              {submitting ? 'Placing order…' : 'Place order'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
