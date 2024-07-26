import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';

const SearchHistory = () => {
  const user = useSelector((state) => state.auth.user);
  const [history, setHistory] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (user && user._id) {
      setUserId(user._id);
    }
  }, [user]);

  useEffect(() => {
    if (userId) {
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
    }
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
    <div className="bg-transparent p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
    <ul>
      {history.map(term => (
        <li key={term} className="flex items-center justify-between text-white py-3 px-5 bg-gray-700 rounded-lg mb-3 transition-transform transform hover:scale-105">
          <span>{term}</span>
          <button onClick={() => handleRemove(term)} className="text-red-500 hover:text-red-700 transition-colors">
            <FaTrashAlt />
          </button>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default SearchHistory;
