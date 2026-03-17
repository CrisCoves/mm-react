import { createContext, useState } from 'react';
// constants
import { FILTERS } from '../constants.js';

// 1. Crear el contexto. Este es el contexto que tenemos que consumir
// eslint-disable-next-line react-refresh/only-export-components
export const FiltersContext = createContext();

// 2. Crear el Provider, para proveer el contexto. este es el que nos provee de acceso al contexto
export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState(FILTERS);
  return <FiltersContext.Provider value={{ filters, setFilters }}>{children}</FiltersContext.Provider>;
}
