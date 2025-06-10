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

// search products

export async function searchProduct(name?: string, brand?: string) {
  //create object to hold query params for url
  const queryParams = new URLSearchParams()
  //if name filter provided, add to the query params
  if (name) queryParams.append('name', name)
  //if brand filter provided, add to the query params
  if (brand) queryParams.append('brand', brand)
  //build full URL including the search query params
  const url = `${rootURL}/products?${queryParams.toString()}`
  //make get request to the backend search endpoint
  const response = await request.get(url)
  //return list of products form the response body
  return response.body.products
}
