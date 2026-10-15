import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listProducts } from '../api/client'
import type { Product } from '../api/data'
import { formatPrice } from '../format'

export default function Home() {
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState<Product[] | null>(null)

  useEffect(() => {
    let active = true
    const t = setTimeout(() => {
      listProducts(query).then((p) => active && setProducts(p))
    }, 250)
    return () => {
      active = false
      clearTimeout(t)
    }
  }, [query])

  return (
    <>
      <section className="hero">
        <h1>Fresh coffee, roasted this week.</h1>
        <p>Single origins and blends from farms we know by name. Shipped within 48 hours of roasting.</p>
      </section>

      <div className="toolbar">
        <input
          type="search"
          maxLength={12}
          className="search"
          placeholder="Search by name, origin or flavour"
          value={query}
          onBlur={() => setQuery('')}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {products === null ? (
        <div className="grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card skeleton" />
          ))}
        </div>
      ) : (
        <div className="grid">
          {products.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="card" tabIndex={-1}>
              <img src={p.id === 'huila-sunrise' ? 'images/coffee-2.svg' : p.image} className="card-img" />
              <div className="card-body">
                <div className="card-top">
                  <h3>{p.name}</h3>
                  <span className="tag">{p.roast}</span>
                </div>
                <p className="card-desc">{p.short}</p>
                <div className="card-price">
                  {formatPrice(Math.floor(p.price))} <span className="unit">per {p.weight}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
