import { Ellipsis } from "lucide-react";

export function ProductActions({ 
  row, 
  activeRow, 
  toggleActions, 
  handleShowDelete, 
  handleEditItem,
  isModalOpen,
  isFormModalOpen 
}) {
  const shouldShowDropdown = activeRow === row._id && !isModalOpen && !isFormModalOpen;
  
  return (
    <div className="relative">
      <Ellipsis 
        onClick={() => {
          if (!isModalOpen && !isFormModalOpen) {
            toggleActions(row._id);
          }
        }} 
        className="cursor-pointer" 
      />
      {shouldShowDropdown && (
        <div className="absolute right-0 mt-2 flex items-center space-x-2 bg-white shadow-lg rounded-xl p-2 z-10">
          <button
            onClick={() => handleEditItem(row.displayName)}
            className="group cursor-pointer relative inline-flex items-center justify-center w-9 h-9 text-blue-600 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 hover:border-blue-200 focus:z-10 focus:ring-2 focus:ring-blue-500/20 focus:bg-blue-100 transition-all duration-200 hover:shadow-lg hover:scale-105"
            title="Edit Product">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
       
          <button
            onClick={() => handleShowDelete(row.displayName)}
            className="group cursor-pointer relative inline-flex items-center justify-center w-9 h-9 text-red-600 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 hover:border-red-200 focus:z-10 focus:ring-2 focus:ring-red-500/20 focus:bg-red-100 transition-all duration-200 hover:shadow-lg hover:scale-105"
            title="Delete Product">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}