import React from 'react';

const Filter = ({ genres, onFilterChange, selectedGenre }) => {
  return (
    <select
      className="px-4 appearance-none rounded-full h-10  border border-gray-400 ml-2 text-white bg-gray-900"
      value={selectedGenre}
      onChange={e => onFilterChange(Number(e.target.value))}
    >
      <option value={0} className="rounded-lg text-black bg-white" >All Genres</option>
      {genres && genres.map(genre => (
        <option key={genre.id} value={genre.id} className="rounded-lg text-black bg-white">{genre.name}</option>
      ))}
    </select>
  );
};

export default Filter; 