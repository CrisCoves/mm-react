import { useEffect, useState } from 'react';
const CAT_SAYS_ENDPOINT_IMAGE = 'https://cataas.com/cat/says';
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com';

export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState();

  // para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return;

    console.log('watcher fact:', fact);
    const factFirstWord = fact.split(' ')[0];
    fetch(`${CAT_SAYS_ENDPOINT_IMAGE}/${factFirstWord}?json=true`)
      .then((res) => res.json())
      .then((data) => {
        const { id } = data;
        const url = `/cat/${id}/says/${factFirstWord}`;
        setImageUrl(url);
      });
  }, [fact]);

  return {
    imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}`,
  };
}
