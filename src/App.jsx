import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Mannequin from './components/Mannequin'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import './App.css'

function App() {
  const [cart, setCart] = useState([])
  const [outfit, setOutfit] = useState({
    headwear: null,
    tops: null,
    bottoms: null,
    shoes: null
  })

  const addToCart = (item) => {
    setCart(prev => [...prev, item])
  }

  const updateOutfit = (category, item) => {
    setOutfit(prev => ({ ...prev, [category]: item }))
    addToCart(item)
  }

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const clearCart = () => {
    setCart([])
    setOutfit({
      headwear: null,
      tops: null,
      bottoms: null,
      shoes: null
    })
  }

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/">🛒 Talento Store 🛒</Link>
          </div>
          <div className="nav-links">
            <Link to="/cart" className="cart-link">
              🛒 Cart ({cart.length})
            </Link>
          </div>
        </nav>

        <Routes>
          <Route 
            path="/" 
            element={<Mannequin outfit={outfit} updateOutfit={updateOutfit} />} 
          />
          <Route 
            path="/cart" 
            element={<Cart cart={cart} removeFromCart={removeFromCart} />} 
          />
          <Route 
            path="/checkout" 
            element={<Checkout cart={cart} clearCart={clearCart} />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App