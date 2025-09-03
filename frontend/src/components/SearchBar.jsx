import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      className="px-4 py-2 h-10 rounded-full w-1/3 border border-white mr-4 text-white bg-transparent placeholder-white focus:outline-none focus:ring-2 focus:ring-gray-200"
      placeholder="Search movies..."
      onChange={e => onSearch(e.target.value)}
    />
  );
};

export default SearchBar; 