import Products from './Products'
import Cart from './Cart'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <header className="header">
          <h1>Order Form</h1>
        </header>
        <section className="main">
          <div className="products-section">
            <Products />
          </div>
          <div className="cart-section">
            <Cart />
          </div>
        </section>
      </>
    </QueryClientProvider>
  )
}

export default App
