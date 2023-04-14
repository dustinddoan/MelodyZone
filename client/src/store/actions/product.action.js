import axios from "axios"
import * as actions from './index'
import { getAuthHeader } from "utils.js/tools"

export const  productsBySort = ({limit, sortBy, order, where}) => {
    // console.log('Product action')
    return async(dispatch) => {
        try {
            const products = await axios.get(`/api/products/all`, {
                params: {
                    limit,
                    sortBy,
                    order,
                }
               
            })

            switch(where) {
                case 'bySold':
                    // console.log('Dispatch actions.productsBySold = type PROD_BY_SOLD')
                    dispatch(actions.productsBySold(products.data))
                    break;
                case 'byDate':  
                    dispatch(actions.productsByDate(products.data))
                    break;
                default:
                    return false;
            }
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
   
}

export const productsByPaginate = (args) => {
    return async(dispatch) => {
        try {
            const products = await axios.post('/api/products/paginate/all', args)
            // console.log('products: ', products.data.docs)
            dispatch(actions.productsByPaginate(products.data));
            
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const removeProduct = (productId) => {

    return async(dispatch) => {
        try {
            const product = await axios.delete(`/api/products/product/${productId}`, getAuthHeader())
            dispatch(actions.removeProduct());
            dispatch(actions.successGlobal())
            
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const addProduct = (args) => {
    return async(dispatch) => {
        try {
            const product = await axios.post('/api/products', args,getAuthHeader())
            dispatch(actions.addProduct(product.data))
            dispatch(actions.successGlobal())
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const getProductById = (id) => {
    return async(dispatch) => {
        try {
            const product = await axios.get(`/api/products/product/${id}`)
            dispatch(actions.getProductById(product.data))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productEdit = (values, id) => {
    return async(dispatch) => {
        try {
            const product = await axios.patch(`/api/products/product/${id}`, values, getAuthHeader())
            dispatch(actions.successGlobal('Update done'))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}