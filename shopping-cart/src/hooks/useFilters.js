import { useContext } from 'react';

// context:
import { FiltersContext } from '../context/filters.jsx';

export function useFilters() {
  const { filters, setFilters } = useContext(FiltersContext);

  // filtrar productos por precio y por categoría
  const filterProducts = (products) => {
    return products.filter((product) => {
      return product.price >= filters.minPrice && (filters.category === 'all' || product.category === filters.category);
    });
  };

  return { filters, setFilters, filterProducts };
}
