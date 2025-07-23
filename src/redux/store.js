import { combineReducers, configureStore } from "@reduxjs/toolkit";
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import storage from 'redux-persist/lib/storage';
import persistReducer from "redux-persist/lib/persistReducer";
import persistStore from "redux-persist/lib/persistStore";

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    blogReducer: blogReducer,
    userReducer: userReducer,
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({
    reducer: persistedReducer
})

const persistor = persistStore(store)

export { store, persistor }
