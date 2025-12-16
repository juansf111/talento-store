# 🛒 Talento Store - Interactive Outfit Builder

Una aplicación de eCommerce interactiva construida con React que permite a los usuarios crear outfits personalizados seleccionando prendas de diferentes categorías.

## 🌟 Características

### ✅ Funcionalidades Implementadas

- **Autenticación de Usuarios**
  - Sistema de login/logout con localStorage
  - Rutas protegidas para carrito y checkout
  - Persistencia de sesión

- **Constructor de Outfits Interactivo**
  - Maniquí visual interactivo
  - Selección por categorías (headwear, tops, bottoms, shoes)
  - Vista previa en tiempo real

- **Carrito de Compras**
  - Agregar/eliminar productos
  - Cálculo automático de totales
  - Persistencia de datos

- **Sistema de Búsqueda y Paginación**
  - Búsqueda en tiempo real de productos
  - Paginación de resultados (4 items por página)
  - Filtrado por nombre

- **Proceso de Checkout**
  - Formulario de pago con validación completa
  - Validación de email, tarjeta, fecha de expiración y CVV
  - Confirmación de orden

- **Notificaciones**
  - Toast notifications para feedback del usuario
  - Mensajes de éxito, error e información

- **SEO y Accesibilidad**
  - Meta tags dinámicos con React Helmet
  - Etiquetas ARIA para accesibilidad
  - Navegación por teclado
  - Roles semánticos

- **Diseño Responsivo**
  - Bootstrap Grid System
  - Styled Components
  - Adaptable a móviles, tablets y desktop

## 🚀 Instalación

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
   git clone <url-del-repositorio>
   cd talento-store
```

2. **Instalar dependencias**
```bash
   npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
   npm run dev
```

4. **Abrir en el navegador**
```
   http://localhost:5173
```

## 📦 Dependencias Principales
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.x",
  "react-icons": "^5.x",
  "react-toastify": "^10.x",
  "react-helmet": "^6.x",
  "bootstrap": "^5.x",
  "styled-components": "^6.x"
}
```

## 🗂️ Estructura del Proyecto
```
talento-store/
├── public/
├── src/
│   ├── components/
│   │   ├── Cart.jsx
│   │   ├── CategoryModal.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── Mannequin.jsx
│   │   └── ProtectedRoute.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── data/
│   │   └── products.json
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
└── README.md
```

## 🎯 Uso de la Aplicación

### 1. **Login**
- Usa cualquier email válido
- Contraseña mínima de 6 caracteres
- Ejemplo: `user@example.com` / `password123`

### 2. **Construir tu Outfit**
- Haz clic en cada sección del maniquí (cabeza, torso, piernas, pies)
- Usa la barra de búsqueda para filtrar productos
- Navega entre páginas de productos
- Selecciona los artículos que desees

### 3. **Revisar Carrito**
- Accede al carrito desde la navegación
- Elimina productos si es necesario
- Revisa el total

### 4. **Checkout**
- Completa el formulario de pago
- Todos los campos son obligatorios
- Validación en tiempo real
- Confirmación de orden

### 5. **Logout**
- Cierra sesión desde el botón en la navegación

## 🎨 Características de Diseño

- **Paleta de Colores**
  - Primary: `#2563eb` (Azul)
  - Secondary: `#10b981` (Verde)
  - Danger: `#ef4444` (Rojo)

- **Animaciones**
  - Transiciones suaves
  - Hover effects
  - Loading spinners
  - Toast notifications

- **Responsive**
  - Mobile First
  - Breakpoint: 768px
  - Grid adaptativo

## ♿ Accesibilidad

- ✅ Etiquetas ARIA completas
- ✅ Roles semánticos (dialog, navigation, listitem)
- ✅ Soporte para navegación por teclado
- ✅ aria-label y aria-describedby
- ✅ Focus states visibles
- ✅ Mensajes de error con role="alert"

## 🔒 Autenticación

El sistema de autenticación es **simulado** para propósitos de demostración:

- Los datos de usuario se almacenan en `localStorage`
- No hay verificación de backend
- Cualquier email/password válido funciona
- En producción, esto debe conectarse a una API real

## 📱 Compatibilidad

- ✅ Chrome (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Edge (últimas 2 versiones)
- ✅ Dispositivos móviles (iOS y Android)

## 🛠️ Scripts Disponibles
```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Lint
npm run lint
```

## 📝 Notas de Desarrollo

### Estado Global
- **AuthContext**: Maneja autenticación y usuario
- **App Component**: Maneja carrito y outfit state

### Rutas Protegidas
Las siguientes rutas requieren autenticación:
- `/cart`
- `/checkout`

### Validaciones del Formulario
- **Email**: Formato válido requerido
- **Tarjeta**: 16 dígitos numéricos
- **Nombre**: Campo obligatorio
- **Fecha**: Formato MM/YY
- **CVV**: 3 dígitos numéricos

## 🚧 Mejoras Futuras

- [ ] Integración con API real (MockAPI)
- [ ] CRUD completo de productos
- [ ] Persistencia del carrito en localStorage
- [ ] Favoritos y wishlist
- [ ] Historial de órdenes
- [ ] Filtros avanzados (precio, categoría)
- [ ] Sistema de reviews
- [ ] Integración con pasarela de pago real

## 👨‍💻 Desarrollo

### Tecnologías Utilizadas
- React 18
- Vite
- React Router DOM
- Context API
- CSS Modules
- Bootstrap Grid
- Styled Components

### Convenciones de Código
- Componentes funcionales con hooks
- Comentarios en español
- Props destructuring
- Estados locales cuando es apropiado

## 📄 Licencia

Este proyecto es parte del curso de Talento Tech y es de uso educativo.

## 🤝 Contribuciones

Este es un proyecto educativo. Para sugerencias o mejoras, por favor contacta al instructor.

## 📧 Contacto

Para preguntas sobre el proyecto:
- Curso: Talento Tech - React
- Proyecto: Entrega Final

---

**¡Gracias por usar Talento Store!** 🛍️