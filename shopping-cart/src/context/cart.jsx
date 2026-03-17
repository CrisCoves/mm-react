import { createContext, useReducer } from 'react';
import { cartReducer, cartInitialState } from '../reducers/cart.js';

// 1. crear el contexto
export const CartContext = createContext();

function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (product) =>
    dispatch({
      type: 'ADD_TO_CART',
      payload: product,
    });

  const removeFromCart = (product) =>
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: product,
    });

  const clearCart = () =>
    dispatch({
      type: 'CLEAR_CART',
    });

  return { state, addToCart, removeFromCart, clearCart };
}

// 2. crear el provider
// al provider le pasamos siempre el children, nuestro provider va a envolver el contenudo que devuelve app
// la dependencia de usar React Context es mínima
export function CartProvider({ children }) {
  const { state, addToCart, removeFromCart, clearCart } = useCartReducer();
  return (
    <CartContext.Provider value={{ cart: state, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

/*Nota: con la implementación del "useReducer" hemos extraido la lógica de actualizar el estado en una función totalmente separada.
Así, la lógica del carrito es por si sola más fácil de testear:
// Testeando que el reducer funciona para añadir un producto al carrito
expect(reducer([], { type: 'ADD_TO_CART', payload: { id: 1 } })).toEqual([{ id: 1, quantity: 1 }]);
 incluso se podría utilizar con otros frameworks
 Es interesante utilizar reducer cuando:
 - tenemos muchos useState, uno detrás de otro. Estado fragmentado
 */
