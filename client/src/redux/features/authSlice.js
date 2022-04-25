import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: "",
        loading: false
    },
    reducers: {},
    extraReducers: {}
})

export const {} = authSlice.actions;
export default authSlice.reducer;