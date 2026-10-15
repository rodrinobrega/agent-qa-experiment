import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { addToCart, getProduct } from '../api/client'
import type { Product } from '../api/data'
import { formatPrice } from '../format'

export default function ProductPage() {
  const { id = '' } = useParams()
  const [product, setProduct] = useState<Product | null | undefined>(null)

  useEffect(() => {
    getProduct(id).then(setProduct)
  }, [id])

  if (product === null) return <div className="detail skeleton-block" />
  if (product === undefined)
    return (
      <div className="empty">
        <h2>Coffee not found</h2>
        <Link to="/" className="btn btn-primary">
          Back to shop
        </Link>
      </div>
    )

  return (
    <div className="detail">
      <img src={product.image} className="detail-img" />
      <div className="detail-info">
        <Link to="/cart" className="back-link">
          ← All coffees
        </Link>
        <h1>{product.name}</h1>
        <p className="detail-meta">
          {product.origin} · {product.roast} roast · {product.weight}
        </p>
        <ul className="notes">
          {product.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <p className="detail-price">{formatPrice(product.price)}</p>
        <button className="btn btn-primary btn-lg" onClick={() => addToCart(product.id, 2)}>
          Add to bag
        </button>
        <h2 className="detail-subtitle">About this coffee</h2>
        <p className="detail-desc">{product.description}</p>
      </div>
    </div>
  )
}
