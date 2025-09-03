import React from 'react'
import MovieFrame from './MovieFrame'

const Watchlater = ({ watchLaterMovies}) => {

  console.log(watchLaterMovies)
  return (
    <div className='p-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 '>
        {watchLaterMovies.map((movie) => (
          <div
          key={movie.id}
        >
          <MovieFrame
            onClick={() => onMovieClick(movie)}
            title={movie.title}
            poster={movie.poster}
            overview={movie.overview}
            rating={movie.rating}
          />
        </div>
        ))}
      </div>
    </div>
  )
}

export default Watchlater
