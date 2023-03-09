import axios from "axios"
import * as actions from './index'

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
            dispatch(actions.productsByPaginate(products.data.docs));
            
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}