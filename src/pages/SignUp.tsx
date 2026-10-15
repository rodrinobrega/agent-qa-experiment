import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ApiError, signUp } from '../api/client'

const RULES = [
  { test: (p: string) => p.length >= 8, label: 'At least 8 characters' },
  { test: (p: string) => /[A-Z]/.test(p), label: 'One uppercase letter' },
  { test: (p: string) => /\d/.test(p), label: 'One number' },
]

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showRules, setShowRules] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [welcome, setWelcome] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!RULES.every((r) => r.test(password))) {
      setShowRules(true)
      setError('Password does not meet the requirements.')
      return
    }
    setLoading(true)
    try {
      const user = await signUp(name, email, password)
      setWelcome(user.name)
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setError('An account with this email already exists.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (welcome)
    return (
      <div className="confirmation">
        <div className="check">✓</div>
        <h1>Welcome, {welcome}!</h1>
        <p>Your account is ready.</p>
        <Link to="/" className="btn btn-primary">
          Start shopping
        </Link>
      </div>
    )

  return (
    <div className="auth">
      <h1>Create your account</h1>
      <p className="muted">Save your details for faster checkout and get early access to new roasts.</p>
      {error && <div className="alert">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="su-name">Name</label>
          <input id="su-name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="su-email">Email</label>
          <input id="su-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="su-password">Password</label>
          <input
            id="su-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showRules && (
            <ul className="rules">
              {RULES.map((r) => (
                <li key={r.label} className={r.test(password) ? 'ok' : 'bad'}>
                  {r.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="btn btn-primary btn-lg btn-block" disabled={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </div>
  )
}
