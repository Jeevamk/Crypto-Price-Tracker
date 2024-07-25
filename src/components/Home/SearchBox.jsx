import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const SearchBox = ({ handleSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(query);
  };

  return (
    <div className="flex justify-center items-center ">
      <form onSubmit={onSubmit} className="flex items-center w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl bg-gray-800 p-2 sm:p-3 md:p-2 rounded-full m-4">
        
        <input
          type="text"
          className="bg-gray-800 text-white ml-2 sm:ml-3 md:ml-4 w-full focus:outline-none"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
        />
        <button 
          type="submit" 
          className="ml-2 sm:ml-3 md:ml-4  text-white py-1 px-2 sm:py-2 sm:px-4 rounded-full focus:outline-none"
        >
          <BiSearch className="text-gray-400 " size="1.5rem" />
        </button>
      </form>
    </div>
  );
};

export default SearchBox;

