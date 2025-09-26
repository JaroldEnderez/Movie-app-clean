import React, { useState } from 'react';
import MovieModal from './MovieModal';

const MovieFrame = ({
  movie,
  onClick,
  onAddToWatchLater,
  onRemoveFromWatchLater,
  watchLaterMovies,
  genres,
  handleGenreClick
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isInWatchLater = Array.isArray(watchLaterMovies)
  ? watchLaterMovies.some((m) => m.id === movie.id)
  : false;

  return (
    <>
      {/* Movie Card */}
      <div
        className="w-full sm:w-60 bg-black p-1 cursor-pointer rounded-xl"
        onClick={onClick}
      >
        <div
          className="relative rounded-lg overflow-hidden transition-all duration-800 aspect-[2/3]"
        >
          <img className="w-full h-full object-cover hover:brightness-75" src={movie.poster} alt={movie.title} />
        </div>
      </div>

      {/* Movie Modal */}
      
    </>
  );
};

export default MovieFrame;
