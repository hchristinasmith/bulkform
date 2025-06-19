import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { searchProduct } from '../apis/products'
import Searchbar from './SearchProducts'
import { useMemo, useState } from 'react'
import { CartData } from '../../models/cart'
import { addToCart } from '../apis/cart'
import { Product } from '../../models/products'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

export default function Products() {
  const queryClient = useQueryClient()
  const [quantities, setQuantities] = useState<Record<string, number>>({})
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

  const subtotal = useMemo(() => {
    return products.reduce((sum: number, product: Product) => {
      const key = String(product.id)
      const qty = quantities[key] || 0
      const priceNum = Number(product.price)
      if (isNaN(priceNum)) return sum
      return sum + qty * priceNum
    }, 0)
  }, [products, quantities])

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

  if (isPending || !products) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error loading products</p>
  }
  return (
    <section className="bg-white dark:bg-card rounded-none shadow-md p-6 max-w-5xl mx-auto mt-8 border border-gray-200">
      <h2 className="text-3xl font-bold text-purple-800 mb-6">Product List</h2>

      {/* Searchbar controlled by searchParams */}
      <Searchbar
        name={searchParams.name}
        brand={searchParams.brand}
        onSearch={(name, brand) => {
          setSearchParams({ name, brand })
          // Reset quantities on new search if desired:
          setQuantities({})
        }}
      />

      {/* Loading / Error / No results messages */}
      {isPending && <p className="mt-4 text-gray-600">Loading products...</p>}
      {error && <p className="mt-4 text-red-600">Error loading products</p>}
      {!isPending && products.length === 0 && (
        <p className="mt-4 text-gray-600">No products found for your search.</p>
      )}

      {/* Table */}
      {products.length > 0 && (
        <div className="overflow-x-auto mt-6 max-w-5xl mx-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Price / Unit</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product: Product) => {
                const qty = quantities[product.id] || 0
                const priceNum = Number(product.price)
                const lineTotal = qty * priceNum

                return (
                  <TableRow key={product.id}>
                    {/* Image cell: if product.img is a URL */}
                    <TableCell>
                      {product.img ? (
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>${priceNum.toFixed(2)}</TableCell>
                    <TableCell>
                      {/* Quantity input or plus/minus control */}
                      <div className="inline-flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              product.id,
                              Math.max(qty - 1, 0),
                            )
                          }
                          disabled={qty <= 0}
                          className="btn px-2 py-1 rounded-none bg-purple-800 text-white hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold text-gray-900">
                          {qty}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(product.id, qty + 1)
                          }
                          className="btn px-2 py-1 rounded-none bg-purple-800 text-white hover:bg-purple-600 transition"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>${lineTotal.toFixed(2)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Subtotal and Add To Cart */}
      {products.length > 0 && (
        <div className="max-w-5xl mx-auto mt-6 space-y-4">
          {/* Subtotal row */}
          <div className="flex justify-end">
            <p className="text-md font-medium">
              Subtotal:{' '}
              <span className="font-bold">${subtotal.toFixed(2)}</span>
            </p>
          </div>

          {/* Add To Cart button below */}
          <div className="flex justify-end">
            <Button
              onClick={handleAddAllToCart}
              disabled={addAllToCartMutation.isPending || subtotal === 0}
              className="btn"
            >
              {addAllToCartMutation.isPending ? 'Adding...' : 'Add To Cart'}
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}
