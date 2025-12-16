import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Helmet } from 'react-helmet'
import { FiUser, FiLock } from 'react-icons/fi'
import { toast } from 'react-toastify'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (login(email, password)) {
      toast.success(`Welcome back, ${email.split('@')[0]}!`, {
        position: "top-right",
        autoClose: 3000
      })
      
      // Redirigir a donde estaba antes o al home
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    } else {
      toast.error('Invalid credentials. Password must be at least 6 characters.', {
        position: "top-right",
        autoClose: 4000
      })
    }
  }

  return (
    <>
      <Helmet>
        <title>Login - Talento Store</title>
        <meta name="description" content="Login to access your shopping cart and checkout" />
      </Helmet>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">
              <FiUser size={48} />
            </div>
            <h1>Welcome Back</h1>
            <p>Login to continue shopping</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">
                <FiUser /> Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                aria-label="Email address"
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <FiLock /> Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                required
                minLength={6}
                aria-label="Password"
                aria-required="true"
                aria-describedby="password-hint"
              />
              <small id="password-hint" className="form-hint">
                Password must be at least 6 characters long
              </small>
            </div>

            <button 
              type="submit" 
              className="login-btn"
              aria-label="Login to your account"
            >
              Login
            </button>
          </form>

          <div className="login-demo-info">
            <p>💡 <strong>Demo:</strong> Use any email and a password with at least 6 characters</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login