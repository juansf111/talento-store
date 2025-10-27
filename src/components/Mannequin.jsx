import { useState, useEffect } from 'react'
import CategoryModal from './CategoryModal'
import productsData from '../data/products.json'
import { useNavigate } from 'react-router-dom'

function Mannequin({ outfit, updateOutfit }) {
  // Hook para navegar entre paginas sin usar links
  const navigate = useNavigate()
  
  // Catalogo desde JSON (simula respuesta de API)
  const [products, setProducts] = useState(null)

  // Categoria activa para abrir el modal
  const [activeCategory, setActiveCategory] = useState(null)

  // Estados de UI: carga, error e instrucciones iniciales
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showInstructions, setShowInstructions] = useState(true)

  // Carga simulada con delay y manejo de errores
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 800))
        setProducts(productsData)
        setError(null)
      } catch (err) {
        setError('Failed to load products. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  // Abre modal para la categoria clickeada y oculta la guia
  const handleSlotClick = (category) => {
    setActiveCategory(category)
    setShowInstructions(false)
  }

  // Guarda seleccion en el outfit y cierra el modal
  const handleSelectItem = (item, category) => {
    updateOutfit(category, item)
    setActiveCategory(null)
  }

  // Icono por categoria para etiquetar (no el del producto)
  const getCategoryIcon = (category) => {
    const icons = {
      headwear: '🧢',
      tops: '👕',
      bottoms: '👖',
      shoes: '👟'
    }
    return icons[category] || '🏷️'
  }

  // Vista de carga inicial (muestra spinner)
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Talento Store products...</p>
      </div>
    )
  }

  // Vista de error (permite reintentar)
  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    )
  }

  // UI principal: instrucciones, preview interactivo, resumen y modal
  return (
    <div className="mannequin-container">
      <div className="hero-section">
        <h1>Build Your Perfect Outfit</h1>
        <p>Click on any part of the mannequin to choose your style</p>
      </div>

      {showInstructions && (
        <div className="instructions-tooltip">
          <button 
            className="close-tooltip"
            onClick={() => setShowInstructions(false)}
          >
            ×
          </button>
          <h3>👋 How to Use</h3>
          <ol>
            <li>Click on any section of the mannequin below</li>
            <li>Browse available items for that category</li>
            <li>Select an item to add it to your outfit and cart</li>
            <li>Complete your look and checkout!</li>
          </ol>
        </div>
      )}

      <div className="mannequin-visual-preview">
        <h3>👔 Your Outfit Preview</h3>
        <div className="visual-mannequin">
          <div
            className={`visual-slot head ${outfit.headwear ? 'filled' : ''}`}
            onClick={() => handleSlotClick('headwear')}
          >
            {outfit.headwear ? (
              <>
                <span className="visual-icon">{outfit.headwear.img}</span>
                <span className="visual-label">{outfit.headwear.name}</span>
              </>
            ) : (
              <span className="visual-placeholder">No Headwear</span>
            )}
          </div>

          <div
            className={`visual-slot torso ${outfit.tops ? 'filled' : ''}`}
            onClick={() => handleSlotClick('tops')}
          >
            {outfit.tops ? (
              <>
                <span className="visual-icon">{outfit.tops.img}</span>
                <span className="visual-label">{outfit.tops.name}</span>
              </>
            ) : (
              <span className="visual-placeholder">No Top</span>
            )}
          </div>

          <div
            className={`visual-slot legs ${outfit.bottoms ? 'filled' : ''}`}
            onClick={() => handleSlotClick('bottoms')}
          >
            {outfit.bottoms ? (
              <>
                <span className="visual-icon">{outfit.bottoms.img}</span>
                <span className="visual-label">{outfit.bottoms.name}</span>
              </>
            ) : (
              <span className="visual-placeholder">No Bottoms</span>
            )}
          </div>

          <div
            className={`visual-slot feet ${outfit.shoes ? 'filled' : ''}`}
            onClick={() => handleSlotClick('shoes')}
          >
            {outfit.shoes ? (
              <>
                <span className="visual-icon">{outfit.shoes.img}</span>
                <span className="visual-label">{outfit.shoes.name}</span>
              </>
            ) : (
              <span className="visual-placeholder">No Shoes</span>
            )}
          </div>
        </div>
      </div>

      <div className="outfit-summary">
        <h3>Your Current Outfit</h3>
        <div className="outfit-preview">
          {Object.entries(outfit).map(([category, item]) => (
            <div key={category} className="outfit-item">
              <span className="outfit-category">
                {getCategoryIcon(category)} {category}:
              </span>
              <span className="outfit-value">
                {item ? `${item.img} ${item.name} ($${item.price})` : 'Not selected'}
              </span>
            </div>
          ))}
        </div>
        {Object.values(outfit).every(item => item) && (
          <div 
            className="outfit-complete"
            onClick={() => navigate('/cart')}
          >
            ✨ Complete outfit! Ready to checkout
          </div>
        )}
      </div>

      {activeCategory && products[activeCategory] && (
        <CategoryModal
          category={activeCategory}
          products={products[activeCategory]}
          onSelect={handleSelectItem}
          onClose={() => setActiveCategory(null)}
          icon={getCategoryIcon(activeCategory)}
        />
      )}
    </div>
  )
}

export default Mannequin
