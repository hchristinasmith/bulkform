import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { searchProduct } from '../apis/products'
import AddProduct from './AddProduct'
import DeleteButton from './DeleteProduct'
import Searchbar from './SearchProducts'
import { useState } from 'react'
import { CartData } from '../../models/cart'
import { addToCart } from '../apis/cart'
import { Product } from '../../models/products'

export default function Products() {
  const queryClient = useQueryClient()
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [searchParams, setSearchParams] = useState({ name: '', brand: '' })

  const {
    data: products = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ['products', searchParams],
    queryFn: () => searchProduct(searchParams.name, searchParams.brand),
  })

  const addAllToCartMutation = useMutation({
    mutationFn: async (items: CartData[]) => {
      await Promise.all(items.map((item) => addToCart(item)))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      setQuantities({})
    },
  })

  const handleQuantityChange = (product_id: number, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [product_id]: quantity,
    }))
  }

  const handleAddAllToCart = () => {
    const itemsToAdd = products
      .filter((p: Product) => quantities[p.id] > 0)
      .map((p: Product) => ({ product_id: p.id, quantity: quantities[p.id] }))

    if (itemsToAdd.length === 0) return
    addAllToCartMutation.mutate(itemsToAdd)
  }

  if (isPending || !products) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error loading products</p>
  }

  return (
    <>
      <header className="header">
        <h1>Products</h1>
        <AddProduct />
        <Searchbar
          onSearch={(name, brand) => setSearchParams({ name, brand })}
        />
        <ul>
          {products.map((product: Product) => (
            <li key={product.id}>
              {product.name + ' ' + '$' + product.price}
              <DeleteButton product={product} />
              <input
                type="number"
                min={0}
                value={quantities[product.id] || 0}
                onChange={(e) =>
                  handleQuantityChange(product.id, Number(e.target.value))
                }
              />
            </li>
          ))}
        </ul>
        <button
          onClick={handleAddAllToCart}
          disabled={addAllToCartMutation.isPending}
        >
          {addAllToCartMutation.isPending ? 'Adding...' : 'Add To Cart'}{' '}
        </button>
        {addAllToCartMutation.isError && <p>Error Adding To Cart</p>}
      </header>
    </>
  )
}
