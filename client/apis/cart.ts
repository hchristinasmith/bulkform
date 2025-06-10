import request from 'superagent'
import { Cart } from '../../models/cart'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getCart(): Promise<Cart[]> {
  try {
    const result = await request.get(`${rootURL}/cart`)
    return result.body.cart
  } catch (error) {
    console.error('Failed to fetch cart:', error)
    throw error
  }
}
