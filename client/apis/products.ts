import request from 'superagent'
import { Product, ProductData } from '../../models/products'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getProducts(): Promise<Product[]> {
  const result = await request.get(`${rootURL}/products`)
  return result.body.products
}

// add product
export async function addProduct(newProduct: ProductData): Promise<Product> {
  const result = await request.post(`${rootURL}/products`).send({
    product: newProduct,
  })
  return result.body.product
}

// delete products
export async function delProducts(id: number): Promise<void> {
  await request.del(`${rootURL}/products/${id}`)
  return
}

// search products need to finish
// export async function searchProduct(id: number): Promise<void> {
//   await request.where(`${rootURL}/products/${id}`)
//   return
// }
