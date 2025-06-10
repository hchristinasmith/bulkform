//NO LONGER USED

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CartData } from '../../models/cart'
import { addToCart } from '../apis/cart'
import { Product } from '../../models/products'
import { useState } from 'react'

interface Props {
  product: Product
}

export default function AddToCart({ product }: Props) {
  const [quantity, setQuantity] = useState(1)
  const queryClient = useQueryClient()

  const addToCartMutation = useMutation({
    mutationFn: (cartItem: CartData): Promise<void> => addToCart(cartItem),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['cart'] })
      setQuantity(1)
    },
  })

  const handleAdd = () => {
    if (quantity < 1) return
    const cartItem: CartData = {
      product_id: product.id,
      quantity: quantity,
    }
    addToCartMutation.mutate(cartItem)
  }
  return (
    <div>
      <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
      <input
        id={`quantity-${product.id}`}
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button onClick={handleAdd} disabled={addToCartMutation.isPending}>
        {addToCartMutation.isPending ? 'Adding...' : 'Add to Cart'}
      </button>
      {addToCartMutation.isError && (
        <p style={{ color: 'red' }}> Error adding to cart</p>
      )}
    </div>
  )
}
