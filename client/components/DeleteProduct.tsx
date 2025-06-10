import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Product } from '../../models/products'
import { delProducts } from '../apis/products'

interface Props {
  product: Product
}

function DeleteButton(props: Props) {
  const queryClient = useQueryClient()

  const deleteProductMutation = useMutation({
    mutationFn: (id: number) => delProducts(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  const handleDelete = async (id: number) => {
    await deleteProductMutation.mutate(id)
  }

  return (
    <>
      <button onClick={() => handleDelete(props.product.id)}>Delete</button>
    </>
  )
}

export default DeleteButton
