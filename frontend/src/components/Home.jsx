import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import Filter from './Filter';
import MovieFrame from './MovieFrame';
import MovieModal from './MovieModal';
import { useParams } from 'react-router-dom';
import Carousel from './carousel';


const Home = ({
  filteredMovies,
  selectedMovie,
  watchLaterMovies,
  onSearch,
  onMovieClick,
  onAddToWatchLater,
  onRemoveFromWatchLater,
  genres,
  onFilterChange,
  currentGenre,
  handleGenreClick,
  selectedGenre,
  movies,
  onTabClick,
  movieCategories,
  selectedTab
}) => {
  const { genreId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const currentMovies = movieCategories[selectedTab] || []; 

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? currentMovies.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === currentMovies.length - 1 ? 0 : prev + 1));
  };
  
  useEffect(() => {
    if (genreId) {
      onFilterChange(Number(genreId));
    } else {
      onFilterChange(0);
    }
  }, [genreId, genres, onFilterChange]);

  return (
    <div >
      
      <div className='w-full overflow-hidden'>
        <Carousel movies={movieCategories['Trending']}/>
      </div>

      {/* Tab buttons - Always visible */}
      <div className="w-full overflow-hidden border-b border-gray-300 mt-6 mx-6">
        <div className="flex space-x-4 px-4 py-4 justify-center">
          {Object.keys(movieCategories).map((tab, i) => (
            <button
              key={i}
              className={`whitespace-nowrap px-4 py-2 rounded-full 
                        text-sm font-medium bg-gray-800 text-white border-2 
                        ${selectedTab === tab ? 'border-white' : 'border-transparent'} 
                        hover:bg-blue-500 hover:text-white 
                        transition-all duration-200`}
              onClick={() => onTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Movie content based on selected tab */}
      {currentMovies.length === 0 ? (
        <div className="flex justify-center items-center h-full w-full mb-6">
          <p className="text-white text-2xl">No such movie exists</p>
        </div>
      ) : (
        <>
          <div>
            <span className='text-white text-2xl p-6'>{selectedTab}</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-4 mb-6 px-6">
              {currentMovies.slice(0, 6).map((movie) => (
                <div key={movie.id}>
                  <MovieFrame
                    onClick={() => onMovieClick(movie)}
                    title={movie.title}
                    poster={movie.poster}
                    overview={movie.overview}
                    rating={movie.rating}
                    backdrop={movie.backdrop}
                  />
                </div>
              ))}
            </div>
          </div>

        </>
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => onMovieClick(null)}
          onAddToWatchLater={() => onAddToWatchLater(selectedMovie)}
          isInWatchLater={watchLaterMovies.some(m => m.id === selectedMovie.id)}
          onRemoveFromWatchLater={() => onRemoveFromWatchLater(selectedMovie.id)}
          similarMovies={similarMovies} // Pass similarMovies here
          genres={genres}
          handleGenreClick={handleGenreClick}
        />
      )}
    </div>
  );
};

export default Home; 