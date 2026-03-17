import { useContext } from 'react';
import { CartContext } from '../context/cart.jsx';

export function useCart() {
  const context = useContext(CartContext);

  // buena práctica: comprobar que el contexto existe. Si es undefined es xq estas utilizando el custom hook en un sitio
  // que no puedes (no estaría envuelto con el Provider)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
