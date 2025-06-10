import { Product, ProductData } from '../../models/products.ts'
import connection from './connection.ts'

export async function getProducts(db = connection): Promise<Product[]> {
  return db('products').select().orderBy('id')
}

export async function addProduct(
  product: ProductData,
  db = connection,
): Promise<Product[]> {
  return db('products')
    .insert(product)
    .returning('*')
    .then((insertedEntries) => insertedEntries[0])
}

export async function updateProduct(
  id: number,
  updatedProduct: ProductData,
  db = connection,
): Promise<Product[]> {
  return db('products')
    .where({ id })
    .update(updatedProduct)
    .returning('*')
    .then((insertedEntries) => insertedEntries[0])
}

export async function deleteProduct(
  id: number,
  db = connection,
): Promise<Product[]> {
  return db('products').where({ id }).delete()
}
