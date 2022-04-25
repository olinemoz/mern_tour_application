import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api"

export const login = createAsyncThunk(
    "auth/login",
    //It will receive 1 parameter only. So we have to send object  want to pass multiple property
    async ({userData, navigate, toast},{rejectWithValue}) => {
        try {
            const response = await api.signIn(userData);
            toast.success("Logged in successfully!");
            navigate("/");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const register = createAsyncThunk(
    "auth/register",
    async ({userData, navigate, toast}, {rejectWithValue}) => {
        try {
            const response = await api.signUp(userData);
            toast.success("Successfully registered!");
            navigate("/");
            return response.data;
        }catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const googleSignIn = createAsyncThunk(
    "auth/googleSignIn",
    async ({result, navigate, toast}, {rejectWithValue}) => {
        try {
            const response = await api.googleSignIn(result);
            toast.success("Google signed in successfully!");
            navigate("/");
            return response.data;
        }catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: "",
        loading: false
    },
    reducers: {},
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            window.localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.user = action.payload;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [register.pending]: (state, action) => {
            state.loading = true;
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            window.localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.user = action.payload;
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [googleSignIn.pending]: (state, action) => {
            state.loading = true;
        },
        [googleSignIn.fulfilled]: (state, action) => {
            state.loading = false;
            window.localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.user = action.payload;
        },
        [googleSignIn.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
})

export const {} = authSlice.actions;
export default authSlice.reducer;