import { useState, useCallback } from 'react';
import debounce from 'just-debounce-it';

import './App.css';
import SearchMovies from './components/SearchMovies.jsx';

function App() {
  return (
    <div className={'page'}>
      <h1>Page title</h1>

      <SearchMovies />
    </div>
  );
}

export default App;
