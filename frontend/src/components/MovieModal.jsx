import React, {useEffect, useRef} from 'react';

const MovieModal = ({ movie, onClose, onAddToWatchLater, isInWatchLater, onRemoveFromWatchLater, recommendations, genres, handleGenreClick, similarMovies }) => {
  if (!movie) return null;
  const modalRef = useRef(null)

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
      <div className="bg-gray-900 rounded-lg p-6 max-w-1/2 relative overflow-y-auto flex max-h-140 shadow-2xl ring-1 ring-white/10 " ref={modalRef}>
        <div className="absolute top-3 right-3 bg-gray-800 hover:bg-gray-600 rounded-full p-2 cursor-pointer" onClick={onClose}>✕</div>
          <div className='w-full h-full'>
            <div className="rounded-lg border border-purple-500 shadow-[0_0_8px_2px_rgba(128,0,128,0.4)] w-80 h-100 overflow-hidden">
              <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover rounded mx-auto"/>
            </div>
            
          </div>
        <div className='px-4 w-full'>
          <h2 className="text-white text-2xl font-bold mb-2 text-center">{movie.title}</h2>
          <div className="flex flex-wrap  gap-2 mb-2 mt-4 items-center">
              <div className={`rounded-full p-2 text-white flex items-center gap-1 w-fit px-4 ${movie.rating >= 7 ? 'bg-green-600': movie.rating >= 5 ? 'bg-yellow-600' : 'bg-red-600'}`}>
                <span>⭐</span>
                <span >{parseFloat(movie.rating).toFixed(2)} ({movie.vote_count})</span>
              </div>
              {movie.genre_ids && genres && movie.genre_ids.map((genreId,index) => {
                const genre = genres.find(g=> g.id === genreId)
                const isLast = index === movie.genre_ids.length - 1;
                return genre ? (
                  <span key={genre.id} className='cursor-pointer bg-gray-700 text-sm px-2 py-1 rounded-full mr-2' onClick={() => {handleGenreClick(genre.id); onClose()}}>{genre.name}</span>
                ) : null
              })}
            </div>
            <div className="max-h-40 overflow-y-auto pr-2 text-lg text-gray-300">
              {movie.overview}
            </div>
            <div className="flex flex-col gap-3 mt-4">
  {/* Watch Now + Like Button */}
            <div className="flex items-center gap-3">
              <div className="text-center cursor-pointer flex-1 bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg">
                Watch Now
              </div>
              <div className="bg-black hover:bg-gray-700 p-2 rounded-xl cursor-pointer">
                ❤️
              </div>
            </div>

            {/* Watch Later Button */}
            <div
              className={`w-full p-2 px-4 text-l text-white font-bold text-center cursor-pointer rounded-lg hover:bg-y-700 ${
                isInWatchLater ? 'bg-red-600' : 'bg-black'
              }`}
              onClick={() => {
                if (isInWatchLater) {
                  onRemoveFromWatchLater(movie);
                  // close modal immediately if you want
                } else {
                  onAddToWatchLater(movie);
                }
              }}
            >
              {isInWatchLater ? 'Remove from Watch Later' : 'Add to Watch Later'}
            </div>
          </div>
        </div>

        {similarMovies && similarMovies.length > 0 && (
          <div className="mt-4 ml-4">
            <h3 className="text-white text-lg mb-2">Similar Movies</h3>
            <div className="flex flex-wrap gap-2">
              {similarMovies.map(similarMovie => (
                <div key={similarMovie.id} className="bg-gray-800 rounded p-2 w-32 text-center cursor-pointer" onClick={() => {
                  onClose(); // Close current modal
                  // Optionally, you might want to open a new modal for the similar movie
                  // This would require passing a function to handle opening a new modal
                  // For now, it just closes the current one.
                }}>
                  <img src={similarMovie.poster} alt={similarMovie.title} className="w-full h-24 object-cover rounded mb-1" />
                  <span className="text-white text-xs">{similarMovie.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Removed recommendations section as similar movies will replace it */}
      </div>
    </div>
  );
};

export default MovieModal; 