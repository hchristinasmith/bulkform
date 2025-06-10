import express from 'express'

import * as db from '../db/products.ts'
import { ProductData } from '../../models/products.ts'

const router = express.Router()

//search for product:
router.get('/', async (req, res) => {
  const { name, brand } = req.query
  try {
    const products = await db.searchProducts(name as string, brand as string)
    res.json({ products })
  } catch (error) {
    console.error(error)
    res.status(500).send("Couldn't search for products")
  }
})

//add product
router.post('/', async (req, res) => {
  const { product } = req.body as { product: ProductData }

  if (!product) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const newProduct = await db.addProduct(product)
    res.status(201).json({ product: newProduct })
  } catch (error) {
    console.error(error)
    res.status(500).send('Couldnt add new product')
  }
})

//search for product:
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)

  try {
    await db.deleteProduct(id)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).send("Couldn't delete product")
  }
})

export default router
