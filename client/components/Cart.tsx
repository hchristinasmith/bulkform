import { useQuery } from '@tanstack/react-query'
import { getCart } from '../apis/cart'
import UpdateQuantity from './UpdateQuantity'
import DeleteCartItemButton from './DeleteFromCart'

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
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
      <header className="mb-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">Your Cart</h1>
      </header>

      {cart?.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item, index) => (
            <li
              key={item.cart_id ?? `${item.product_id}-${index}`}
              className="flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex-1">
                <h2 className="text-lg font-medium text-gray-900">
                  {item.name}
                </h2>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <div className="flex items-center space-x-4 mt-3 md:mt-0">
                <UpdateQuantity item={item} />
                <DeleteCartItemButton cartItem={item} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
