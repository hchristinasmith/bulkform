import { useQuery } from '@tanstack/react-query'
import { getCart } from '../apis/cart'

export default function Cart() {
  const {
    data: cart,
    isPending,
    error,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error loading products</p>
  }

  return (
    <>
      <header className="header">
        <h1>Cart</h1>
        <ul>
          {cart?.map((item) => (
            <li key={item.product_id}>
              {item.name} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      </header>
    </>
  )
}
