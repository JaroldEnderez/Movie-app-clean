import React, { useState } from "react";
import MovieImage from '../assets/Movie.png'; // Import the image
import Filter from "../components/Filter";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({genres}) => {
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?img=12");
  const [preferredGenres, setPreferredGenres] = useState([
    "Action",
    "Comedy",
  ]);
  const [likedMovies, setLikedMovies] = useState([
    "Inception",
    "The Matrix",
    "Parasite",
  ]);
  const [newGenre, setNewGenre] = useState("");
  const navigate = useNavigate();

  const addGenre = () => {
    if (newGenre && !preferredGenres.includes(newGenre)) {
      setPreferredGenres([...preferredGenres, newGenre]);
      setNewGenre("");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const storedUser = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="relative bg-gray-800 p-6 min-h-screen flex justify-center items-start shadow-2xl" style={{backgroundImage: `url(${MovieImage})`, backgroundSize: 'cover', backgroundPosition:'center' }}>
      <div className='absolute inset-0 bg-black opacity-60'></div> {/* Dark overlay */}
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
                onClick={() =>
                    setPreferredGenres(preferredGenres.filter((g) => g !== genre))
                }
                className="text-blue-700 hover:text-red-600 font-bold bg-transparent cursor-pointer"
                >
                ×
                </div>
            </div>
            ))}
        </div>
        <div className="flex gap-2">
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
                        onChange={() => {
                        if (preferredGenres.includes(g.name)) {
                            setPreferredGenres(preferredGenres.filter((genre) => genre !== g.name));
                        } else {
                            setPreferredGenres([...preferredGenres, g.name]);
                        }
                        }}
                    />
                    <span>{g.name}</span>
                    </label>
                ))}
                </div>


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
          <button className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition text-white"
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
