import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { FiCreditCard, FiMail, FiCalendar, FiLock, FiCheck } from 'react-icons/fi'
import { toast } from 'react-toastify'

function Checkout({ cart, clearCart }) {
  const navigate = useNavigate()

  // Estado del formulario de pago
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

  // Errores por campo si falla la validacion
  const [errors, setErrors] = useState({})

  // Flag para mostrar pantalla de exito
  const [orderComplete, setOrderComplete] = useState(false)

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {}
    
    // Validar que haya un email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    // Validar numero de tarjeta (16 digitos unicamente, no se verifica validez de la tarjeta en terminos reales)
    const cardNumber = formData.cardNumber.replace(/\s/g, '')
    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Card number is required'
    } else if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = 'Card number must be 16 digits'
    }

    // Validar nombre del titular
    if (!formData.cardName) {
      newErrors.cardName = 'Cardholder name is required'
    }

    // Validar fecha de vencimiento MM/YY
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required'
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Format must be MM/YY'
    }

    // Validar cvv (3 digitos)
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required'
    } else if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Submit del checkout: valida el form, muestra mensaje de exito, limpia el carrito, y redirige
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setOrderComplete(true)
      toast.success('🎉 Order placed successfully!', {
        position: "top-center",
        autoClose: 3000
      })
      setTimeout(() => {
        clearCart()
        navigate('/')
      }, 3000)
    } else {
      toast.error('Please fix the form errors', {
        position: "top-right",
        autoClose: 3000
      })
    }
  }

  // Actualiza el estado del formulario y limpia el error del campo cuando el usuario lo edita
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // Suma total del carrito
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  // Vista cuando no hay items
  if (cart.length === 0) {
    return (
      <>
        <Helmet>
          <title>Checkout - Talento Store</title>
          <meta name="description" content="Complete your purchase" />
        </Helmet>
        <div className="checkout-container">
          <div className="empty-cart">
            <h1>Your cart is empty</h1>
            <p>Add some items before checking out</p>
            <button 
              onClick={() => navigate('/')} 
              className="back-btn"
              aria-label="Go back to store"
            >
              ← Back to Store
            </button>
          </div>
        </div>
      </>
    )
  }

  // Mensaje de exito despues del pago
  if (orderComplete) {
    return (
      <>
        <Helmet>
          <title>Order Complete - Talento Store</title>
          <meta name="description" content="Your order has been placed successfully" />
        </Helmet>
        <div className="checkout-container">
          <div className="order-success">
            <div className="success-icon">
              <FiCheck size={80} />
            </div>
            <h1>Order Complete!</h1>
            <p>Thank you for shopping at Talento Store</p>
            <p className="redirect-text">Redirecting to home...</p>
          </div>
        </div>
      </>
    )
  }

  // Vista principal: formulario + resumen del carrito
  return (
    <>
      <Helmet>
        <title>Checkout ({cart.length} items) - Talento Store</title>
        <meta name="description" content="Complete your purchase securely" />
      </Helmet>

      <div className="checkout-container">
        <h1>Checkout</h1>
        
        <div className="checkout-layout">
          <div className="checkout-form-section">
            <h2>Payment Information</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label htmlFor="email">
                  <FiMail /> Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={errors.email ? 'error-input' : ''}
                  aria-label="Email address"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <span className="error" id="email-error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="cardNumber">
                  <FiCreditCard /> Card Number *
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234567890123456"
                  maxLength="16"
                  className={errors.cardNumber ? 'error-input' : ''}
                  aria-label="Credit card number"
                  aria-required="true"
                  aria-invalid={!!errors.cardNumber}
                  aria-describedby={errors.cardNumber ? "cardNumber-error" : undefined}
                />
                {errors.cardNumber && (
                  <span className="error" id="cardNumber-error" role="alert">
                    {errors.cardNumber}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="cardName">
                  <FiCreditCard /> Cardholder Name *
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={errors.cardName ? 'error-input' : ''}
                  aria-label="Cardholder name"
                  aria-required="true"
                  aria-invalid={!!errors.cardName}
                  aria-describedby={errors.cardName ? "cardName-error" : undefined}
                />
                {errors.cardName && (
                  <span className="error" id="cardName-error" role="alert">
                    {errors.cardName}
                  </span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">
                    <FiCalendar /> Expiry Date *
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className={errors.expiryDate ? 'error-input' : ''}
                    aria-label="Card expiry date"
                    aria-required="true"
                    aria-invalid={!!errors.expiryDate}
                    aria-describedby={errors.expiryDate ? "expiryDate-error" : undefined}
                  />
                  {errors.expiryDate && (
                    <span className="error" id="expiryDate-error" role="alert">
                      {errors.expiryDate}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">
                    <FiLock /> CVV *
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength="3"
                    className={errors.cvv ? 'error-input' : ''}
                    aria-label="Card CVV security code"
                    aria-required="true"
                    aria-invalid={!!errors.cvv}
                    aria-describedby={errors.cvv ? "cvv-error" : undefined}
                  />
                  {errors.cvv && (
                    <span className="error" id="cvv-error" role="alert">
                      {errors.cvv}
                    </span>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                aria-label={`Complete purchase for $${total}`}
              >
                Complete Purchase (${total})
              </button>
            </form>
          </div>

          <div className="checkout-summary-section">
            <h2>Order Summary</h2>
            <div className="checkout-summary" role="region" aria-label="Order summary">
              {cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className="summary-item">
                  <div>
                    <p className="summary-item-name">{item.name}</p>
                    <p className="summary-item-category">{item.category}</p>
                  </div>
                  <span className="summary-item-price">${item.price}</span>
                </div>
              ))}
              <div className="summary-divider"></div>
              <div className="summary-total">
                <strong>Total:</strong>
                <strong>${total}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout