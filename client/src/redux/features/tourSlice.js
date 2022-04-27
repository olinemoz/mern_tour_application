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
    }
})

// export const {} = tourSlice.actions;
export default tourSlice.reducer;