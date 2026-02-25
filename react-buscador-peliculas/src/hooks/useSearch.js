import { useState, useEffect, useRef } from 'react';

export function useSearch() {
  const [search, updateSearch] = useState('');
  const [error, setError] = useState(null);
  // flag para evitar que se muestre el error al cargar la página por primera vez, ya que el valor inicial
  // de search es '' y eso hace que se muestre el error de 'No se puede buscar una película vacía'
  // al cargar la página por primera vez:
  const isFirstInput = useRef(true);

  useEffect(() => {
    //console.log('search', search);
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }

    if (search === '') {
      setError('No se puede buscar una película vacía');
      return;
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres');
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}
