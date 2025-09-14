import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MovieImage from "../assets/movie.png"; // replace with your own image
import { useParams } from "react-router-dom";

export default function WatchMoviePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation()
  const {movie, genres} = location.state || {}
  // Mock movie data

  return (
    <div
      className="relative bg-gray-800 p-6 min-h-screen flex justify-center items-start shadow-2xl"
      style={{
        backgroundImage: `url(${MovieImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-4xl bg-gray-900 rounded-2xl shadow-2xl p-6 text-white z-30">
        {/* Close button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center font-bold z-50"
        >
          ×
        </button>

        {/* Movie Title */}
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

        {/* Video placeholder */}
        <div className="w-full aspect-video bg-black rounded-lg flex items-center justify-center mb-6">
          <span className="text-gray-400 text-lg">[ Video Player Placeholder ]</span>
        </div>

        {/* Movie Details */}
        <p className="mb-4">{movie.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genre_ids && genres && movie.genre_ids.map((genreId,index) => {
              const genre = genres.find(g=> g.id === genreId)
              const isLast = index === movie.genre_ids.length - 1;
              return genre ? (
                <span key={genre.id} className='cursor-pointer bg-gray-700 text-sm px-2 py-1 rounded-full mr-2' onClick={() => {handleGenreClick(genre.id); onClose()}}>{genre.name}</span>
              ) : null
            })}
        </div>
        <p className="text-sm text-gray-300">Release Date: {movie.releaseDate}</p>
        <p className="text-sm text-gray-300">Rating: {movie.rating}</p>
      </div>
    </div>
  );
}
