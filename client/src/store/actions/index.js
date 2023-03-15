import { 
    GET_PROD_BY_SOLD,
    GET_PROD_BY_DATE,
    SUCCESS_GLOBAL,
    ERROR_GLOBAL,
    CLEAR_NOTIFICATION,
    AUTH_USER,
    USER_SIGNOUT,
    GET_PRODUCT_PAGINATE,
    REMOVE_PRODUCT,
    GET_ALL_BRANDS,
    ADD_PRODUCT,
    GET_PRODUCT_BY_ID,
    CLEAR_EDIT_PRODUCT,
    ADD_TO_USER_CART

} from "store/types";

// USERS
export const userAuthenticate = (user) => ({
    type: AUTH_USER,
    payload: user
})

export const userSignOut = () => ({
    type: USER_SIGNOUT
})

export const addToCart = (item) => ({
    type: addProduct,
    payload: item
})


// PRODUCTS
export const productsBySold = (data) => ({
    type: GET_PROD_BY_SOLD,
    payload: data
})

export const productsByDate = (data) => ({
    type: GET_PROD_BY_DATE,
    payload: data
})

export const productsByPaginate = (products) => ({
    type: GET_PRODUCT_PAGINATE,
    payload: products
})

export const removeProduct = () => ({
    type: REMOVE_PRODUCT
})

export const addProduct = (product) => ({
    type: ADD_PRODUCT,
    payload: product
})

export const getProductById = (product) =>({
    type: GET_PRODUCT_BY_ID,
    payload: product
})

export const clearEditProdcut = () => ({
    type: CLEAR_EDIT_PRODUCT
})

// NOTIFICATIONS
export const successGlobal = (msg) => ({
    type: SUCCESS_GLOBAL,
    payload: msg
})

export const errorGlobal = (msg) => ({
    type: ERROR_GLOBAL,
    payload: msg
})

export const clearNotification  = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_NOTIFICATION
        })
    }
}

// BRANDS

export const getAllBrands = (brands) => ({
    type: GET_ALL_BRANDS,
    payload: brands
})