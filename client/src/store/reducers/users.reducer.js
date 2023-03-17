import { 
    AUTH_USER,
    USER_SIGNOUT,
    ADD_TO_USER_CART,
    USER_PURCHASE_SUCCESS
} from "store/types"

let DEFAULT_USER_STATE = {
    data: {
        _id: null,
        email: null,
        firstname: null,
        lastname: null,
        history: [],
        virified: null,
        
    },
    auth: null,
    cart: []
    
}


export default function usersReducer(state=DEFAULT_USER_STATE, action) {
    switch(action.type) {
        case AUTH_USER:
            
            return {
                ...state,
                data: {...state.data, ...action.payload.data},
                auth: action.payload.auth
            }
        case USER_SIGNOUT:
            return {
                ...state,
                data: {...DEFAULT_USER_STATE.data},
                auth: false
            }
        case ADD_TO_USER_CART:
            return {
                ...state,
                cart: action.payload
            }
        case USER_PURCHASE_SUCCESS:
            return {
                ...state,
                cart: [],
                data: {
                    ...state.data,
                    history: action.payload.history
                }
            }
        default: 
            return state
    }
}

