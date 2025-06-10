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
      'cart.product_id',
      'products.name',
      'products.brand',
      'products.price',
    )
}

export async function addToCart(
  items: CartData[],
  db = connection,
): Promise<void> {
  for (const item of items) {
    const existing = await db('cart')
      .where({ product_id: item.product_id })
      .first()

    if (existing) {
      await db('cart')
        .where({ product_id: item.product_id })
        .update({ quantity: existing.quantity + item.quantity })
    } else {
      await db('cart').insert(items)
    }
  }
}

export async function removeFromCart(
  product_id: number,
  db = connection,
): Promise<number> {
  return db('cart').where({ product_id }).del()
}

export async function updateQuantities(
  cartItem: {
    product_id: number
    quantity: number
  },
  db = connection,
): Promise<number> {
  const { product_id, quantity } = cartItem
  return db('cart').where({ product_id }).update({ quantity })
}
