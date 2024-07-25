// components/SearchHistory.jsx
import React, { useEffect, useState } from 'react';

const SearchHistory = ({ userId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/searchHistory/${userId}`);
        const data = await response.json();
        setHistory(data.searches);
      } catch (error) {
        console.error('Error fetching search history:', error);
      }
    };

    fetchHistory();
  }, [userId]);

  const handleRemove = async (term) => {
    try {
      await fetch(`http://localhost:5001/api/searchHistory/${userId}/${term}`, { method: 'DELETE' });
      setHistory(history.filter(search => search !== term));
    } catch (error) {
      console.error('Error removing search term:', error);
    }
  };

  return (
    <div>
      <h3>Search History</h3>
      <ul>
        {history.map(term => (
          <li key={term}>
            {term} <button onClick={() => handleRemove(term)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
