import './Products.css';
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx';
import { useCart } from '../hooks/useCart.js';

export default function Products({ products }) {
  const { addToCart, cart, removeFromCart } = useCart();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  return (
    <main className={'products'}>
      <ul>
        {products.map((product) => {
          const isProductInCart = checkProductInCart(product);
          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />

              <div>
                <h3>{product.title}</h3>
              </div>

              <div>
                <button
                  type={'button'}
                  className={'c-btn c-btn--inverse'}
                  aria-label={'Add to cart'}
                  onClick={() => {
                    isProductInCart ? removeFromCart(product) : addToCart(product);
                  }}
                  style={{ backgroundColor: isProductInCart ? 'red' : 'green' }}
                >
                  <span>{isProductInCart}</span>
                  {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
