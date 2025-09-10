import { useEffect, useState, useCallback, useRef } from "react";
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

  const shouldResetPage = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedSearchTerm !== searchTerm) {
        shouldResetPage.current = true;
        setDebouncedSearchTerm(searchTerm);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, debouncedSearchTerm]);

  const getAllProducts = useCallback(async (page, itemsPerPage, searchQuery) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page,
        limit: itemsPerPage,
        ...(searchQuery && { search: searchQuery })
      };
      
      const response = await axiosInstance.get(PRODUCTS.GET_ALL_PRODUCTS, { params });
      
      setAllProducts(response.data.data);
      setPagination(response.data.pagination);
      
    } catch (error) {
      setError(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    const page = shouldResetPage.current ? 1 : pagination.currentPage;
    shouldResetPage.current = false;
    
    getAllProducts(page, pagination.itemsPerPage, debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Initial load
  useEffect(() => {
    getAllProducts(initialPage, initialItemsPerPage, debouncedSearchTerm);
  }, []);

  const refetch = useCallback(() => {
    getAllProducts(pagination.currentPage, pagination.itemsPerPage, debouncedSearchTerm);
  }, [getAllProducts, pagination.currentPage, pagination.itemsPerPage, debouncedSearchTerm]);

  const goToNextPage = useCallback(() => {
    if (pagination.hasNextPage) {
      const nextPage = pagination.currentPage + 1;
      getAllProducts(nextPage, pagination.itemsPerPage, debouncedSearchTerm);
    }
  }, [pagination.hasNextPage, pagination.currentPage, pagination.itemsPerPage, debouncedSearchTerm, getAllProducts]);

  const goToPreviousPage = useCallback(() => {
    if (pagination.hasPreviousPage) {
      const prevPage = pagination.currentPage - 1;
      getAllProducts(prevPage, pagination.itemsPerPage, debouncedSearchTerm);
    }
  }, [pagination.hasPreviousPage, pagination.currentPage, pagination.itemsPerPage, debouncedSearchTerm, getAllProducts]);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= pagination.totalPages && page !== pagination.currentPage) {
      getAllProducts(page, pagination.itemsPerPage, debouncedSearchTerm);
    }
  }, [pagination.totalPages, pagination.currentPage, pagination.itemsPerPage, debouncedSearchTerm, getAllProducts]);

  const changeItemsPerPage = useCallback((newItemsPerPage) => {
    if (newItemsPerPage !== pagination.itemsPerPage) {
      getAllProducts(1, newItemsPerPage, debouncedSearchTerm); 
    }
  }, [pagination.itemsPerPage, debouncedSearchTerm, getAllProducts]);

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