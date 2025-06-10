import Products from './Products'
import Cart from './Cart'

function App() {
  return (
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
  )
}

export default App
