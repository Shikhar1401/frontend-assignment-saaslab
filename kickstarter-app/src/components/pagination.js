import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav 
      className="pagination" 
      role="navigation" 
      aria-label="Pagination Navigation"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-disabled={currentPage === 1}
        aria-label="Go to previous page"
        tabIndex={currentPage === 1 ? -1 : 0}
      >
        Prev
      </button>
      
      <span 
        aria-live="polite" 
        aria-atomic="true"
        role="status"
      > 
        Page {currentPage} of {totalPages} 
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-disabled={currentPage === totalPages}
        aria-label="Go to next page"
        tabIndex={currentPage === totalPages ? -1 : 0}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
