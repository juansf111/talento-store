import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { FiSearch, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import CategoryModal from './CategoryModal'
import productsData from '../data/products.json'

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

  // Estados para busqueda y paginacion
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

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
    setSearchTerm('')
    setCurrentPage(1)
  }

  // Guarda seleccion en el outfit y cierra el modal
  const handleSelectItem = (item, category) => {
    updateOutfit(category, item)
    setActiveCategory(null)
  }

  // Filtrar productos segun busqueda
  const getFilteredProducts = () => {
    if (!activeCategory || !products) return []
    
    return products[activeCategory].filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  // Obtener productos paginados
  const getPaginatedProducts = () => {
    const filtered = getFilteredProducts()
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filtered.slice(startIndex, endIndex)
  }

  // Calcular total de paginas
  const totalPages = Math.ceil(getFilteredProducts().length / itemsPerPage)

  // Resetear a pagina 1 cuando cambia la busqueda
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

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
      <>
        <Helmet>
          <title>Loading - Talento Store</title>
        </Helmet>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Talento Store products...</p>
        </div>
      </>
    )
  }

  // Vista de error (permite reintentar)
  if (error) {
    return (
      <>
        <Helmet>
          <title>Error - Talento Store</title>
        </Helmet>
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </>
    )
  }

  // UI principal: instrucciones, preview interactivo, resumen y modal
  return (
    <>
      <Helmet>
        <title>Build Your Outfit - Talento Store</title>
        <meta name="description" content="Create your perfect outfit by selecting headwear, tops, bottoms, and shoes from our collection" />
        <meta name="keywords" content="outfit builder, fashion, clothing selector, style creator" />
      </Helmet>

      <div className="mannequin-container">
        <div className="hero-section">
          <h1>Build Your Perfect Outfit</h1>
          <p>Click on any part of the mannequin to choose your style</p>
        </div>

        {showInstructions && (
          <div className="instructions-tooltip" role="complementary" aria-label="Instructions">
            <button 
              className="close-tooltip"
              onClick={() => setShowInstructions(false)}
              aria-label="Close instructions"
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
          <div className="visual-mannequin" role="group" aria-label="Interactive mannequin">
            <div
              className={`visual-slot head ${outfit.headwear ? 'filled' : ''}`}
              onClick={() => handleSlotClick('headwear')}
              role="button"
              tabIndex={0}
              aria-label={outfit.headwear ? `Headwear: ${outfit.headwear.name}. Click to change` : 'No headwear selected. Click to select'}
              onKeyPress={(e) => e.key === 'Enter' && handleSlotClick('headwear')}
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
              role="button"
              tabIndex={0}
              aria-label={outfit.tops ? `Top: ${outfit.tops.name}. Click to change` : 'No top selected. Click to select'}
              onKeyPress={(e) => e.key === 'Enter' && handleSlotClick('tops')}
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
              role="button"
              tabIndex={0}
              aria-label={outfit.bottoms ? `Bottoms: ${outfit.bottoms.name}. Click to change` : 'No bottoms selected. Click to select'}
              onKeyPress={(e) => e.key === 'Enter' && handleSlotClick('bottoms')}
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
              role="button"
              tabIndex={0}
              aria-label={outfit.shoes ? `Shoes: ${outfit.shoes.name}. Click to change` : 'No shoes selected. Click to select'}
              onKeyPress={(e) => e.key === 'Enter' && handleSlotClick('shoes')}
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
              role="button"
              tabIndex={0}
              aria-label="Outfit complete. Click to view cart and checkout"
              onKeyPress={(e) => e.key === 'Enter' && navigate('/cart')}
            >
              ✨ Complete outfit! Ready to checkout
            </div>
          )}
        </div>

        {activeCategory && products[activeCategory] && (
          <div 
            className="modal-overlay" 
            onClick={() => setActiveCategory(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 id="modal-title">
                  <span className="category-icon">{getCategoryIcon(activeCategory)}</span>
                  Select {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
                </h2>
                <button 
                  className="close-btn" 
                  onClick={() => setActiveCategory(null)} 
                  aria-label="Close product selection modal"
                >
                  <FiX />
                </button>
              </div>

              {/* Barra de busqueda */}
              <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <FiSearch 
                  style={{ 
                    position: 'absolute', 
                    left: '1rem', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    color: '#6b7280' 
                  }} 
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 3rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  aria-label="Search products by name"
                />
              </div>

              {/* Grilla de productos */}
              <div className="products-grid">
                {getPaginatedProducts().length > 0 ? (
                  getPaginatedProducts().map(item => (
                    <div 
                      key={item.id} 
                      className="product-card"
                      onClick={() => handleSelectItem(item, activeCategory)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${item.name} for $${item.price}`}
                      onKeyPress={(e) => e.key === 'Enter' && handleSelectItem(item, activeCategory)}
                    >
                      <div className="product-placeholder">
                        <span className="product-icon">{item.img}</span>
                        <p className="product-placeholder-text">{item.name}</p>
                      </div>
                      <div className="product-info">
                        <p className="product-name">{item.name}</p>
                        <p className="product-price">${item.price}</p>
                      </div>
                      <button className="add-btn" aria-label={`Add ${item.name} to outfit`}>
                        Add to Outfit
                      </button>
                    </div>
                  ))
                ) : (
                  <div style={{ 
                    gridColumn: '1 / -1', 
                    textAlign: 'center', 
                    padding: '3rem', 
                    color: '#6b7280' 
                  }}>
                    <p>No products found matching "{searchTerm}"</p>
                  </div>
                )}
              </div>

              {/* Paginador */}
              {totalPages > 1 && (
                <div 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    marginTop: '2rem' 
                  }}
                  role="navigation"
                  aria-label="Product pagination"
                >
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    style={{
                      padding: '0.5rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      background: 'white',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                      opacity: currentPage === 1 ? 0.5 : 1,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    aria-label="Previous page"
                  >
                    <FiChevronLeft />
                  </button>

                  <span aria-live="polite" aria-atomic="true">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    style={{
                      padding: '0.5rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      background: 'white',
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                      opacity: currentPage === totalPages ? 0.5 : 1,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    aria-label="Next page"
                  >
                    <FiChevronRight />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Mannequin