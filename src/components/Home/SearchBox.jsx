import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    performSearch(query);
  };

  const performSearch = (query) => {
    // Replace this with your actual search logic
    // For demonstration, we will use a static list of items
    const items = [
      { id: 1, name: 'Bitcoin' },
      { id: 2, name: 'Ethereum' },
      { id: 3, name: 'Ripple' },
      { id: 4, name: 'Litecoin' },
      { id: 5, name: 'Cardano' },
    ];

    const filteredResults = items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filteredResults);
  };

  return (
    <div className="flex flex-col items-center mb-6 mt-7">
      <form onSubmit={handleSubmit} className="flex items-center w-full max-w-4xl bg-gray-950 p-4 rounded-full">
        <BiSearch className="text-gray-400" size="1.3rem" />
        <input
          type="text" 
          className="bg-gray-950 text-white ml-4 w-full focus:outline-none"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />
      </form>
      {/* <div className="mt-4 w-full max-w-3xl bg-white rounded-lg shadow-lg">
        {results.length > 0 ? (
          results.map(result => (
            <div key={result.id} className="p-3 border-b border-gray-300 last:border-none">
              {result.name}
            </div>
          ))
        ) : (
          <div className="p-3 text-gray-500">No results found</div>
        )}
      </div> */}
    </div>
  );
};

export default SearchBox;
