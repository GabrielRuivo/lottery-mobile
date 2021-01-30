import { createStore, combineReducers } from 'redux';

import cartReducer from './cart';
import typesReducer from './types';

const rootReducer = combineReducers({
    cart: cartReducer,
    types: typesReducer
})

export default createStore(rootReducer);