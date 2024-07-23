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
        activeClassName="bg-gray-700 text-white"
        disabledClassName="text-white cursor-not-allowed"
        pageClassName="px-3 py-1 border border-gray-700 rounded-md cursor-pointer hover:bg-gray-600 "
        previousClassName="px-3 py-1 border border-gray-700 rounded-md cursor-pointer hover:bg-gray-600"
        nextClassName="px-3 py-1 border border-gray-700 rounded-md cursor-pointer hover:bg-gray-600"
        breakClassName="px-3 py-1 border border-gray-700 rounded-md cursor-pointer"
        breakLinkClassName="text-gray-500"
      />
    </div>
  );
};

export default Pagination;
