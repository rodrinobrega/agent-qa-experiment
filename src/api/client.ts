import { PRODUCTS, Product, SHIPPING_FEE } from './data'

export type CartLine = { productId: string; qty: number }

export type OrderDetails = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postcode: string
}

export type Order = {
  id: string
  lines: (CartLine & { product: Product })[]
  subtotal: number
  shipping: number
  total: number
  details: OrderDetails
}

const CART_KEY = 'ponto.cart'
const ORDERS_KEY = 'ponto.orders'
const USERS_KEY = 'ponto.users'
const ATTEMPTS_KEY = 'ponto.checkoutAttempts'

const wait = (min = 400, max = 1100) =>
  new Promise((r) => setTimeout(r, min + Math.random() * (max - min)))

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

const write = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export async function listProducts(query = ''): Promise<Product[]> {
  await wait(300, 700)
  const q = query.trim().toLowerCase()
  if (!q) return PRODUCTS
  return PRODUCTS.filter((p) =>
    [p.name, p.origin, p.roast, ...p.notes].join(' ').toLowerCase().includes(q),
  )
}

export async function getProduct(id: string): Promise<Product | undefined> {
  await wait(300, 600)
  return PRODUCTS.find((p) => p.id === id)
}

export function getCartSync(): CartLine[] {
  return read<CartLine[]>(CART_KEY, [])
}

export function cartCount(): number {
  return getCartSync().reduce((n, l) => n + l.qty, 0)
}

export async function getCart(): Promise<CartLine[]> {
  await wait(200, 500)
  return getCartSync()
}

export async function addToCart(productId: string, qty = 1): Promise<CartLine[]> {
  await wait(700, 1300)
  const cart = getCartSync()
  const line = cart.find((l) => l.productId === productId)
  if (line) line.qty += qty
  else cart.push({ productId, qty })
  write(CART_KEY, cart)
  return cart
}

export async function setQty(productId: string, qty: number): Promise<CartLine[]> {
  await wait(250, 500)
  let cart = getCartSync()
  if (qty <= 0) cart = cart.filter((l) => l.productId !== productId)
  else {
    const line = cart.find((l) => l.productId === productId)
    if (line) line.qty = qty
  }
  write(CART_KEY, cart)
  return cart
}

export async function clearCart(): Promise<void> {
  await wait(200, 400)
  write(CART_KEY, [])
}

export function priceLines(cart: CartLine[]) {
  const lines = cart
    .map((l) => ({ ...l, product: PRODUCTS.find((p) => p.id === l.productId)! }))
    .filter((l) => l.product)
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0)
  return { lines, subtotal }
}

export async function placeOrder(details: OrderDetails): Promise<Order> {
  await wait(1200, 2000)
  const attempts = Number(sessionStorage.getItem(ATTEMPTS_KEY) || '0') + 1
  sessionStorage.setItem(ATTEMPTS_KEY, String(attempts))
  if (attempts === 1) {
    throw new ApiError(503, 'PAYMENT_GATEWAY_TIMEOUT')
  }
  const { lines, subtotal } = priceLines(getCartSync())
  const order: Order = {
    id: 'PC-' + Math.floor(100000 + Math.random() * 900000),
    lines,
    subtotal,
    shipping: SHIPPING_FEE,
    total: subtotal + SHIPPING_FEE,
    details,
  }
  write(ORDERS_KEY, [...read<Order[]>(ORDERS_KEY, []), order])
  write(CART_KEY, [])
  return order
}

export function getOrder(id: string): Order | undefined {
  return read<Order[]>(ORDERS_KEY, []).find((o) => o.id === id)
}

export async function signUp(name: string, email: string, password: string) {
  await wait(600, 1000)
  const users = read<{ email: string; name: string }[]>(USERS_KEY, [])
  if (users.some((u) => u.email === email)) {
    throw new ApiError(409, 'EMAIL_TAKEN')
  }
  write(USERS_KEY, [...users, { name, email }])
  return { name, email }
}

export async function subscribe(email: string): Promise<{ status: string }> {
  await wait(500, 900)
  return { status: email.includes('@') ? 'subscribed' : 'rejected' }
}
