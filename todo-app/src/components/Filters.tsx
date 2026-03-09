import { FILTERS_BUTTONS } from '../consts.ts';
import { type FilterValue } from '../types';

interface FiltersProps {
  //filterSelected: 'all' | 'active' | 'completed'; => forma básica
  filterSelected: FilterValue;
  onFilterChange: (_filter: FilterValue) => void;
}

export default function Filters({ filterSelected, onFilterChange }: FiltersProps) {
  return (
    <ul className='filters'>
      {Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
        const isSelected = key === filterSelected;
        const className = isSelected ? 'selected' : '';

        return (
          <li key={key}>
            <a
              href={href}
              className={className}
              onClick={(event) => {
                event.preventDefault();
                onFilterChange(key as FilterValue);
              }}
            >
              {literal}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
