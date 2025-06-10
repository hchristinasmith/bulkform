import request from 'superagent'
import { Cart, CartData } from '../../models/cart'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getCart(): Promise<Cart[]> {
  const result = await request.get(`${rootURL}/cart`)
  return result.body.cart
}

// add cart
export async function addToCart(items: CartData | CartData[]): Promise<void> {
  const cartItems = Array.isArray(items) ? items : [items]

  const result = await request.post(`${rootURL}/cart`).send({
    cart: cartItems,
  })
  return result.body.cart
}

// delete cart
export async function delCartItem(cart_id: number): Promise<void> {
  await request.del(`${rootURL}/cart/${cart_id}`)
  return
}

// update cart
export async function updateQuantities(cartItem: CartData): Promise<CartData> {
  console.log('Updating product_id:', cartItem.product_id)
  const response = await request
    .patch(`${rootURL}/cart/${cartItem.product_id}`)
    .send({ quantity: cartItem.quantity })
  return response.body as CartData
}
