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
        <div className="absolute top-2 right-2 text-white text-xl  flex flex-col border-none cursor-pointer" onClick={onClose}>&times;</div>
          <div className='w-full h-full'>
            <div className="rounded-lg border border-purple-500 shadow-[0_0_8px_2px_rgba(128,0,128,0.4)] w-80 h-100 overflow-hidden">
              <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover rounded mx-auto"/>
            </div>
            
          </div>
        <div className='px-4 w-full'>
          <h2 className="text-white text-2xl font-bold mb-2 text-center">{movie.title}</h2>
          <div className="flex flex-wrap  gap-2 mb-2 mt-4 items-center">
              <div className='rounded-full p-2 bg-black text-white flex items-center gap-1 w-fit px-4 '>
                <span>⭐</span>
                <span>{parseFloat(movie.rating).toFixed(2)}</span>
              </div>
              {movie.genre_ids && genres && movie.genre_ids.map((genreId,index) => {
                const genre = genres.find(g=> g.id === genreId)
                const isLast = index === movie.genre_ids.length - 1;
                return genre ? (
                  <span key={genre.id} className='cursor-pointer rounded-lg italic text-sm underline' onClick={() => {handleGenreClick(genre.id); onClose()}}>{genre.name}{!isLast && ','}</span>
                ) : null
              })}
            </div>
            <div className="max-h-52 overflow-y-auto pr-2 text-sm text-gray-300">
              {movie.overview}
            </div>
          <div className="flex flex-col justify-center gap-4 mb-4 mt-4 items-center">
            <div className='p-2 px-4 text-l text-white bg-black font-bold cursor-pointer rounded-lg ' onClick={() => isInWatchLater ? onRemoveFromWatchLater(movie) : onAddToWatchLater(movie)}>
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