import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import api from "../api";

export default function WatchMoviePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(location.state?.movie || null);
  const [genres, setGenres] = useState(location.state?.genres || []);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(!location.state?.movie);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!movie) {
          setLoading(true);
          const [{ data: movieRes }, { data: genresRes }] = await Promise.all([
            api.get(`/api/movies/${id}`),
            api.get(`/api/movies/genres`),
          ]);
          setMovie(movieRes.data);
          setGenres(genresRes.data);
        }
        const { data: videosRes } = await api.get(`/api/movies/${id}/videos`);
        setVideos(videosRes.data || []);
      } catch (err) {
        setError("Failed to load movie.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const youtubeTrailerKey = useMemo(() => {
    const ytVideos = videos.filter(v => v.site === "YouTube");
    const trailer = ytVideos.find(v => v.type === "Trailer") || ytVideos[0];
    return trailer?.key;
  }, [videos]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>{error || "Movie not found."}</p>
      </div>
    );
  }

  return (
    <div className="relative bg-black p-6 min-h-screen flex justify-center items-start shadow-2xl">
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="relative w-full max-w-5xl bg-gray-900 rounded-2xl shadow-2xl p-6 text-white z-30">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center font-bold z-50"
        >
          ×
        </button>

        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

        <div className="w-full aspect-video bg-black rounded-lg flex items-center justify-center mb-6 overflow-hidden">
          {youtubeTrailerKey ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeTrailerKey}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <img
              src={movie.backdrop || movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <p className="mb-4 text-gray-200">{movie.overview}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {(movie.genre_ids ? movie.genre_ids.map(id => genres.find(g => g.id === id)?.name).filter(Boolean) : movie.genres?.map(g => g.name) || []).map((name, idx) => (
            <span key={idx} className="bg-gray-700 text-sm px-2 py-1 rounded-full">{name}</span>
          ))}
        </div>
        <div className="text-sm text-gray-300 space-x-4">
          {movie.release_date && <span>Release: {movie.release_date}</span>}
          {movie.runtime && <span>Runtime: {movie.runtime}m</span>}
          {movie.rating && <span>Rating: {parseFloat(movie.rating).toFixed(1)}</span>}
        </div>
      </div>
    </div>
  );
}
