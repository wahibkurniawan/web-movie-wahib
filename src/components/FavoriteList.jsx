const FavoriteList = ({ favorites, setSelectedMovie, toggleFavorite }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Favorite Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
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
              <p className="text-sm text-center">
                <i>Release Date: </i>
                {movie.release_date}
              </p>
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
                    toggleFavorite(movie); // Remove from favorites
                  }}
                  className="w-full px-3 py-1 rounded mt-2 bg-red-500 text-white"
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">You have no favorite movies.</p>
        )}
      </div>
    </div>
  );
}
export default FavoriteList;