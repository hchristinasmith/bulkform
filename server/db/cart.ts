import { Cart, CartData } from '../../models/cart'
import connection from './connection'

export async function getCart(db = connection): Promise<Cart[]> {
  return db('cart').select().orderBy('id')
}

export async function getCartWithProducts(db = connection) {
  return db('cart')
    .join('products', 'cart.product_id', 'products.id')
    .select(
      'cart.id as cart_id',
      'cart.quantity',
      'products.name',
      'products.brand',
      'products.price',
    )
}

export async function addToCart(
  item: CartData,
  db = connection,
): Promise<void> {
  const existing = await db('cart')
    .where({ product_id: item.product_id })
    .first()

  if (existing) {
    await db('cart')
      .where({ product_id: item.product_id })
      .update({ quantity: existing.quantity + item.quantity })
  } else {
    await db('cart').insert(item)
  }
}

export async function removeFromCart(
  product_id: number,
  db = connection,
): Promise<number> {
  return db('cart').where({ product_id }).del()
}

export async function updateQuantities(
  cartItem: CartData,
  db = connection,
): Promise<number> {
  const { product_id, quantity } = cartItem
  return db('cart').where({ product_id }).update({ quantity })
}
