import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import appReducers from './reducers/index.js';


const ReduxStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        // reducers
        appReducers,
        composeEnhancers(applyMiddleware(thunk))
    );

    return store
}

export default ReduxStore;