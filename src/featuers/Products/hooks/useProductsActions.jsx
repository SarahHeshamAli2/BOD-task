import { useState } from "react";

import toast from "react-hot-toast";
import axiosInstance from "../../../services/api";
import { PRODUCTS } from "../../../services/end-points";

export function useProductActions(refetch) {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCloseFormModal = () => {
    setOpenFormModal(false);
  };

  const toggleActions = (rowId) => {
    setActiveRow((prev) => (prev === rowId ? null : rowId));
  };

  const handleShowDelete = (id) => {
    setOpen(true);
    setProductId(id);
  };
  const handleShowForm = (id) => {
    console.log(id);
    
    setIsEditing(true);
    setOpenFormModal(true);
    setProductId(id);
  };

  const handleAddNewItem =()=>{
    setIsEditing(false)
        setOpenFormModal(true);


  }
  const confirmDeleteProduct = async () => {
    setIsDeleting(true);
    try {
      const response = await axiosInstance.delete(
        PRODUCTS.DELETE_PRODUCT(productId)
      );
      refetch();
      setIsDeleting(false);

      toast.success("product is deleted !");
      console.log(response);
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
    }
    setOpen(false);
  };

  return {
    open,
    isEditing,
    productId,
    openFormModal,
    handleCloseFormModal,
    setOpen,
    activeRow,
    toggleActions,
    handleShowDelete,
    isDeleting,
    confirmDeleteProduct,
    handleShowForm,
    handleAddNewItem
  };
}
