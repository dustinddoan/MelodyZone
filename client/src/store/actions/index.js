import { 
    GET_PROD_BY_SOLD,
    GET_PROD_BY_DATE,
    SUCCESS_GLOBAL,
    ERROR_GLOBAL,
    CLEAR_NOTIFICATION,
    AUTH_USER,
    USER_SIGNOUT,
    GET_PRODUCT_PAGINATE

} from "store/types";

// USERS
export const userAuthenticate = (user) => ({
    type: AUTH_USER,
    payload: user
})

export const userSignOut = () => ({
    type: USER_SIGNOUT
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
