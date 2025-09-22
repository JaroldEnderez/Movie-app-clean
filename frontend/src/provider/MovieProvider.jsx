import React, { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [watchLaterMovies, setWatchLaterMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const addToWatchLater = (movie) => {
    setWatchLaterMovies((prev) =>
      prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]
    );
  };

  const removeFromWatchLater = (movieId) => {
    setWatchLaterMovies((prev) => prev.filter((m) => m.id !== movieId));
  };

  const toggleLike = (movie) => {
    setLikedMovies((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  return (
    <MovieContext.Provider
      value={{
        watchLaterMovies,
        addToWatchLater,
        removeFromWatchLater,
        likedMovies,
        toggleLike,
        selectedMovie,
        setSelectedMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
