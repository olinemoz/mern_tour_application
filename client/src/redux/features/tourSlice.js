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

export const getToursByUser = createAsyncThunk(
    "tour/getToursByUser",
    async (userId,{rejectWithValue}) => {
        try {
            const response = await api.getToursByUser(userId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const deleteTour = createAsyncThunk(
    "tour/deleteTour",
    async ({tourId, toast},{rejectWithValue}) => {
        try {
            const response = await api.deleteTour(tourId);
            toast.success("Tour has been deleted successfully!");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
export const updateTour = createAsyncThunk(
    "tour/updateTour",
    async ({tourId,updatedTourData, toast, navigate},{rejectWithValue}) => {
        try {
            const response = await api.updateTour(updatedTourData,tourId);
            toast.success("Tour has been updated successfully!");
            navigate("/")
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
        [getToursByUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getToursByUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userTours = action.payload;
        },
        [getToursByUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [deleteTour.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteTour.fulfilled]: (state, action) => {
            state.loading = false;
            const {arg: {tourId}} = action.meta;
            if(tourId){
                    state.userTours = state.userTours.filter(item => item._id !== tourId)
                    state.tours = state.tours.filter(item => item._id !== tourId)
            }
        },
        [deleteTour.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [updateTour.pending]: (state, action) => {
            state.loading = true;
        },
        [updateTour.fulfilled]: (state, action) => {
            state.loading = false;
            const {arg: {tourId}} = action.meta;
            if(tourId){
                state.userTours = state.userTours.map(item => item._id === tourId ? action.payload : item)
                state.tours = state.tours.map(item => item._id === tourId ? action.payload : item)
            }
        },
        [updateTour.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
})

// export const {} = tourSlice.actions;
export default tourSlice.reducer;