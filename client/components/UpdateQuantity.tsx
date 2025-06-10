import { updateQuantities } from '../apis/cart'
import { CartData } from '../../models/cart'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Props {
  item: CartData
}

export default function UpdateQuantity({ item }: Props) {
  const [quantity, setQuantity] = useState(item.quantity)
  const [isUpdating, setIsUpdating] = useState(false)
  const queryClient = useQueryClient()
  console.log('UpdateQuantity item:', item)

  const mutation = useMutation({
    mutationFn: (updatedItem: { product_id: number; quantity: number }) =>
      updateQuantities(updatedItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      setIsUpdating(false)
    },
    onError: () => {
      setQuantity(item.quantity)
      setIsUpdating(false)
      alert('Failed to update quantity. Try again.')
    },
  })

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
    setIsUpdating(true)
    mutation.mutate({ product_id: item.product_id, quantity: newQuantity })
  }

  return (
    <div>
      <button
        onClick={() => handleQuantityChange(quantity - 1)}
        disabled={quantity <= 1 || isUpdating}
      >
        -
      </button>
      <span>{isUpdating ? 'Updating...' : quantity}</span>

      <button
        onClick={() => handleQuantityChange(quantity + 1)}
        disabled={isUpdating}
      >
        +
      </button>
    </div>
  )
}
