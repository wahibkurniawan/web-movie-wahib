const MovieList = ({ movies, setSelectedMovie, favorites, toggleFavorite }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="border rounded-lg shadow-md p-4 flex flex-col"
          onClick={() => setSelectedMovie(movie)}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-md w-full h-auto"
          />
          <h3 className="font-bold mt-2 text-center">{movie.title}</h3>
          <p className="text-sm text-center"><i>Release Date : </i>{movie.release_date}</p>
          <p className="text-sm text-center">Rate: {movie.vote_average.toFixed(2)}</p>
          <div className="mt-auto">
            <button
              className="bg-black text-white px-3 py-1 rounded mt-2 w-full"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMovie(movie);
              }}
            >
              Overview
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(movie);
              }}
              className={`w-full px-3 py-1 rounded mt-2 ${
                favorites.find((fav) => fav.id === movie.id)
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-300 text-black'
              }`}
            >
              {favorites.find((fav) => fav.id === movie.id) ? 'Remove Favorite' : 'Add to Favorite'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
export default MovieList;