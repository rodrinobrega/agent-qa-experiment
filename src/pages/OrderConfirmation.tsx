import { Link, useParams } from 'react-router-dom'
import { getOrder } from '../api/client'
import { formatPrice } from '../format'

export default function OrderConfirmation() {
  const { id = '' } = useParams()
  const order = getOrder(id)

  if (!order)
    return (
      <div className="empty">
        <h1>Order not found</h1>
        <Link to="/" className="btn btn-primary">
          Back to shop
        </Link>
      </div>
    )

  return (
    <div className="confirmation">
      <div className="check">✓</div>
      <h1>Thank you, {order.details.firstName}!</h1>
      <p>
        Your order <strong>{order.id}</strong> is confirmed. We sent a receipt to {order.details.email}.
      </p>
      <p className="muted">Total paid: {formatPrice(order.total)}</p>
      <Link to="/" className="btn btn-primary">
        Keep shopping
      </Link>
    </div>
  )
}
