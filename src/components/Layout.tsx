import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { cartCount, subscribe } from '../api/client'

function Header() {
  const [count] = useState(cartCount())

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <span className="brand-mark" />
          Ponto
        </Link>
        <nav className="main-nav">
          <NavLink to="/" end>
            Shop
          </NavLink>
          <NavLink to="/signup">Create account</NavLink>
          <NavLink to="/cart" className="nav-cart">
            Basket
            {count > 0 && <span className="badge">{count}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await subscribe(email)
    if (res.status === 'success') {
      setDone(true)
      setLoading(false)
    }
  }

  if (done) return <p className="newsletter-done">Thanks! Check your inbox.</p>

  return (
    <form className="newsletter" onSubmit={onSubmit}>
      <label htmlFor="nl-email">Get new roasts in your inbox</label>
      <div className="newsletter-row">
        <input
          id="nl-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <button className="btn btn-primary" disabled={loading}>
          {loading ? <span className="spinner" aria-label="Loading" /> : 'Subscribe'}
        </button>
      </div>
    </form>
  )
}

export default function Layout() {
  return (
    <>
      <Header />
      <main className="container page">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <strong>Ponto Coffee Roasters</strong>
            <p className="muted">Small-batch coffee, roasted every Tuesday in Valencia.</p>
          </div>
          <Newsletter />
        </div>
      </footer>
    </>
  )
}
