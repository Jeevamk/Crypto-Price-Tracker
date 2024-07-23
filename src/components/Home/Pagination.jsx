import React from 'react';
import ReactPaginate from 'react-paginate';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

// eslint-disable-next-line react/prop-types
const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4 px-2">
      <ReactPaginate
        previousLabel={<BiChevronLeft className="text-white text-xl" />}
        nextLabel={<BiChevronRight className="text-white text-xl" />}
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={onPageChange}
        containerClassName="flex items-center space-x-2"
        activeClassName="bg-blue-500 text-white rounded-md"
        disabledClassName="text-gray-400 cursor-not-allowed"
        pageClassName="px-3 py-1 text-white cursor-pointer hover:bg-gray-700 rounded-md transition-colors"
        previousClassName="px-3 py-1 text-white cursor-pointer hover:bg-gray-700 rounded-md transition-colors"
        nextClassName="px-3 py-1 text-white cursor-pointer hover:bg-gray-700 rounded-md transition-colors"
        breakClassName="px-3 py-1 text-white cursor-pointer"
        breakLinkClassName="text-gray-500"
      />
    </div>
  );
};

export default Pagination;
