import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Filter from './Filter';
import SearchBar from './SearchBar';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa"; // profile icon

const Navbar = ({ onHomeClick, onSearch, genres, onFilterChange, selectedGenre }) => {
  const { isLoggedIn, setIsLoggedIn } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 relative">
      <div className="container mx-auto flex justify-between items-center text-xl">
        <Link to="/" className="text-white hover:text-gray-300" onClick={onHomeClick}>
          Movie Player
        </Link>

        <div className="space-x-4 flex items-center relative text-xl">
          {isLoggedIn && storedUser && (
            <span className="text-white hidden md:block">Welcome, {storedUser.username}</span>
          )}

          <Link to="/watch-later" className="text-white hover:text-gray-300">
            Watch Later
          </Link>

          {isLoggedIn ? (
            <div className="relative">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="cursor-pointer focus:outline-none text-white p-0 m-0 bg-transparent border-none`"
              >
                <FaUserCircle size={40} />
              </div>

              {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-gray-900 rounded-lg shadow-lg z-50 overflow-hidden">
                <button
                  onClick={() => {navigate("/profile"), setDropdownOpen(!dropdownOpen)}}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-red-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            
            )}

            </div>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-300">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
