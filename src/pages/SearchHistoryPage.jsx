import React from 'react';
import SearchHistory from '../components/Home/Search/SearchHistory';

const SearchHistoryPage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Search History</h1>
      <SearchHistory />
    </div>
  );
};

export default SearchHistoryPage;
