import { Link } from 'react-router-dom'

function Cart({ cart, removeFromCart }) {
  // Calcular total de los items en el carrito
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  // Mostrar vista vacia si no hay productos
  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h1>Your Cart is Empty</h1>
          <p>Start building your perfect outfit!</p>
          <Link to="/" className="back-link">← Back to Store</Link>
        </div>
      </div>
    )
  }

  // Mostrar carrito con items y resumen
  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      
      <div className="cart-items">
        {cart.map((item, index) => (
          <div key={`${item.id}-${index}`} className="cart-item">
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p className="cart-item-category">{item.category}</p>
            </div>
            <div className="cart-item-actions">
              <p className="cart-item-price">${item.price}</p>
              <button 
                onClick={() => removeFromCart(index)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <span>Subtotal:</span>
          <span>${total}</span>
        </div>
        <div className="cart-total total-final">
          <span>Total:</span>
          <span>${total}</span>
        </div>
      </div>

      <div className="cart-actions">
        <Link to="/" className="continue-shopping">← Continue Shopping</Link>
        <Link to="/checkout" className="checkout-btn">Proceed to Checkout →</Link>
      </div>
    </div>
  )
}

export default Cart
