import { useEffect, useState, useCallback } from "react";
import { PRODUCTS } from "../../../services/end-points";
import axiosInstance from "../../../services/api";

export const useGetAllProducts = (searchTerm = "", initialPage = 1, initialItemsPerPage = 5) => { 
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    itemsPerPage: initialItemsPerPage,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const getAllProducts = useCallback(async (page = pagination.currentPage, itemsPerPage = pagination.itemsPerPage) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page,
        limit: itemsPerPage,
        ...(debouncedSearchTerm && { search: debouncedSearchTerm })
      };
      
      const response = await axiosInstance.get(PRODUCTS.GET_ALL_PRODUCTS, { params });
      
      setAllProducts(response.data.data);
      setPagination(response.data.pagination);
      
    } catch (error) {
      setError(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, pagination.currentPage, pagination.itemsPerPage]); 

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  // Reset to first page when search term changes
  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) {
      setPagination(prev => ({ ...prev, currentPage: 1 }));
    }
  }, [debouncedSearchTerm, searchTerm]);

  const refetch = useCallback(() => {
    getAllProducts();
  }, [getAllProducts]);

  // Pagination handlers
  const goToNextPage = useCallback(() => {
    if (pagination.hasNextPage) {
      const nextPage = pagination.currentPage + 1;
      getAllProducts(nextPage, pagination.itemsPerPage);
    }
  }, [pagination.hasNextPage, pagination.currentPage, pagination.itemsPerPage, getAllProducts]);

  const goToPreviousPage = useCallback(() => {
    if (pagination.hasPreviousPage) {
      const prevPage = pagination.currentPage - 1;
      getAllProducts(prevPage, pagination.itemsPerPage);
    }
  }, [pagination.hasPreviousPage, pagination.currentPage, pagination.itemsPerPage, getAllProducts]);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= pagination.totalPages && page !== pagination.currentPage) {
      getAllProducts(page, pagination.itemsPerPage);
    }
  }, [pagination.totalPages, pagination.currentPage, pagination.itemsPerPage, getAllProducts]);

  const changeItemsPerPage = useCallback((newItemsPerPage) => {
    if (newItemsPerPage !== pagination.itemsPerPage) {
      getAllProducts(1, newItemsPerPage); // Reset to first page when changing items per page
    }
  }, [pagination.itemsPerPage, getAllProducts]);

  return {
    allProducts,
    loading,
    error,
    pagination,
    refetch,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    changeItemsPerPage,
  };
};