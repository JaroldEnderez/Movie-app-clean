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
  selectedTab,
  searchQuery,
  searchResults,
  closeModal
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

  const moviesToDisplay = searchQuery
    ? searchResults
    : (movieCategories[selectedTab] || []).filter(movie => {
        if (selectedGenre === 0) return true; // "All genres"
        return movie.genre_ids.includes(selectedGenre);
      });

  return (
    <div>
      {/* Carousel */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={closeModal} // function to clear selectedMovie
          onAddToWatchLater={() => onAddToWatchLater(selectedMovie)}
          onRemoveFromWatchLater={() => onRemoveFromWatchLater(selectedMovie.id)}
          isInWatchLater={watchLaterMovies.some(m => m.id === selectedMovie.id)}
          genres={genres}
          handleGenreClick={handleGenreClick}
        />
      )}
      <div className="w-full overflow-hidden">
        <Carousel movies={movieCategories['Trending']} selectedMovie={selectedMovie} onMovieClick={onMovieClick}/>
      </div>

      {/* Tabs + Search + Filter */}
      <div className="w-full overflow-hidden border-b border-gray-300 mt-6 mb-4">
        <div className="flex justify-between flex-wrap">
          {/* Tabs */}
          <div className="flex space-x-4 px-4 py-4 flex-wrap">
            {Object.keys(movieCategories).map((tab, i) => (
              <div
                key={i}
                className={`whitespace-nowrap px-4 py-2 rounded-full 
                  text-sm font-medium border-2 cursor-pointer
                  ${selectedTab === tab 
                      ? 'bg-white text-black border-white' 
                      : 'bg-gray-800 text-white border-transparent '} 
                  transition-all duration-200`}
                onClick={() => onTabClick(tab)}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Search + Filter */}
          <div className="flex flex-wrap items-center gap-4 px-4 py-4">
            <SearchBar onSearch={onSearch} />
            <div className="flex items-center gap-2">
              <h4 className="p-2">Filter by genre:</h4>
              <Filter genres={genres} onFilterChange={onFilterChange} selectedGenre={selectedGenre} />
            </div>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
        {moviesToDisplay.length === 0 ? (
          <div className="flex justify-center items-center h-full w-full mb-6">
            <p className="text-white text-2xl">
              {searchQuery ? 'No matching movies found' : 'No movies in this category'}
            </p>
          </div>
        ) : (
          <div className="mb-6">
            <div className='flex justify-between items-center w-full px-6'>
              <span className="text-white text-2xl">
              {searchQuery ? (
                  `Search Results for "${searchQuery}"`
                ) : selectedTab === "All Movies" ? (
                  selectedGenre && selectedGenre !== 0
                    ? `All ${genres.find(g => g.id === selectedGenre)?.name || ''} Movies`
                    : "All Movies"
                ) : (
                  ` ${selectedTab}${
                    selectedGenre && selectedGenre !== 0
                      ? ` for ${genres.find(g => g.id === selectedGenre)?.name || ''}`
                      : ""
                  }`
                )}

              </span>
            </div>
          {/* Show first 24 movies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6 px-6 mt-4">
              {moviesToDisplay.slice(0, 24).map((movie) => (
                <MovieFrame
                  key={movie.id}
                  onClick={() => onMovieClick(movie)}
                  movie={movie}
                  onAddToWatchLater={() => onAddToWatchLater(movie)}
                  onRemoveFromWatchLater={() => onRemoveFromWatchLater(movie.id)}
                  genres={genres}
                  watchLaterMovies={watchLaterMovies}
                  handleGenreClick={handleGenreClick}
                />
              ))}
            </div>

            {/* Show See All button only if movies exceed 24 */}
            {moviesToDisplay.length > 24 && (
              <div className="flex justify-center items-center">
                <span
                  onClick={() => navigate(`/movies/${selectedTab.toLowerCase()}`)}
                  className="text-2xl underline cursor-pointer pr-4 hover:text-gray-300"
                >
                  See all →
                </span>
              </div>
            )}
        </div>
        
      )}
    </div>
  );
};

export default Home; 