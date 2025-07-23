import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    allBlogs: []
}

const blogSlice = createSlice({
    name: 'blogReducer',
    initialState,
    reducers: {
        storeBlogs: (state, {payload})=> {state.allBlogs = payload},
        deleteBlog: (state, {payload})=> {state.allBlogs = state.allBlogs.filter(blog=>blog._id != payload)},
    }
})

export const {storeBlogs, deleteBlog} = blogSlice.actions;
export default blogSlice.reducer;