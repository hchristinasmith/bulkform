import express from 'express'

import * as db from '../db/products.ts'
import { ProductData } from '../../models/products.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const products = await db.getProducts()
    res.json({ products })
  } catch (error) {
    console.error(error)
    res.status(500).send('couldn"t getAppliances')
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

export default router
