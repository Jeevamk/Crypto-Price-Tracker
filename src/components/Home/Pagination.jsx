// src/components/Pagination.js
import React from 'react';
import ReactPaginate from 'react-paginate';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


// eslint-disable-next-line react/prop-types
const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <div className='flex justify-center mt-4'>
      <ReactPaginate
        previousLabel={<FaChevronLeft />}
        nextLabel={<FaChevronRight />}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
        previousClassName={'previous'}
        nextClassName={'next'}
        breakClassName={'break'}
        disabledClassName={'disabled'}
        pageClassName={'page'}
      />
    </div>
  );
};

export default Pagination;
