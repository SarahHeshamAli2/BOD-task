import { memo, useMemo } from 'react';
import Pagination from './pagintation';

const EmptyState = memo(() => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">No data available</h3>
        <p className="text-sm text-gray-500 max-w-sm">
          There are no items to display at the moment. Try refreshing or adding new data.
        </p>
      </div>
      
      <button className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh Data
      </button>
    </div>
  );
});

const TableRow = memo(({ row, columns, index }) => {
  return (
    <tr
      key={row.id || index}
      className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-sm"
    >
      {columns.map((col, colIndex) => (
        <td
          key={col.key}
          className={`px-6 py-5 text-sm text-gray-700 relative
            ${colIndex === 0 ? 'font-medium' : ''}
          `}
        >
          <div className="relative z-10">
            {typeof col.render === "function"
              ? col.render(row)
              : (
                <span className="block truncate max-w-xs">
                  {row[col.key]}
                </span>
              )}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 to-indigo-400/0 group-hover:from-blue-400/5 group-hover:to-indigo-400/5 transition-all duration-300 rounded-lg"></div>
        </td>
      ))}
    </tr>
  );
});

// Memoized MobileCard for mobile view
const MobileCard = memo(({ row, columns, index }) => {
  const actionsColumn = useMemo(() => 
    columns.find(col => col.key === 'actions'), [columns]
  );

  return (
    <div
      key={row.id || index}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
    >
      {columns.map((col) => {
        if (col.key === 'actions') return null;
        
        return (
          <div key={col.key} className="mb-4 last:mb-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 sm:mb-0 sm:w-1/3">
                {col.label}
              </label>
              <div className="sm:w-2/3">
                {typeof col.render === "function"
                  ? col.render(row)
                  : (
                    <span className="text-sm text-gray-700">
                      {row[col.key]}
                    </span>
                  )}
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Actions at the bottom */}
      {actionsColumn && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-end">
            {actionsColumn.render(row)}
          </div>
        </div>
      )}
    </div>
  );
});

export default function Table({ 
  columns, 
  data, 
  pagination, 
  onNextPage, 
  onPreviousPage, 
  onGoToPage, 
  onChangeItemsPerPage,
  showPagination = true 
}) {
  // Memoize header rendering to prevent recalculation
  const tableHeader = useMemo(() => (
    <thead>
      <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
        {columns.map((col, index) => (
          <th
            key={col.key}
            className={`px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider relative
              ${index === 0 ? 'rounded-tl-2xl' : ''}
              ${index === columns.length - 1 ? 'rounded-tr-2xl' : ''}
            `}
          >
            <div className="flex items-center space-x-1">
              <span>{col.label}</span>
              <svg className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  ), [columns]);

  // Check if we have data
  const hasData = data && data.length > 0;

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden lg:block">
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100">
          <table className="min-w-full divide-y divide-gray-100">
            {tableHeader}
            <tbody className="divide-y divide-gray-50">
              {hasData ? (
                data.map((row, idx) => (
                  <TableRow 
                    key={row.id || idx} 
                    row={row} 
                    columns={columns} 
                    index={idx} 
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-16 text-center">
                    <EmptyState />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {showPagination && hasData && pagination && (
            <Pagination
              pagination={pagination}
              onNextPage={onNextPage}
              onPreviousPage={onPreviousPage}
              onGoToPage={onGoToPage}
              onChangeItemsPerPage={onChangeItemsPerPage}
            />
          )}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="block lg:hidden">
        <div className="space-y-4">
          {hasData ? (
            data.map((row, idx) => (
              <MobileCard 
                key={row.id || idx} 
                row={row} 
                columns={columns} 
                index={idx} 
              />
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <EmptyState />
            </div>
          )}
        </div>
        
        {showPagination && hasData && pagination && (
          <div className="mt-4 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <Pagination
              pagination={pagination}
              onNextPage={onNextPage}
              onPreviousPage={onPreviousPage}
              onGoToPage={onGoToPage}
              onChangeItemsPerPage={onChangeItemsPerPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}