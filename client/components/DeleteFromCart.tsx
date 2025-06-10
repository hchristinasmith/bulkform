import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Cart } from '../../models/cart'
import { delCartItem } from '../apis/cart'

interface Props {
  cartItem: Cart
}

export default function DeleteCartItemButton({ cartItem }: Props) {
  const queryClient = useQueryClient()

  const deleteProductMutation = useMutation({
    mutationFn: (id: number) => delCartItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const handleDelete = (id: number) => {
    deleteProductMutation.mutate(id)
  }
  console.log('cartItem:', cartItem)
  return (
    <>
      <button
        onClick={() => handleDelete(cartItem.cart_id)}
        disabled={deleteProductMutation.isPending}
      >
        {deleteProductMutation.isPending ? 'Deleting...' : 'Delete'}
      </button>
    </>
  )
}
