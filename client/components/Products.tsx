import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../apis/products'

// const products = [
//   { id: 1, name: 'Skis', brand: 'Line', price: '1049.00' },
//   { id: 2, name: 'Ski Jacket', brand: 'Patagonia', price: '749.99' },
//   { id: 3, name: 'Trainers', brand: 'Nike', price: '200.00' },
// ]

export default function Products() {
  const {
    data: products,
    isPending,
    error,
  } = useQuery({ queryKey: ['products'], queryFn: () => getProducts() })

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
        <ul>
          {products.map((product) => (
            <li key={product.name}>
              {product.name + ' ' + '$' + product.price}
            </li>
          ))}
        </ul>
      </header>
    </>
  )
}
