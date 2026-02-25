import { useState, useCallback } from 'react';
import debounce from 'just-debounce-it';

import './App.css';
import Movies from './components/Movies.jsx';
import { useMovies } from './hooks/useMovies.js';
import { useSearch } from './hooks/useSearch.js';

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  // meter la funcion getMovies dentro de un debounce para evitar que se llame cada vez que el usuario escribe una letra en el input
  // de búsqueda, y solo se llame cuando el usuario deje de escribir por un tiempo (300ms en este caso):
  const debouncedGetMovies = useCallback(
    debounce((search) => getMovies({ search }), 300),
    [],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleSearchChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);

    // Debounce with '/just-debounce-it': Cancelar el timeout anterior
    debouncedGetMovies({ search: newSearch });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className={'page'}>
      <h1>Buscador de películas</h1>

      <div className={'c-search'}>
        <header className={'c-search__input-wp'}>
          <form className={'c-search-form'} onSubmit={handleSubmit}>
            <input
              type={'text'}
              name='query'
              defaultValue={search}
              className={'c-search__input'}
              placeholder='Avengers, Star Wars, The Matrix...'
              style={{
                border: '1px solid transparent',
                borderColor: error ? 'red' : 'transparent',
              }}
              onChange={handleSearchChange}
            />
            <input type='checkbox' value={sort} onChange={handleSort} />
            <button type='submit' className={'c-search__search-btn'}>
              Buscar
            </button>
          </form>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </header>

        <main className='c-search__results'>
          <h2 className={'c-search__results-title'}>Search Results</h2>

          <Movies movies={movies} loading={loading} />
        </main>
      </div>
    </div>
  );
}

export default App;
