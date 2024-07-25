// import React, { useState } from "react";
// import { BiSearch } from "react-icons/bi";

// const SearchBox = () => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);

//   const handleChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     performSearch(query);
//   };

//   const performSearch = (query) => {
//     // Replace this with your actual search logic
//     // For demonstration, we will use a static list of items
//     const items = [
//       { id: 1, name: 'Bitcoin' },
//       { id: 2, name: 'Ethereum' },
//       { id: 3, name: 'Ripple' },
//       { id: 4, name: 'Litecoin' },
//       { id: 5, name: 'Cardano' },
//     ];

//     const filteredResults = items.filter(item =>
//       item.name.toLowerCase().includes(query.toLowerCase())
//     );

//     setResults(filteredResults);
//   };

//   return (
//     <div className="flex flex-col items-center mb-6 mt-7">
//       <form onSubmit={handleSubmit} className="flex items-center w-full max-w-4xl bg-gray-800 p-4 rounded-full">
//         <BiSearch className="text-gray-400" size="1.3rem" />
//         <input
//           type="text" 
//           className="bg-gray-800 text-white ml-4 w-full focus:outline-none"
//           placeholder="Search"
//           value={query}
//           onChange={handleChange}
//         />
//       </form>
//       {/* <div className="mt-4 w-full max-w-3xl bg-white rounded-lg shadow-lg">
//         {results.length > 0 ? (
//           results.map(result => (
//             <div key={result.id} className="p-3 border-b border-gray-300 last:border-none">
//               {result.name}
//             </div>
//           ))
//         ) : (
//           <div className="p-3 text-gray-500">No results found</div>
//         )}
//       </div> */}
//     </div>
//   );
// };

// export default SearchBox;

import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const SearchForm = ({ handleSubmit }) => {
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
        <BiSearch className="text-gray-400" size="1.3rem" />
        <input
          type="text"
          className="bg-gray-800 text-white ml-2 sm:ml-3 md:ml-4 w-full focus:outline-none"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />
        <button 
          type="submit"
          className="ml-2 sm:ml-3 md:ml-4 bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 sm:py-2 sm:px-4 rounded-full focus:outline-none"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;

