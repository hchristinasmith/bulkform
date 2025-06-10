import { useQuery } from '@tanstack/react-query'
import { getCart } from '../apis/cart'
import UpdateQuantity from './UpdateQuantity'

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
        {cart?.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={item.id ?? `${item.product_id}-${index}`}>
                {item.name} ${item.price}
                <UpdateQuantity item={item} />
              </li>
            ))}
          </ul>
        )}
      </header>
    </>
  )
}
