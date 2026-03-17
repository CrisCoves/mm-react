import { useState } from 'react';

// Components
import { products as initialProducts } from './mocks/products.json';
import Products from './components/Products.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Cart from './components/Cart.jsx';
// context Provider:
import { CartProvider } from './context/cart.jsx';
// Custom Hooks
import { useFilters } from './hooks/useFilters.js';

// styles
import './App.css';
import { FILTERS } from './constants.js';

function App() {
  const [products] = useState(initialProducts);
  const { filterProducts } = useFilters({ products });

  const filteredProducts = filterProducts(products);

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      <Footer />
    </CartProvider>
  );
}

export default App;
