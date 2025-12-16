import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('talentoUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Login: guarda usuario en localStorage
  const login = (email, password) => {
    // Validación simple (en producción usarías una API real)
    if (email && password.length >= 6) {
      const userData = { 
        email, 
        name: email.split('@')[0],
        loginTime: new Date().toISOString()
      }
      localStorage.setItem('talentoUser', JSON.stringify(userData))
      setUser(userData)
      return true
    }
    return false
  }

  // Logout: elimina usuario del localStorage
  const logout = () => {
    localStorage.removeItem('talentoUser')
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}