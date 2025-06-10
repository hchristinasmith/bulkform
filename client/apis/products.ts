import request from 'superagent'
import { Product } from '../../models/products'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getProducts(): Promise<Product[]> {
  const result = await request.get(`${rootURL}/products`)
  return result.body.products
}
