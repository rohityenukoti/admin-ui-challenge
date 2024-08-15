import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // console.log('Rendering Pagination. Current page:', currentPage, 'Total pages:', totalPages);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(1)} 
        disabled={currentPage === 1}
        className="first-page"
      >
        First
      </button>
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className="previous-page"
      >
        Previous
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </button>
      ))}
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="next-page"
      >
        Next
      </button>
      <button 
        onClick={() => onPageChange(totalPages)} 
        disabled={currentPage === totalPages}
        className="last-page"
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;