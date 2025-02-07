import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    allBlogs: []
}

const blogSlice = createSlice({
    name: 'blogReducer',
    initialState,
    reducers: {
        storeBlogs: (state, {payload})=> {state.allBlogs = payload},
    }
})

export const {storeBlogs} = blogSlice.actions;
export default blogSlice.reducer;