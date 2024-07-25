import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import { useSelector } from 'react-redux';
import { FaDeleteLeft } from "react-icons/fa6";

const SearchBox = ({ coinsWithImagesAndPrices = [], setCoinsWithImagesAndPrices }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [history, setHistory] = useState([]);
  const isInitialDataSet = useRef(false);
  const user = useSelector((state) => state.auth.user);

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
      fetchResults();
    } else {
      setResults([]);
      setCoinsWithImagesAndPrices(initialData);
    }
  }, [query, initialData, setCoinsWithImagesAndPrices]);

  // Debounced search function
  const fetchResults = debounce(async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/searchHistory/${user._id}`);
      const data = await response.json();
      setResults(data.searches);
      setHistory(data.searches);
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
  const handleChange = async (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery.length === 0) {
      setCoinsWithImagesAndPrices(initialData);
    } else {
      const filteredCoins = searchCoins(initialData, newQuery);
      setCoinsWithImagesAndPrices(filteredCoins);
      if (newQuery.length >= 3) {
        try {
          const response = await fetch(`http://localhost:5001/api/searchHistory/${user._id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: newQuery }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data);
          } else {
            console.error('Failed to fetch data from API');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }
  };

  // Handle selecting a result
  const handleSelect = (result) => {
    setQuery(result);
    setResults([]);
  };

  // Handle removing search history
  const handleRemoveHistory = async (term) => {
    try {
      await fetch(`http://localhost:5001/api/searchHistory/${user._id}/${term}`, { method: 'DELETE' });
      setHistory(history.filter(search => search !== term));
      setQuery("");
    } catch (error) {
      console.error('Error removing search term:', error);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <input 
        type="text" 
        value={query}
        onChange={handleChange}
        placeholder="Search for a cryptocurrency"
        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
      />
      {results.length > 0 && (
        <ul className="absolute top-full mt-1 w-full bg-gray-800 border border-gray-600 rounded-lg z-10">
          {results.map(result => (
            <li
              key={result}
              onClick={() => handleSelect(result)}
              className="flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-gray-700 text-white"
            >
              {result} <FaDeleteLeft onClick={() => handleRemoveHistory(result)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;

