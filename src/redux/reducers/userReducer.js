import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeUser: null,
    loading: true,
}

const userSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        storeUser: (state, { payload }) => { state.activeUser = payload},
        clearUser: (state) => { state.activeUser = {} },
        setUserLoading: (state, { payload }) => { state.loading = payload },
    }
})

export const { storeUser, clearUser, setUserLoading } = userSlice.actions;
export default userSlice.reducer;