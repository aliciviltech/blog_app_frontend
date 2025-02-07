import { configureStore } from "@reduxjs/toolkit";
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

export const store = configureStore({
    reducer: {
        blogReducer: blogReducer,
        userReducer: userReducer,
    }
})