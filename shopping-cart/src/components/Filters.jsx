import { useId } from 'react';
import './Filters.css';
// constants
import { FILTERS } from '../constants.js';
import { useFilters } from '../hooks/useFilters.js';

// context:
import { FiltersContext } from '../context/filters.jsx';

export default function Filters() {
  const minPriceFilterId = useId();
  const categoryFilterId = useId();
  const { filters, setFilters } = useFilters();

  const handleChangeMinPrice = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: event.target.value,
    }));
  };

  const handleChangeCategory = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  return (
    <section className={'filters'}>
      <h2>Filters:</h2>
      <div>
        <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
        <input
          type='range'
          id={minPriceFilterId}
          min='0'
          max='1000'
          value={filters.minPrice}
          onChange={handleChangeMinPrice}
        />
        <p>$ {filters.minPrice}</p>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categoría:</label>
        <select name='category' id={categoryFilterId} onChange={handleChangeCategory}>
          <option value='all'>Todas</option>
          <option value='beauty'>Belleza</option>
          <option value='fragrances'>Fragancias</option>
          <option value='furniture'>Muebles</option>
          <option value='groceries'>Alimentación</option>
        </select>
      </div>
    </section>
  );
}
