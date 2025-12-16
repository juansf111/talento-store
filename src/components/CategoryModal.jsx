import { FiX } from 'react-icons/fi'

function CategoryModal({ category, products, onSelect, onClose }) {
  // Iconos por categoria (solo decorativo)
  const categoryIcons = {
    headwear: '🧢',
    tops: '👕',
    bottoms: '👖',
    shoes: '👟'
  }

  // Render del modal para mostrar productos segun la categoria 
  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-modal-title"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 id="category-modal-title">
            <span className="category-icon">{categoryIcons[category]}</span>
            Select {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          <button 
            className="close-btn" 
            onClick={onClose} 
            aria-label="Close modal"
          >
            <FiX />
          </button>
        </div>
        
        <div className="products-grid" role="list" aria-label={`${category} products`}>
          {products.map(item => (
            <div 
              key={item.id} 
              className="product-card"
              onClick={() => onSelect(item, category)}
              role="listitem"
              tabIndex={0}
              aria-label={`${item.name}, $${item.price}. Click to add to outfit`}
              onKeyPress={(e) => e.key === 'Enter' && onSelect(item, category)}
            >
              <div className="product-placeholder">
                <span className="product-icon" aria-hidden="true">{item.img}</span>
                <p className="product-placeholder-text">{item.name}</p>
              </div>
              <div className="product-info">
                <p className="product-name">{item.name}</p>
                <p className="product-price" aria-label={`Price: $${item.price}`}>${item.price}</p>
              </div>
              <button 
                className="add-btn"
                aria-label={`Add ${item.name} to outfit`}
              >
                Add to Outfit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryModal