import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { FiShoppingCart, FiTrash2, FiArrowLeft, FiArrowRight } from 'react-icons/fi'

function Cart({ cart, removeFromCart }) {
  // Calcular total de los items en el carrito
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  // Mostrar vista vacia si no hay productos
  if (cart.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - Talento Store</title>
          <meta name="description" content="Your shopping cart is empty" />
        </Helmet>
        <div className="cart-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FiShoppingCart size={80} />
            </div>
            <h1>Your Cart is Empty</h1>
            <p>Start building your perfect outfit!</p>
            <Link 
              to="/" 
              className="back-link"
              aria-label="Go back to store to shop"
            >
              <FiArrowLeft /> Back to Store
            </Link>
          </div>
        </div>
      </>
    )
  }

  // Mostrar carrito con items y resumen
  return (
    <>
      <Helmet>
        <title>Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'}) - Talento Store</title>
        <meta name="description" content={`Your shopping cart with ${cart.length} items. Total: $${total}`} />
      </Helmet>

      <div className="cart-container">
        <h1>Your Shopping Cart</h1>
        
        <div className="cart-items" role="list" aria-label="Shopping cart items">
          {cart.map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className="cart-item"
              role="listitem"
            >
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-category">{item.category}</p>
              </div>
              <div className="cart-item-actions">
                <p 
                  className="cart-item-price"
                  aria-label={`Price: $${item.price}`}
                >
                  ${item.price}
                </p>
                <button 
                  onClick={() => removeFromCart(index)}
                  className="remove-btn"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <FiTrash2 /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary" role="region" aria-label="Cart summary">
          <div className="cart-total">
            <span>Subtotal:</span>
            <span aria-label={`Subtotal: $${total}`}>${total}</span>
          </div>
          <div className="cart-total total-final">
            <span>Total:</span>
            <span aria-label={`Total amount: $${total}`}>${total}</span>
          </div>
        </div>

        <div className="cart-actions">
          <Link 
            to="/" 
            className="continue-shopping"
            aria-label="Continue shopping in store"
          >
            <FiArrowLeft /> Continue Shopping
          </Link>
          <Link 
            to="/checkout" 
            className="checkout-btn"
            aria-label={`Proceed to checkout with ${cart.length} items`}
          >
            Proceed to Checkout <FiArrowRight />
          </Link>
        </div>
      </div>
    </>
  )
}

export default Cart