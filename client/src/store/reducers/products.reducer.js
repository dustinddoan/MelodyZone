import {
    GET_PROD_BY_SOLD,
    GET_PROD_BY_DATE,
    GET_PRODUCT_PAGINATE,
    ADD_PRODUCT,
    GET_PRODUCT_BY_ID,
    CLEAR_EDIT_PRODUCT
} from '../types'

export default function productsReducer(state={}, action) {
    switch(action.type) {
        case GET_PROD_BY_SOLD:
            return {...state, bySold: action.payload}
        case GET_PROD_BY_DATE:
            return {...state, byDate: action.payload}
        case GET_PRODUCT_PAGINATE:
            return {...state, byPaginate: action.payload}
        case ADD_PRODUCT:
            return {...state, addProduct: true}
        case GET_PRODUCT_BY_ID:
            return {...state, productToEdit: action.payload}
        case CLEAR_EDIT_PRODUCT:
            return {...state, productToEdit: ''}
        default: 
            return state
    }
}