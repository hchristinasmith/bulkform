import Products from './Products'
import Cart from './Cart'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom'
const queryClient = new QueryClient()
import { ShoppingCart } from 'lucide-react'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Router>
          <header className="header flex justify-between items-center p-4 border-b bg-purple-800 text-white">
            <NavLink to="/">
              <h1 className="text-xl font-bold">Order Form</h1>
            </NavLink>
            <nav>
              <NavLink to="/cart" aria-label="Shopping Cart">
                <ShoppingCart color="white" size={24} />
              </NavLink>
            </nav>
          </header>
          <main className="flex-grow overflow-auto p-4">
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </Router>
      </div>
    </QueryClientProvider>
  )
}

export default App
