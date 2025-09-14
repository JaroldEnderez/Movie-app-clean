import React, {useEffect, useRef} from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MovieModal = ({ movie, onClose, onAddToWatchLater, isInWatchLater, onRemoveFromWatchLater, recommendations, genres, handleGenreClick, similarMovies }) => {
  if (!movie) return null;
  const modalRef = useRef(null)
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate()

  const handleClick = async () => {
    setLiked(!liked); // toggle UI
    setAnimating(true); // trigger animation
    setTimeout(() => setAnimating(false), 200); // reset animation

    try {
      if (!liked) {
        // Add to liked movies in DB
        await axios.post(
          '/api/users/favorites',
          { movieId },
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
      } else {
        // Optionally remove if unliking
        await axios.delete('/api/users/favorites', {
          headers: { Authorization: `Bearer ${userToken}` },
          data: { movieId },
        });
      }
    } catch (err) {
      console.error('Failed to update liked movies', err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }
      document.addEventListener('mousedown', handleClickOutside)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-gray-800/90 flex items-center justify-center z-50" >
      <div
        className="bg-gray-900 rounded-lg p-4 sm:p-6 w-full max-w-full sm:max-w-3xl relative 
                  overflow-y-auto flex flex-col sm:flex-row max-h-[90vh] shadow-2xl ring-1 ring-white/10"
        ref={modalRef}
      >
        {/* Close button */}
        <div
          className="absolute top-3 right-3 bg-gray-800 hover:bg-gray-600 rounded-full p-2 cursor-pointer z-50"
          onClick={onClose}
        >
          ✕
        </div>

        {/* Movie Poster */}
        <div className="w-full sm:w-1/3 flex justify-center items-center mb-4 sm:mb-0">
          <div className="rounded-lg border border-purple-500 shadow-[0_0_8px_2px_rgba(128,0,128,0.4)] 
                          w-full max-w-[250px] h-64 sm:h-80 overflow-hidden">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover rounded mx-auto"
            />
          </div>
        </div>

        {/* Movie Details */}
        <div className="px-2 sm:px-4 w-full sm:w-2/3">
          <h2 className="text-white text-xl sm:text-2xl font-bold mb-2 text-center sm:text-left">
            {movie.title}
          </h2>

          {/* Rating + Genres */}
          <div className="flex flex-wrap gap-2 mb-2 mt-4 items-center justify-center sm:justify-start">
            <div
              className={`rounded-full p-2 text-white flex items-center gap-1 w-fit px-4 
              ${movie.rating >= 7 ? "bg-green-600" : movie.rating >= 5 ? "bg-yellow-600" : "bg-red-600"}`}
            >
              <span>⭐</span>
              <span>{parseFloat(movie.rating).toFixed(2)} ({movie.vote_count})</span>
            </div>
            {movie.genre_ids &&
              genres &&
              movie.genre_ids.map((genreId, index) => {
                const genre = genres.find((g) => g.id === genreId);
                return genre ? (
                  <span
                    key={genre.id}
                    className="cursor-pointer bg-gray-700 text-xs sm:text-sm px-2 py-1 rounded-full"
                    onClick={() => {
                      handleGenreClick(genre.id);
                      onClose();
                    }}
                  >
                    {genre.name}
                  </span>
                ) : null;
              })}
          </div>

          {/* Overview */}
          <div className="max-h-32 sm:max-h-40 overflow-y-auto pr-2 text-sm sm:text-base text-gray-300">
            {movie.overview}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div
                className="text-center cursor-pointer flex-1 bg-green-400 hover:bg-green-500 
                          text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => navigate(`/watch/${movie.id}`, { state: { movie, genres } })}
              >
                Watch Now
              </div>
              <div
                className={`bg-black hover:bg-gray-700 p-2 rounded-xl cursor-pointer transition-transform duration-200 
                            ${animating ? "scale-125" : ""}`}
                onClick={handleClick}
              >
                {liked ? "❤️" : "🤍"}
              </div>
            </div>

            <div
              className={`w-full p-2 px-4 text-sm sm:text-base text-white font-bold text-center cursor-pointer rounded-lg 
                        ${isInWatchLater ? "bg-red-600" : "bg-black"} hover:bg-gray-700`}
              onClick={() => {
                if (isInWatchLater) {
                  onRemoveFromWatchLater(movie);
                } else {
                  onAddToWatchLater(movie);
                }
              }}
            >
              {isInWatchLater ? "Remove from Watch Later" : "Add to Watch Later"}
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        {similarMovies && similarMovies.length > 0 && (
          <div className="mt-4 sm:mt-6 w-full">
            <h3 className="text-white text-lg mb-2">Similar Movies</h3>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {similarMovies.map((similarMovie) => (
                <div
                  key={similarMovie.id}
                  className="bg-gray-800 rounded p-2 w-28 sm:w-32 text-center cursor-pointer"
                  onClick={() => {
                    onClose();
                  }}
                >
                  <img
                    src={similarMovie.poster}
                    alt={similarMovie.title}
                    className="w-full h-24 object-cover rounded mb-1"
                  />
                  <span className="text-white text-xs">{similarMovie.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default MovieModal; 