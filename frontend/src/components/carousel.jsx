import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieFrame from "./MovieFrame";

const Carousel = ({ 
  movies,
  onAddToWatchLater, 
  onRemoveFromWatchLater,
  watchLaterMovies,
  handleGenreClick
}) => {
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // NEW
  const carouselRef = useRef(null);

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  }, [movies.length]);

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  }, [movies.length]);

  useEffect(() => {
    if (!movies || movies.length === 0 || isModalOpen) return; // ⛔ stop loop when modal open

    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [movies, nextSlide, isModalOpen]);

  if (!movies || movies.length === 0) {
    return (
      <div className="text-white text-center p-4">
        No movies to display in carousel.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div
        ref={carouselRef}
        className="relative w-full h-[75vh] overflow-hidden rounded-lg"
      >
        <div
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="w-full flex-shrink-0 h-full relative group"
            >
              <img
                src={movie.backdrop}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8),rgba(0,0,0,0.3),transparent),linear-gradient(to_right,rgba(0,0,0,0.6),rgba(0,0,0,0.3),transparent)]"></div>
              {/* Top Banner */}
              <div className="absolute top-0 left-0 p-4 z-20">
                <h2 className="text-xl shadow-xl text-white font-semibold">
                  What's hot right now:
                </h2>
              </div>
              
              <div className="flex absolute bottom-0 left-6 p-4 items-end z-40 gap-6">
                <MovieFrame
                  key={movie.id}
                  movie={movie}
                  onAddToWatchLater={() => onAddToWatchLater(movie)}
                  onRemoveFromWatchLater={() => onRemoveFromWatchLater(movie.id)}
                  watchLaterMovies={watchLaterMovies}
                  handleGenreClick={handleGenreClick}
                  setIsModalOpen={setIsModalOpen} // pass setter
                  className="w-[200px] h-[320px] flex-shrink-0"
                />
                <div className="m-6 mb-0 pb-4 flex-1">
                  <div className="rounded-full p-2 bg-black text-white flex items-center gap-1 w-fit px-4 mb-2 border border-white">
                    <span>⭐</span>
                    <span>{parseFloat(movie.rating).toFixed(2)} / 10</span>
                  </div>
                  <p className="text-white font-semibold text-sm md:text-base line-clamp-3">
                    {movie.overview}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div
          onClick={prevSlide}
          className="absolute inset-y-0 left-0 flex items-center text-white opacity-0 bg-transparent hover:opacity-100 transition-opacity duration-300 z-50 cursor-pointer"
        >
          <ChevronLeft className="w-8 h-8" />
        </div>

        <div
          onClick={nextSlide}
          className="absolute inset-y-0 right-4 flex items-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300 z-50 cursor-pointer"
        >
          <ChevronRight className="w-8 h-8" />
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-2 text-white">
          {movies.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-white" : "bg-gray-400"
              } cursor-pointer`}
              onClick={() => setIndex(i)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
