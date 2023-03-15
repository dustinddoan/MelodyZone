import axios from "axios"
import { useSelector } from "react-redux"
import * as actions from './index'
import { getTokenCookie, getAuthHeader, removeTokenCokie } from "utils.js/tools"
import ReduxStore from "store"

axios.defaults.headers.post['Content-Type'] = 'application/json'

export const userRegister = (values) => {
    return async(dispatch)=>{
        try{
            const user = await axios.post('/api/auth/register',{
                email:values.email, 
                password:values.password
            });
            dispatch(actions.userAuthenticate({data:user.data.user, auth: true}))
            dispatch(actions.successGlobal('Welcome !! check you mail to verify account.'))
        } catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))

        }
    }
}

export const userSignIn = (values) => {
    return async(dispatch)=>{
        try{
            const user = await axios.post('/api/auth/signin',{
                email:values.email, 
                password:values.password
            });
            dispatch(actions.userAuthenticate({data:user.data.user, auth: true}))
            dispatch(actions.successGlobal('Welcome back'))
        } catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))

        }
    }
}

export const userIsAuth = () => {
    return async(dispatch) => {
        try {
            if (!getTokenCookie()) {
                throw new Error();
            }
            
            
            const user = await axios.get('/api/auth/isauth', getAuthHeader())
            dispatch(actions.userAuthenticate({data:user.data, auth: true}))
        } catch (error) {
            dispatch(actions.userAuthenticate({data:{}, auth: false}))
        }
    }
}


export const userSignOut = () => {
    return async(dispatch) => {
        removeTokenCokie();
        dispatch(actions.userSignOut())
        dispatch(actions.successGlobal('Goodbye'))
    }
}


export const userAddToCart = (item) => {
    return async(dispatch, getState)=>{
        try{
            const cart = getState().users.cart;
            cart.push(item)
            dispatch(actions.addToCart(cart))
            dispatch(actions.successGlobal(`${item.model} added to cart :)`))
        } catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}