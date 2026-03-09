import Filters from './Filters.tsx';
import type { FilterValue } from '../types';

interface FooterProps {
  activeCount: number;
  completedCount: number;
  filterSelected: FilterValue;
  onClearCompleted: () => void;
  handleFilterChange: (_filter: FilterValue) => void;
}

export default function Footer({
  activeCount = 0,
  completedCount = 0,
  onClearCompleted,
  filterSelected,
  handleFilterChange,
}: FooterProps) {
  return (
    <footer className={'footer'}>
      <span className='todo-count'>
        <strong>{activeCount}</strong> tareas pendientes
      </span>

      <Filters filterSelected={filterSelected} onFilterChange={handleFilterChange} />

      {completedCount > 0 && (
        <button className={'clear-completed'} type={'button'} onClick={onClearCompleted}>
          Borrar completados
        </button>
      )}
    </footer>
  );
}
