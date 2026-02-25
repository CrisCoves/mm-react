export default function Movies({ movies, loading }) {
  const hasMovies = movies && movies.length > 0;

  function ListOfMovies({ movies }) {
    return (
      <ul className={'c-search__results-ul'}>
        {movies.map((movie) => (
          <li key={movie.id} className={'c-movie c-search__results-li'}>
            <img src={movie.image} alt={movie.title} className='c-movie__img' />
            <h3 className='c-movie__title'>{movie.title}</h3>
            <p className='c-movie__date'>{movie.year}</p>
          </li>
        ))}
      </ul>
    );
  }

  function ListOfMoviesSkeleton({ amountMovies }) {
    const moviesSkeletonArray = Array.from(
      { length: amountMovies },
      (_, i) => i + 1,
    );
    return (
      <ul className={'c-search__results-ul'}>
        {moviesSkeletonArray.map((idx) => (
          <li
            key={`movieSkeleton_${idx}`}
            className={'c-movie c-movie--skeleton c-search__results-li'}
          >
            <div className='c-skeleton c-movie__img--skeleton'></div>
            <h3 className='c-movie__title c-skeleton c-skeleton--txt'></h3>
            <p className='c-movie__date c-skeleton c-skeleton--txt'></p>
          </li>
        ))}
      </ul>
    );
  }

  function NoMoviesResults() {
    return <p>No se encontraron películas para esta búsqueda</p>;
  }

  return (
    <div>
      {hasMovies || loading ? (
        loading ? (
          <ListOfMoviesSkeleton amountMovies={7} />
        ) : (
          <ListOfMovies movies={movies} />
        )
      ) : (
        <NoMoviesResults />
      )}
    </div>
  );
}
