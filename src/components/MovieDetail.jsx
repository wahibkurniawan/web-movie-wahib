const MovieDetail = ({ movie, clearSelection }) => {
  return (
    <div className="p-4">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
        className="rounded-md w-full h-auto"
      />
      <h2 className="text-2xl font-bold mt-4">{movie.title}</h2>
      <p className="mt-2">{movie.overview}</p>
      <button
        onClick={clearSelection}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Back
      </button>
    </div>
  );
}
export default MovieDetail;