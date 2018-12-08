import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import itemsReducer from "../reducers/items";
import userReducer from "../reducers/user";

export default function configureStore(initialState) {
    return createStore(
        combineReducers({
            items: itemsReducer,
            user:userReducer,
          }),
          initialState,
        applyMiddleware(thunk)
    );
}

