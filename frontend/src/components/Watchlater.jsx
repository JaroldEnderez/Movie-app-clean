import React, { useState, useEffect } from 'react';
import MovieFrame from './MovieFrame';
import MovieModal from './MovieModal';

const Watchlater = ({
  watchLaterMovies,
  genres,
  handleGenreClick,
  onAddToWatchLater,
  onRemoveFromWatchLater,
}) => {
  const [moviesList, setMoviesList] = useState(watchLaterMovies || []);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Keep moviesList synced if watchLaterMovies prop changes
  useEffect(() => {
    setMoviesList(watchLaterMovies);
  }, [watchLaterMovies]);

  const handleRemove = (movie) => {
    onRemoveFromWatchLater(movie.id);
    setMoviesList((prev) => prev.filter((m) => m.id !== movie.id));
    setSelectedMovie(null); // close modal if open
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-3xl font-bold text-white mb-6">My Queued Movies</h2>

      {/* Empty state */}
      {moviesList.length === 0 ? (
        <div className="text-white text-xl text-center mt-20 flex flex-col items-center gap-4">
          <p>Go add some movies to your queue!</p>
          <button
            onClick={() => window.location.href = '/'} // or use useNavigate() if inside Router
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Browse Movies
          </button>
      </div>
    
      ) : (
        <>
          {/* Movie Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4">
            {moviesList.map((movie) => (
              <div key={movie.id}>
                <MovieFrame
                  onClick={() => setSelectedMovie(movie)}
                  title={movie.title}
                  poster={movie.poster}
                  overview={movie.overview}
                  rating={movie.rating}
                />
              </div>
            ))}
          </div>

          {/* Movie Modal */}
          {selectedMovie && (
            <MovieModal
              movie={selectedMovie}
              onClose={() => setSelectedMovie(null)}
              onAddToWatchLater={() => onAddToWatchLater(selectedMovie)}
              onRemoveFromWatchLater={() => handleRemove(selectedMovie)}
              isInWatchLater={moviesList.some((m) => m.id === selectedMovie.id)}
              genres={genres}
              handleGenreClick={handleGenreClick}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Watchlater;
