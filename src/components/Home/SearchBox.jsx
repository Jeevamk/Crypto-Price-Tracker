import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';

const SearchBox = ({ onSearch, coinsWithImagesAndPrices, setCoinsWithImagesAndPrices }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const isInitialDataSet = useRef(false);

  // Store the initial coinsWithImagesAndPrices when the component mounts
  useEffect(() => {
    if (coinsWithImagesAndPrices.length > 0 && !isInitialDataSet.current) {
      setInitialData(coinsWithImagesAndPrices);
      isInitialDataSet.current = true;
      console.log("Initial data set:", coinsWithImagesAndPrices);
    }
  }, [coinsWithImagesAndPrices]);

  // Fetch results when query changes
  useEffect(() => {
    if (query.length > 1) {
      fetchResults(query);
    } else {
      setResults([]);
      setCoinsWithImagesAndPrices(initialData); // Reset to initial data when query is cleared
    }
  }, [query, initialData, setCoinsWithImagesAndPrices]);

  // Debounced search function
  const fetchResults = debounce(async (query) => {
    try {
      const response = await fetch(`http://localhost:5001/api/coins/search?query=${query}`);
      const data = await response.json();
      console.log(data);
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }, 300);

  // Case-insensitive search function
  const searchCoins = (coins, query) => {
    const regex = new RegExp(query, 'i');
    return coins.filter(coin => regex.test(coin.symbol));
  };

  // Handle input change
  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery.length === 0) {
      // Reset to initial data if query is cleared
      setCoinsWithImagesAndPrices(initialData);
    } else {
      const filteredCoins = searchCoins(initialData, newQuery);

      // Update the coinsWithImagesAndPrices state with the filtered array
      setCoinsWithImagesAndPrices(filteredCoins);
    }
  };

  // Handle selecting a result
  const handleSelect = (symbol) => {
    setQuery('');
    setResults([]);
    onSearch(symbol);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
    <input 
      type="text" 
      value={query}
      onChange={handleChange}
      placeholder="Search for a cryptocurrency"
      className="w-full p-3  bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
    />
    {results.length > 0 && (
      <ul className="absolute top-full mt-1 w-full bg-gray-800 border border-gray-600 rounded-lg z-10 ">
        {results.map(result => (
          <li
            key={result.symbol}
            onClick={() => handleSelect(result.symbol)}
            className="px-3 py-2 cursor-pointer hover:bg-gray-700 text-white"
          >
            {result.coinName} ({result.symbol})
          </li>
        ))}
      </ul>
    )}
  </div>
  );
};

export default SearchBox;