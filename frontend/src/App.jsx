import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Watchlater from './components/Watchlater';
import Footer from './components/Footer'; // Import the Footer component
import axios from 'axios';
import Login from './pages/Login'; // Import the Login component

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchLaterMovies, setWatchLaterMovies] = useState([]);
  const [currentGenre, setCurrentGenre] = useState(null);
  const [browsedMovies, setBrowsedMovies] = useState([]);
  const [selectedTab, setSelectedTab] = useState('All Movies')
  const [similarMovies, setSimilarMovies] = useState([]); // New state for similar movies
  
  const location = useLocation(); // Get current location
  const hideNavAndFooter = location.pathname === '/login'; // Check if current path is /login

  // Load movies and genres (mocked)
  useEffect(() => {
    const fetchMovies =  async() => {
      try{
        const response = await axios.get('/api/movies')
        const movies = response.data.data
        const movieData = movies.map((movie) => ({
          title: movie.title,
          poster: movie.poster,
          id: movie.id,
          rating: movie.vote_average,
          overview: movie.overview,
          genre_ids: movie.genre_ids,
          backdrop: movie.backdrop,
          popularity: movie.popularity,
          vote_average: movie.vote_average,
          release_date: movie.release_date
        }))
        setMovies(movieData)
        setFilteredMovies(movieData)
        console.log(movies)
        
      }catch (error){
        console.error("Error fetching movies!", error)
      }
    }

    const fetchGenres =  async() => {
      try{
        const response = await axios.get('/api/movies/genres')
        const genres = response.data.data
        const genreData = genres.map((genre) => ({
          id: genre.id,
          name: genre.name
        }))
        setGenres(genreData)

        console.log("genres:",genres)
      }catch (error){
        console.error("Error fetching movies!", error)
      }
    }


    fetchMovies()
    fetchGenres()
  }, []);


  // Load watchLaterMovies from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('watchLater'));
    if (saved) setWatchLaterMovies(saved);
  }, []);

  // Save watchLaterMovies to localStorage
  useEffect(() => {
    localStorage.setItem('watchLater', JSON.stringify(watchLaterMovies));
  }, [watchLaterMovies]);

  const handleSearch = (query) => {
    if (query === '') {
      if (selectedGenre === 0) {
        setFilteredMovies(movies);
      } else {
        const moviesByGenre = movies.filter((movie) => movie.genre_ids.includes(selectedGenre));
        setFilteredMovies(moviesByGenre);
      }
    } else {
      let moviesToFilter = movies;
      if (selectedGenre !== 0) {
        moviesToFilter = movies.filter((movie) => movie.genre_ids.includes(selectedGenre));
      }
      setFilteredMovies(
        moviesToFilter.filter((movie) =>
          movie.title.toLowerCase().split(" ").some(word => word.startsWith(query.toLowerCase()))
        )
      );
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setBrowsedMovies([...browsedMovies, movie])
  };

  const handleGenreClick = useCallback((genreId) => {
    setSelectedGenre(Number(genreId));
    if (Number(genreId) === 0) {
      setFilteredMovies(movies);
      setCurrentGenre({ id: 0, name: '' });
      return;
    }
    const chosenGenre = genres.find((genre) => genre.id === Number(genreId));
    setCurrentGenre(chosenGenre);
    const moviesByGenre = movies.filter((movie) => movie.genre_ids.includes(Number(genreId)));
    setFilteredMovies(moviesByGenre);
  }, [movies, genres]);

  const handleAddToWatchLater = (movie) => {
    if (!watchLaterMovies.some(m => m.id === movie.id)) {
      setWatchLaterMovies([...watchLaterMovies, movie]);
    }
  };

  const handleRemoveFromWatchLater = (movieId) => {
    setWatchLaterMovies(watchLaterMovies.filter(movie => movie.id !== movieId));
  };

  const handleHomeClick = () => {
    setSelectedGenre(0);
    setFilteredMovies(movies);
    setSelectedMovie(null);
    setCurrentGenre({ id: 0, name: '' });
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab)
    console.log("Selected Tab: ",tab)
  }

  const movieCategories = {
    "All Movies": movies,
  
    "New Releases": movies.filter(
      movie =>
        new Date(movie.release_date) >=
        new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) // last 60 days
    ),
  
    "Trending": [...movies]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 20), // top 20 trending by popularity
  
    "Top Rated": [...movies]
      .sort((a, b) => b.vote_average - a.vote_average)
      .slice(0, 20) // top 20 highest rated
  };
  

  return (
    <div className="w-screen pb-20"> {/* Added padding-bottom here */}
      
        {!hideNavAndFooter && (
          <Navbar onHomeClick={handleHomeClick} onSearch={handleSearch} genres={genres} onFilterChange={handleGenreClick} selectedGenre={selectedGenre}/>
        )}
        <Routes>
          <Route path="/" element={
            <Home
              filteredMovies={filteredMovies}
              selectedMovie={selectedMovie}
              watchLaterMovies={watchLaterMovies}
              onSearch={handleSearch}
              onMovieClick={handleMovieClick}
              onAddToWatchLater={handleAddToWatchLater}
              onRemoveFromWatchLater={handleRemoveFromWatchLater}
              genres={genres}
              onFilterChange={handleGenreClick}
              currentGenre={currentGenre}
              recommendedMovies={[]}
              handleGenreClick={handleGenreClick}
              selectedGenre={selectedGenre}
              movies={movies}
              movieCategories={movieCategories}
              selectedTab={selectedTab}
              onTabClick={handleTabClick}
              similarMovies={similarMovies} // Pass similarMovies here
            />} 
          />
          <Route path="/watch-later" element={
            <Watchlater 
              watchLaterMovies={watchLaterMovies} 
            />
          } />
          <Route path="/login" element={
            <Login />
          } />
        </Routes>
        {!hideNavAndFooter && <Footer />} {/* Render the Footer component here */}
        </div>
  );
}

export default App; 