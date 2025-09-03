import React from 'react';
import { Link } from 'react-router-dom';
import Filter from './Filter';
import SearchBar from './SearchBar';

const Navbar = ({ onHomeClick, onSearch, genres, onFilterChange, selectedGenre  }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white hover:text-gray-300" onClick={onHomeClick}>
          Movie Player
        </Link>
          <div className='gap-x-6 flex'>
          <div className="flex justify-center items-center w-full">
          <SearchBar onSearch={onSearch} />
          <h4 className="flex items-center justify-center p-6 pr-0 ">Filter by genre: </h4>
          <Filter genres={genres} onFilterChange={onFilterChange} selectedGenre={selectedGenre} />
        </div>
        </div>
        <div className="space-x-4">
          <Link to="/watch-later" className="text-white hover:text-gray-300">
            Watch Later
          </Link>
          <Link to="/" className="text-white hover:text-gray-300" onClick={onHomeClick}>
            Sign Out
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 