# 🛍️ Talento Store (React + Vite)

**Talento Tech React course project.**  
A functional e-commerce prototype where users build an outfit by selecting headwear, tops, bottoms, and shoes. The app shows a live mannequin preview, manages a cart, and simulates checkout with basic validation.

---

## ✨ Features

- 🧩 **Interactive outfit builder** – click any section to choose an item.
- 🧢 **Visual mannequin preview** – updates instantly with your selections.
- 🛒 **Cart management** – add/remove items, subtotal/total.
- 💳 **Checkout form** – basic client-side validation (email, card, expiry, CVV).
- 🔗 **Routing** – `Home (/), Cart (/cart), Checkout (/checkout)` via `react-router-dom`.
- 📦 **Mock API** – loads from `data/products.json` with loading & error states.
- 🎨 **Responsive UI** – clean, mobile-friendly layout.
- 🖼️ **Item icons** – each product can define its own `img` (emoji for now; images later).

---

## 🧰 Tech Stack

- **React 18** + **Vite**
- **React Router DOM**
- **CSS** (no frameworks)
- **ESLint** (optional)

---

## ▶️ Getting Started

```bash
# 1) Install deps
npm install

# 2) Run dev server
npm run dev

# 3) Build for production
npm run build

# 4) Preview production build
npm run preview
