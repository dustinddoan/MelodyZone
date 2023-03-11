import { combineReducers } from "redux";
import users from './users.reducer';
import products  from "./products.reducer";
import notifications from "./notifications.reducer";
import brandsReducer from "./brands.reducers";
const appReducers = combineReducers({
    users,
    products,
    notifications,
    brandsReducer
});

export default appReducers;