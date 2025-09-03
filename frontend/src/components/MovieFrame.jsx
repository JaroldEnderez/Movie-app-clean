import React, { useState } from 'react';

const MovieFrame = ({ title, poster, overview, rating, onClick, backdrop }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='w-60 bg-black p-1 cursor-pointer rounded-xl'
    onClick={onClick}>
      <div 
      className='relative max-w-sm rounded-lg overflow-hidden transition-all duration-800 '
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} 
    >
      <img className="w-full h-80" src={poster} alt="Movie Poster" />
      {isHovered && (
        <div className="absolute inset-0 bg-gray-900/60 flex justify-center items-center">
          <p className="text-center">{overview}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default MovieFrame;