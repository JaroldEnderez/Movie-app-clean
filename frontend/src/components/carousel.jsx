import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = ({ movies }) => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full h-[75vh] overflow-hidden rounded-lg">
        {movies.length > 0 && (
          <div className='w-full h-full '>
              <img
                src={movies[index].backdrop}
                alt={movies[index].title}
                className="w-full h-full"
              />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8),rgba(0,0,0,0.3),transparent),linear-gradient(to_right,rgba(0,0,0,0.6),rgba(0,0,0,0.3),transparent)]"></div>
              <div className='absolute top-0 left-0 p-4'><h2 className='text-xl shadow-xl text-white font-semibold'>What's hot right now: </h2></div>
              <div className='flex absolute bottom-0 left-0 p-4 items-end'>
                <img src={movies[index].poster}  alt={movies[index].title} className='w-32 md:w-40 lg:w-48 object-contain rounded-lg shadow-lg' />
                <div className='m-6 mb-0 pb-4'>
                    <div className='rounded-full p-2 bg-black text-white flex items-center gap-1 w-fit px-4 mb-2 border border-white'>
                      <span>⭐</span>
                      <span>{parseFloat(movies[index].rating).toFixed(2)}</span>
                    </div>
                    <p className="text-white font-semibold text-sm md:text-base">{movies[index].overview}</p>
                  </div>
              </div>
              <div className='absolute top-0 left-0 p-4'><h2 className='text-xl shadow-xl text-white font-semibold'>What's hot right now: </h2></div>

          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-4">
    {/* Previous Button */}
        <button
          onClick={prevSlide}
          className=" text-white rounded-full transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Ellipsis / Dots */}
        <div className="flex items-center gap-2 text-white">
          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
          <span className="w-2 h-2 rounded-full bg-white"></span>
          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className=" text-white rounded-full transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
