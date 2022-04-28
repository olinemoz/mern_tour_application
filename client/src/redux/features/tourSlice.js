import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api"

export const createTour = createAsyncThunk(
    "tour/createTour",
    //It will receive 1 parameter only. So we have to send object  want to pass multiple property
    async ({newTourData, navigate, toast}, {rejectWithValue}) => {
        try {
            const response = await api.createTour(newTourData);
            toast.success("Tour Added successfully!");
            navigate("/");
            // console.log("Created tour: ",response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
export const getTours = createAsyncThunk(
    "tour/getTours",
    async (_,{rejectWithValue}) => {
        try {
            const response = await api.getTours();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
export const getTour = createAsyncThunk(
    "tour/getTour",
    async (id,{rejectWithValue}) => {
        try {
            const response = await api.getTour(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const tourSlice = createSlice({
    name: 'tour',
    initialState: {
        tour: {},
        tours: [],
        userTours: [],
        error: "",
        loading: false
    },
    reducers: {},
    extraReducers: {
        [createTour.pending]: (state, action) => {
            state.loading = true;
        },
        [createTour.fulfilled]: (state, action) => {
            state.loading = false;
            state.tours = [action.payload];
        },
        [createTour.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getTours.pending]: (state, action) => {
            state.loading = true;
        },
        [getTours.fulfilled]: (state, action) => {
            state.loading = false;
            state.tours = action.payload;
        },
        [getTours.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getTour.pending]: (state, action) => {
            state.loading = true;
        },
        [getTour.fulfilled]: (state, action) => {
            state.loading = false;
            state.tour = action.payload;
        },
        [getTour.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
})

// export const {} = tourSlice.actions;
export default tourSlice.reducer;