import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div className="loading-spinner"></div>
        <p>Verifying authentication...</p>
      </div>
    )
  }

  // Si no hay usuario, redirigir al login
  if (!user) {
    // Guardamos la ubicación actual para redirigir después del login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Si está autenticado, mostrar el contenido
  return children
}

export default ProtectedRoute