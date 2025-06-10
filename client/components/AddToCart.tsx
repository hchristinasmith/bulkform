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
    mutationFn: (cartItem: CartData) => addToCart(cartItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const handleAdd = () => {
    const cartItem: CartData = {
      product_id: product.id,
      quantity: quantity,
      price: 0,
      name: '',
    }
    addToCartMutation.mutate(cartItem)
  }
  return (
    <div>
      <div>
        <label htmlFor={`quantity-${product.id}`}>Qty: </label>
        <input
          id={`quantity-${product.id}`}
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>
      <div>
        <button onClick={handleAdd}>Add to Cart</button>
      </div>
    </div>
  )
}
