import React, { useState, useEffect } from "react";
import MovieImage from '../assets/Movie.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = ({ genres }) => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?img=12");
  const [preferredGenres, setPreferredGenres] = useState([]);
  const [likedMovies, setLikedMovies] = useState([
    "Inception",
    "The Matrix",
    "Parasite",
  ]);

  // Load preferred genres from DB on mount
  useEffect(() => {
    const fetchPreferredGenres = async () => {
      try {
        const res = await axios.get(`/api/users/${storedUser._id}/genres`);
        setPreferredGenres(res.data.preferredGenres);
      } catch (err) {
        console.error("Failed to fetch preferred genres", err);
      }
    };
    fetchPreferredGenres();
  }, [storedUser._id]);

  // Update avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Toggle genre selection
  const toggleGenre = async (genreName) => {
    const token = localStorage.getItem("token"); // get stored JWT
    try {
      if (preferredGenres.includes(genreName)) {
        // Remove genre
        await axios.delete('/api/users/genres', {
          data: { genre: genreName },
          headers: { Authorization: `Bearer ${token}` }
        });
        setPreferredGenres(preferredGenres.filter(g => g !== genreName));
      } else {
        // Add genre
        await axios.post('/api/users/genres', 
          { genre: genreName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPreferredGenres([...preferredGenres, genreName]);
      }
    } catch (err) {
      console.error("Failed to update preferred genres", err);
    }
  };
  

  return (
    <div
      className="relative bg-gray-800 p-6 min-h-screen flex justify-center items-start shadow-2xl"
      style={{
        backgroundImage: `url(${MovieImage})`,
        backgroundSize: 'cover',
        backgroundPosition:'center'
      }}
    >
      <div className='absolute inset-0 bg-black opacity-60'></div>
      <div className="w-full max-w-3xl bg-gray-600 rounded-2xl shadow-2xl p-6 text-white z-30">
        
        {/* Header */}
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <img
              src={avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-white"
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full cursor-pointer hover:bg-blue-700 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 13V16H7L16 7L13 4L4 13Z" />
              </svg>
            </label>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{storedUser.username}</h1>
            <p className="text-gray-300">{storedUser.email}</p>
            <p className="mt-1 text-sm text-blue-400">Premium Member</p>
          </div>
        </div>

        {/* Preferred Genres */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Preferred Genres</h2>
          <div className="flex gap-2 flex-wrap mb-2">
            {preferredGenres.map((genre) => (
              <div
                key={genre}
                className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                <span>{genre}</span>
                <div
                  onClick={() => toggleGenre(genre)}
                  className="text-blue-700 hover:text-red-600 font-bold bg-transparent cursor-pointer"
                >
                  ×
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {genres.map((g) => (
              <label
                key={g.id}
                className="flex items-center gap-2 p-2 border rounded hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={g.name}
                  className="w-4 h-4 accent-blue-500"
                  checked={preferredGenres.includes(g.name)}
                  onChange={() => toggleGenre(g.name)}
                />
                <span>{g.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Liked Movies */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Liked Movies</h2>
          <div className="flex gap-4 flex-wrap">
            {likedMovies.map((movie) => (
              <div
                key={movie}
                className="bg-gray-200 text-gray-800 rounded-lg p-3 w-32 text-center font-medium"
              >
                {movie}
              </div>
            ))}
          </div>
        </div>

        {/* Change Password */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
          <button
            className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
            onClick={() => navigate("/change-password")}
          >
            Change Password
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
