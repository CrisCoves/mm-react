import { useEffect, useState } from 'react';

import { getFact } from '../services/facts.js';
// const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';
// const CAT_SAYS_ENDPOINT_IMAGE = 'https://cataas.com/cat/says';
// const CAT_PREFIX_IMAGE_URL = 'https://cataas.com';

export function useFact() {
  const [fact, setFact] = useState('');
  //const [imageUrl, setImageUrl] = useState('');

  const handleGetFact = () => {
    // getFact devuelve una promesa que al llamarla la debemos resolver con then.
    // podemos pasar las funciones como parámetros
    getFact().then(setFact);
    // sería lo mismo que escribir esto:
    // getFact().then(newFact => setFact(newFact);
  };

  useEffect(() => {
    // get Cat fact when app initializes:
    handleGetFact();
  }, []);

  return { fact, handleGetFact };
}
