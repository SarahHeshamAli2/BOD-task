import { memo } from 'react';

const Pagination = memo(({ 
  pagination, 
  onNextPage, 
  onPreviousPage, 
  onGoToPage, 
  onChangeItemsPerPage 
}) => {
  const { 
    currentPage, 
    totalPages, 
    totalItems, 
    itemsPerPage, 
    hasNextPage, 
    hasPreviousPage 
  } = pagination;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; 
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);
      
      if (currentPage <= 3) {
        end = Math.min(totalPages, 5);
      } else if (currentPage >= totalPages - 2) {
        start = Math.max(1, totalPages - 4);
      }
      
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-6 bg-white border-t border-gray-100 gap-4">
      <div className="flex items-center space-x-3">
        <label className="text-sm font-medium text-gray-700">Items per page:</label>
        <select
        
          value={itemsPerPage}
          onChange={(e) => onChangeItemsPerPage(Number(e.target.value))}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option label='5' value={5}>5</option>
          <option label='10' value={10}>10</option>
          <option label='20' value={20}>20</option>
          <option label='50' value={50}>50</option>
        </select>
      </div>

      <div className="text-sm text-gray-700 font-medium">
        Showing {startItem}-{endItem} of {totalItems} items
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onPreviousPage}
          disabled={!hasPreviousPage}
          className={`
            px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-1
            ${hasPreviousPage 
              ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400' 
              : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
            }
          `}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:block">Previous</span>
        </button>

        <div className="flex items-center space-x-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onGoToPage(page)}
              disabled={page === '...' || page === currentPage}
              className={`
                px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 min-w-[40px]
                ${page === currentPage
                  ? 'bg-blue-600 text-white border border-blue-600 shadow-md'
                  : page === '...'
                  ? 'text-gray-400 cursor-default'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }
              `}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={onNextPage}
          disabled={!hasNextPage}
          className={`
            px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-1
            ${hasNextPage 
              ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400' 
              : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
            }
          `}
        >
          <span className="hidden sm:block">Next</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
});

export default Pagination;