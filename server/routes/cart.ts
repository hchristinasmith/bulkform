import express from 'express'

import * as db from '../db/cart.ts'
import { CartData } from '../../models/cart.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const cart = await db.getCartWithProducts()
    res.json({ cart })
  } catch (error) {
    console.error(error)
    res.status(500).send("couldn't getCartWithProducts")
  }
})

//add to cart
router.post('/', async (req, res) => {
  const { cart } = req.body as { cart: CartData[] }
  try {
    const addedItems = await db.addToCart(cart)
    res.status(201).json({ cart: addedItems })
  } catch (error) {
    console.error(error)
    res.status(500).send('Couldnt add product(s) ta cart')
  }
})

//delete from cart
router.delete('/:product_id', async (req, res) => {
  const product_id = Number(req.params.product_id)

  if (!product_id) {
    return res.status(400).json({ error: 'Invalid Product ID' })
  }
  try {
    const deleted = await db.removeFromCart(product_id)
    if (deleted) {
      res.status(201).json({ message: 'Item removed from cart' })
    } else {
      res.status(404).json({ error: 'Item not found in cart' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Couldnt remove product fra cart')
  }
})

//update quantities in cart
router.patch('/:product_id', async (req, res) => {
  const product_id = Number(req.params.product_id)
  const quantity = req.body.quantity

  if (!product_id) {
    return res.status(400).json({ error: 'Invalid Product ID' })
  }

  if (typeof quantity !== 'number' || quantity < 1) {
    return res.status(400).json({ error: 'Quantity must be a positive number' })
  }
  try {
    const updatedRows = await db.updateQuantities({ product_id, quantity })
    if (updatedRows) {
      res.status(200).json({ message: 'Quantity successfully updated' })
    } else {
      res.status(404).json({ error: 'Product not found in cart' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send("Couldn't update quantity")
  }
})

export default router
