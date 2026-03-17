import { useId } from 'react';
import { CartIcon, ClearCartIcon, RemoveFromCartIcon } from './Icons.jsx';
import './Cart.css';
import { useCart } from '../hooks/useCart.js';

function CartItem({ thumbnail, price, title, quantity, addToCart }) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer className={'cart__footer'}>
        <small>Qty: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  );
}

export default function Cart() {
  const cartCheckboxId = useId();
  const { cart, clearCart, addToCart } = useCart();
  console.log('cart:', cart);
  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {cart.map((product) => (
            <CartItem key={product.id} addToCart={() => addToCart(product)} {...product} />
          ))}
        </ul>

        <button className={'cart__btn'} onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}
