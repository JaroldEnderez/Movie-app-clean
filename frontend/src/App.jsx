import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Watchlater from './components/Watchlater';
import Footer from './components/Footer'; // Import the Footer component
import axios from 'axios';
import Login from './pages/Login'; // Import the Login component
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import ProfilePage from './pages/Profile';
import ChangePasswordPage from './pages/Password';
import api from "./api";
export const AuthContext = React.createContext(null); // Create AuthContext

const getAuthToken = () => localStorage.getItem('token'); // Helper to get token

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchLaterMovies, setWatchLaterMovies] = useState([]);
  const [currentGenre, setCurrentGenre] = useState(null);
  const [browsedMovies, setBrowsedMovies] = useState([]);
  const [selectedTab, setSelectedTab] = useState('All Movies');
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // New state for login status
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const location = useLocation(); // Get current location
  const navigate = useNavigate(); // Initialize navigate
  const hideNavAndFooter = location.pathname === '/login'; // Check if current path is /login

  // Check login status on app load/reload
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  // Load movies and genres (mocked)
  useEffect(() => {
    const fetchMovies =  async() => {
      try{
        const response = await api.get('/api/movies')
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
          release_date: movie.release_date,
          vote_count: movie.vote_count
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
        const response = await api.get('/api/movies/genres')
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

  useEffect(() => {
    console.log("Selected Movie: ", selectedMovie)
  }, [selectedMovie])
  // Load watchLaterMovies from localStorage (logged in) or sessionStorage (not logged in)
  useEffect(() => {
    if (isLoggedIn) {
      const saved = JSON.parse(localStorage.getItem('watchLater'));
      if (saved) setWatchLaterMovies(saved);
    } else {
      const savedTemp = JSON.parse(sessionStorage.getItem('watchLaterTemp'));
      if (savedTemp) setWatchLaterMovies(savedTemp);
    }
  }, [isLoggedIn]); // Re-run when login status changes

  // Save watchLaterMovies to localStorage (logged in) or sessionStorage (not logged in)
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('watchLater', JSON.stringify(watchLaterMovies));
    } else {
      sessionStorage.setItem('watchLaterTemp', JSON.stringify(watchLaterMovies));
    }
  }, [watchLaterMovies, isLoggedIn]); // Re-run when watchLaterMovies or login status changes
  const handleSearch = (query) => {
    setSearchQuery(query);
  
    if (!query) {
      setSearchResults([]);
      return;
    }
  
    const queryWords = query.toLowerCase().trim().split(/\s+/);
  
    const results = movies.filter((movie) => {
      const titleWords = movie.title.toLowerCase().split(/\s+/);
  
      // Check if all query words appear in order in the title words
      let titleIndex = 0;
      return queryWords.every((qWord) => {
        while (titleIndex < titleWords.length && !titleWords[titleIndex].startsWith(qWord)) {
          titleIndex++;
        }
        return titleIndex < titleWords.length;
      });
    });
  
    setSearchResults(results);
  };
  


  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setBrowsedMovies([...browsedMovies, movie])
    console.log("Movie clicked:", movie);

  };
  const closeModal = () => setSelectedMovie(null);

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
      const updatedWatchLater = [...watchLaterMovies, movie];
      setWatchLaterMovies(updatedWatchLater);

      if (isLoggedIn) {
        // Save to backend via API
        const token = getAuthToken();
        if (token) {
          axios.post('/api/users/favorites', { movieId: movie.id }, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(response => {
            console.log('Movie added to favorites in backend:', response.data);
          })
          .catch(error => {
            console.error('Failed to add movie to favorites in backend:', error);
            // Optionally revert local state or show error
          });
        }
        // The useEffect for saving will handle localStorage
      } else {
        // For non-logged-in users, the useEffect will handle sessionStorage
        // Optionally, show a prompt: "Log in to save permanently!" - will be added later if user requests
      }
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
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="flex flex-col min-h-screen">
        {!hideNavAndFooter && (
          <Navbar
            onHomeClick={handleHomeClick}
            onSearch={handleSearch}
            genres={genres}
            onFilterChange={handleGenreClick}
            selectedGenre={selectedGenre}
          />
        )}

        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  filteredMovies={filteredMovies}
                  selectedMovie={selectedMovie}
                  watchLaterMovies={watchLaterMovies}
                  onSearch={handleSearch}
                  closeModal={closeModal}
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
                  similarMovies={similarMovies}
                  searchQuery={searchQuery}
                  searchResults={searchResults}
                />
              }
            />
            <Route
              path="/watch-later"
              element={
                <ProtectedRoute>
                  <Watchlater watchLaterMovies={watchLaterMovies} />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" 
              element={
              <ProtectedRoute>
                <ProfilePage genres={genres}/>
              </ProtectedRoute>
              } />
            <Route path="/change-password" element={<ChangePasswordPage/>} />
          </Routes>
        </div>

        {!hideNavAndFooter && <Footer />}
      </div>

      </AuthContext.Provider>
  );
}

export default App; 