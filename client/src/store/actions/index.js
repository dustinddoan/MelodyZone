import { 
    GET_PROD_BY_SOLD,
    GET_PROD_BY_DATE,
    SUCCESS_GLOBAL,
    ERROR_GLOBAL,
    CLEAR_NOTIFICATION,
    AUTH_USER

} from "store/types";

// USERS
export const userAuthenticate = (user) => ({
    type: AUTH_USER,
    payload: user
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
