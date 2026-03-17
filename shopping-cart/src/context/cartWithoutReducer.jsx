import { createContext, useState } from 'react';

// 1. crear el contexto
export const CartContext = createContext();

// 2. crear el provider
// al provider le pasamos siempre el children, nuestro provider va a envolver el contenudo que devuelve app
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // añadir producto
  const addToCart = (product) => {
    // Nota: esta sería la forma más sencilla de añadir un producto al carrito
    // antes de nada deberíamos check if the products is already in the cart
    //setCart([...cart, product]);
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);

    // el producto ya estaba en el carrito y debemos aumentar la cantidad:
    if (productInCartIndex >= 0) {
      // una forma sería usando structuredClone (hace una copia profunda del estado)
      // nota: el spread operator no serviría xq no hace copia profunda
      const newCart = structuredClone(cart);
      newCart[productInCartIndex].quantity += 1;
      return setCart(newCart);
    }

    // producto no está en el carrito:
    setCart((prevState) => [...prevState, { ...product, quantity: 1 }]);
  };

  // eliminar producto
  const removeFromCart = (product) => {
    setCart((prevState) => prevState.filter((item) => item.id !== product.id));
  };

  // limpiar carrito
  const clearCart = () => {
    setCart([]);
  };

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>;
}
