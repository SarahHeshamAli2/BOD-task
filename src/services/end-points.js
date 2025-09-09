export const PRODUCTS = {

    GET_ALL_PRODUCTS : '/categories/search',
    DELETE_PRODUCT :(id)=> `/categories/${id}`,
    ADD_NEW_PRODUCT:'/categories',
    EDIT_PRODUCT :(id)=> `/categories/${id}`,
    GET_PRODUCT_BY_NAME:(categoryName)=>`/get-items/${categoryName}`

}