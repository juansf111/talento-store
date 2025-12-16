import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Helmet } from 'react-helmet'
import { FiShoppingCart, FiLogOut, FiUser } from 'react-icons/fi'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Mannequin from './components/Mannequin'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// Componente interno para la navegación con acceso a useAut
function Navigation({ cart }) {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    toast.info('Logged out successfully', {
      position: "top-right",
      autoClose: 2000
    })
  }

  return (
    <nav className="navbar">
      <Helmet>
        <title>Talento Store - Build Your Perfect Outfit</title>
        <meta name="description" content="Interactive outfit builder with the best clothing selection. Create your perfect style!" />
        <meta name="keywords" content="clothing, fashion, outfit builder, online store" />
      </Helmet>

      <div className="nav-brand">
        <Link to="/" aria-label="Go to home page">
          🛒 Talento Store 🛒
        </Link>
      </div>
      
      <div className="nav-links">
        {user ? (
          <>
            <span className="user-welcome" aria-label={`Logged in as ${user.name}`}>
              👋 Hi, {user.name}
            </span>
            <Link 
              to="/cart" 
              className="cart-link"
              aria-label={`Shopping cart with ${cart.length} items`}
            >
              <FiShoppingCart /> Cart ({cart.length})
            </Link>
            <button 
              onClick={handleLogout} 
              className="logout-btn"
              aria-label="Logout from account"
            >
              <FiLogOut /> Logout
            </button>
          </>
        ) : (
          <Link 
            to="/login" 
            className="login-link"
            aria-label="Login to your account"
          >
            <FiUser /> Login
          </Link>
        )}
      </div>
    </nav>
  )
}

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
    toast.success(`${item.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000
    })
  }

  const updateOutfit = (category, item) => {
    setOutfit(prev => ({ ...prev, [category]: item }))
    addToCart(item)
  }

  const removeFromCart = (index) => {
    const item = cart[index]
    setCart(prev => prev.filter((_, i) => i !== index))
    toast.info(`${item.name} removed from cart`, {
      position: "top-right",
      autoClose: 2000
    })
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
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation cart={cart} />

          <Routes>
            <Route 
              path="/login" 
              element={<Login />} 
            />
            
            <Route 
              path="/" 
              element={<Mannequin outfit={outfit} updateOutfit={updateOutfit} />} 
            />
            
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute>
                  <Cart cart={cart} removeFromCart={removeFromCart} />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/checkout" 
              element={
                <ProtectedRoute>
                  <Checkout cart={cart} clearCart={clearCart} />
                </ProtectedRoute>
              } 
            />
          </Routes>

          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App