import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    allBlogs: [],
    loading: true,
}

const blogSlice = createSlice({
    name: 'blogReducer',
    initialState,
    reducers: {
        storeBlogs: (state, {payload})=> {state.allBlogs = payload},
        deleteBlog: (state, {payload})=> {state.allBlogs = state.allBlogs.filter(blog=>blog._id != payload)},
        setBlogLoading: (state, {payload})=> {state.loading = payload}
    }
})

export const {storeBlogs, deleteBlog, setBlogLoading} = blogSlice.actions;
export default blogSlice.reducer;