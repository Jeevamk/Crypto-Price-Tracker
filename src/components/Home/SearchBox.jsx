// import React, { useState } from 'react';
// import { BiSearch } from 'react-icons/bi';

// const SearchBox = ({ handleSubmit }) => {
//   const [query, setQuery] = useState('');

//   const handleChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     handleSubmit(query);
//   };

//   return (
//     <div className="flex justify-center items-center ">
//       <form onSubmit={onSubmit} className="flex items-center w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl bg-gray-800 p-2 sm:p-3 md:p-2 rounded-full m-4">
        
//         <input
//           type="text"
//           className="bg-gray-800 text-white ml-2 sm:ml-3 md:ml-4 w-full focus:outline-none"
//           placeholder="Search..."
//           value={query}
//           onChange={handleChange}
//         />
//         <button 
//           type="submit" 
//           className="ml-2 sm:ml-3 md:ml-4  text-white py-1 px-2 sm:py-2 sm:px-4 rounded-full focus:outline-none"
//         >
//           <BiSearch className="text-gray-400 " size="1.5rem" />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SearchBox;


// components/SearchBox.jsx




import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Fetch results when query changes
  useEffect(() => {
    if (query.length > 2) {
      fetchResults(query);
    } else {
      setResults([]);
    }
  }, [query]);

  // Debounced search function
  const fetchResults = debounce(async (query) => {
    try {
      const response = await fetch(`http://localhost:5001/api/coins/search?query=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }, 300);

  // Handle input change
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle selecting a result
  const handleSelect = (symbol) => {
    setQuery('');
    setResults([]);
    onSearch(symbol); // Pass the selected symbol to the parent component
  };

  return (
    <div>
      <input 
        type="text" 
        value={query}
        onChange={handleChange}
        placeholder="Search for a cryptocurrency"
        className="input-class"
      />
      {results.length > 0 && (
        <ul className="results-list">
          {results.map(result => (
            <li key={result.symbol} onClick={() => handleSelect(result.symbol)}>
              {result.coinName} ({result.symbol})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;

