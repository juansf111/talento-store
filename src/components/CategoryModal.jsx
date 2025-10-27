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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <span className="category-icon">{categoryIcons[category]}</span>
            Select {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        
        <div className="products-grid">
          {products.map(item => (
            <div 
              key={item.id} 
              className="product-card"
              onClick={() => onSelect(item, category)}
            >
              <div className="product-placeholder">
                <span className="product-icon">{item.img}</span>
                <p className="product-placeholder-text">{item.name}</p>
              </div>
              <div className="product-info">
                <p className="product-name">{item.name}</p>
                <p className="product-price">${item.price}</p>
              </div>
              <button className="add-btn">Add to Outfit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryModal