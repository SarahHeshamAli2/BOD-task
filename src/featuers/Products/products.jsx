import Table from "../../components/ui/table";
import { useGetAllProducts } from "./hooks/useGetAllProducts";
import ConfirmDeleteModal from "../../components/ui/confirmDeleteModal";
import { useProductActions } from "./hooks/useProductsActions";
import { ProductImage } from "./components/productImage";
import { ProductActions } from "./components/productsActions";
import { useState, useMemo, useCallback, useEffect } from "react";
import FormModal from "../../components/ui/form-modal";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import TableSkeleton from "../../components/ui/skeleton";
import Skeleton from "../../components/ui/skeleton";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    allProducts,
    loading,
    error,
    refetch,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    changeItemsPerPage,
    pagination,
  } = useGetAllProducts(searchTerm);
  const {
    open,
    isDeleting,
    handleCloseFormModal,
    setOpen,
    activeRow,
    toggleActions,
    handleAddNewItem,
    handleShowForm,
    handleShowDelete,
    confirmDeleteProduct,
    productId,
    openFormModal,
    isEditing,
  } = useProductActions(refetch);

  useEffect(() => {
    if (open || openFormModal) {
      toggleActions(null);
    }
  }, [open, openFormModal, toggleActions]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const columns = useMemo(
    () => [
      {
        key: "name",
        label: "Product Name",
        render: (row) => (
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-semibold text-gray-900 text-base">
                {row.name.en}
              </div>
            </div>
          </div>
        ),
      },
      {
        key: "image",
        label: "Image",
        render: (row) => <ProductImage row={row} />,
      },
      {
        key: "description",
        label: "Description",
        render: (row) => (
          <div className="max-w-sm">
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {row.description.en}
            </p>
            {row.description.en && row.description.en.length > 100 && (
              <button className="text-blue-600 hover:text-blue-800 text-xs font-medium mt-1 transition-colors">
                Read more
              </button>
            )}
          </div>
        ),
      },
      {
        key: "actions",
        label: "Actions",
        render: (row) => (
          <ProductActions
            row={row}
            toggleActions={toggleActions}
            handleShowDelete={handleShowDelete}
            handleEditItem={handleShowForm}
            activeRow={activeRow}
            isModalOpen={open}
            isFormModalOpen={openFormModal}
          />
        ),
      },
    ],
    [
      toggleActions,
      handleShowDelete,
      handleShowForm,
      activeRow,
      open,
      openFormModal,
    ]
  );

  const tableData = useMemo(() => allProducts || [], [allProducts]);

  if (loading) {
    return <Skeleton variant="table" rows={5} columns={4} showActions={true} />;
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-900">
                Error loading products
              </h3>
              <p className="text-red-700">{error.message}</p>
            </div>
          </div>
          <button
            onClick={refetch}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory</p>
        </div>
        <div className="search flex gap-3">
          <Input
            value={searchTerm}
            onInput={(e) => handleSearch(e.target.value)}
            placeholder="search for item"
          />
          <Button
            onClick={handleAddNewItem}
            className="inline-flex items-center h-[45px] bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200 hover:scale-105">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Product
          </Button>
        </div>
      </div>
      <ConfirmDeleteModal
        isDeleting={isDeleting}
        onConfirm={confirmDeleteProduct}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      <FormModal
        catName={productId}
        title={isEditing === true ? "Edit product" : "Add new product"}
        isEditing={isEditing}
        refetch={refetch}
        onClose={handleCloseFormModal}
        isOpen={openFormModal}
      />
      <Table
        columns={columns}
        data={tableData}
        pagination={pagination}
        onNextPage={goToNextPage}
        onPreviousPage={goToPreviousPage}
        onGoToPage={goToPage}
        onChangeItemsPerPage={changeItemsPerPage}
        showPagination={true}
      />
    </div>
  );
}
