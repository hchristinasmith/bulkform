import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../apis/products'
import AddProduct from './AddProduct'
import DeleteButton from './DeleteProduct'
import AddToCart from './AddToCart'

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
        <AddProduct />
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name + ' ' + '$' + product.price}
              <DeleteButton product={product} />
              <AddToCart product={product} />
            </li>
          ))}
        </ul>
      </header>
    </>
  )
}
