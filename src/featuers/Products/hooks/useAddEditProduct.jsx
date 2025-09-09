import { useState, useCallback } from "react";

import toast from "react-hot-toast";
import axiosInstance from "../../../services/api";
import { PRODUCTS } from "../../../services/end-points";

export const useProductOperations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const addProduct = useCallback(async (data, onSuccess) => {
    try {
      setIsLoading(true);
      setError("");
      
      const formData = new FormData();
      formData.append("name", data.name?.trim());
      formData.append("description", data.description?.trim());

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const response = await axiosInstance.post(
        PRODUCTS.ADD_NEW_PRODUCT, 
        formData, 
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Product added successfully!");
        onSuccess?.(response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error adding product:", errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update existing product
  const updateProduct = useCallback(async (catName, data, onSuccess) => {
    try {
      setIsLoading(true);
      setError("");
      
      const formData = new FormData();
      formData.append("name", data.name?.trim());
      formData.append("description", data.description?.trim());

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const response = await axiosInstance.put(
        PRODUCTS.EDIT_PRODUCT(catName), 
        formData, 
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Product updated successfully!");
        onSuccess?.(response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error updating product:", errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitProduct = useCallback(async (data, isEditing, catName, onSuccess) => {
    if (isEditing && catName) {
      return await updateProduct(catName, data, onSuccess);
    } else {
      return await addProduct(data, onSuccess);
    }
  }, [addProduct, updateProduct]);

  // Clear error state
  const clearError = useCallback(() => {
    setError("");
  }, []);

  return {
    addProduct,
    updateProduct,
    submitProduct,
    isLoading,
    error,
    clearError,
  };
};