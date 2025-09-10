import { useForm } from "react-hook-form";
import { useEffect, useState, useCallback } from "react";
import Button from "./button";
import Input from "./input";
import axiosInstance from "../../services/api";
import { PRODUCTS } from "../../services/end-points";
import { useProductOperations } from "../../featuers/Products/hooks/useAddEditProduct";

export default function FormModal({
  isOpen,
  onClose,
  refetch,
  isEditing,
  catName,
  title = "Add New Product",
  message = "Fill in the details to add a new product",
}) {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState("");
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState(null);

  const { submitProduct, isLoading, error, clearError } = useProductOperations();

  const {
    register,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setImageError("Please select a valid image file");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setImageError("Image size should be less than 5MB");
        return;
      }
      
      setImageError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setExistingImageUrl(null); 
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleFormSubmit = async (data) => {
    const result = await submitProduct(data, isEditing, catName, async () => {
      await refetch();
      handleClose();
    });
    console.log(result);
    
    

  };

  const handleClose = () => {
    reset();
    setImagePreview(null);
    setExistingImageUrl(null);
    setImageError("");
    clearError();
    onClose();
  };
const fetchItemForEdit = useCallback(async () => {
  if (!catName) return;
  setIsLoadingEdit(true);
  
  try {
    const response = await axiosInstance.get(PRODUCTS.GET_PRODUCT_BY_NAME(catName));
    console.log(response.data);
    
    setValue('name', response.data.displayName);
    setValue('description', response.data.displayDescription);
    
    if (response.data.imageUrl || response.data.image) {
      const imageUrl = response.data.imageUrl || response.data.image;
      setExistingImageUrl(imageUrl);
      setImagePreview(null);
    }
  } catch (error) {
    console.error("Error fetching item for edit:", error.response?.data?.message);
  } finally {
    setIsLoadingEdit(false);
  }
}, [catName, setValue]); 


  useEffect(() => {
    if (isOpen && isEditing && catName) {
      fetchItemForEdit();
    }
  }, [isOpen, isEditing, catName,fetchItemForEdit]);

  useEffect(() => {
    if (!isOpen) {
      reset();
      setImagePreview(null);
      setExistingImageUrl(null);
      setImageError("");
      clearError();
    }
  }, [isOpen, reset, clearError]);

  if (!isOpen) return null;

  const hasImage = imagePreview || existingImageUrl;
  const displayError = error || imageError;
  const isSubmitting = isLoading;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-600 mt-1">{message}</p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-6 py-4">
          {displayError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{displayError}</p>
            </div>
          )}

      {
        isLoadingEdit ? <p>Loading...</p> :     <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <Input 
                label="Product Name" 
                placeholder="Enter product name"
                {...register("name", { 
                  required: "Product name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <div className="space-y-3">
                <Input
                  type="file"
                  accept="image/*"
                  {...register("image", {
                    required: isEditing ? false : "Product image is required"
                  })}
                  onChange={(e) => {
                    register("image").onChange(e);
                    handleImageChange(e);
                  }}
                />
                {errors.image && (
                  <p className="text-xs text-red-500">{errors.image.message}</p>
                )}
                
                {existingImageUrl && !imagePreview && (
                  <div className="relative">
                    <p className="text-sm font-medium text-gray-700 mb-2">Current Image:</p>
                    <div className="relative bg-gray-50 rounded-lg p-3 border-2 border-dashed border-gray-200">
                      <img
                        src={existingImageUrl}
                        alt="Current product"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                        Current
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Upload a new image to replace the current one
                    </p>
                  </div>
                )}
                
                {imagePreview && (
                  <div className="relative">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      {existingImageUrl ? "New Image Preview:" : "Preview:"}
                    </p>
                    <div className="relative bg-gray-50 rounded-lg p-3 border-2 border-dashed border-gray-200">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          const fileInput = document.querySelector('input[type="file"]');
                          if (fileInput) fileInput.value = '';
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Enter product description..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
                {...register("description", {
                  required: "Product description is required",
                  minLength: { value: 10, message: "Description must be at least 10 characters" }
                })}
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
              )}
            </div>
          </form>
      }
        </div>

        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-2xl border-t border-gray-100">
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting || isLoadingEdit}
              className="px-6 py-2 rounded-lg border bg-red-600 border-gray-300 text-gray-700 hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={isSubmitting || isLoadingEdit || (!hasImage && !isEditing)}
              onClick={handleSubmit(handleFormSubmit)}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isEditing ? "Updating..." : "Adding..."}
                </div>
              ) : (
                isEditing ? "Update Product" : "Add Product"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}