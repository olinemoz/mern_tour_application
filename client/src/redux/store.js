import {configureStore} from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice"
import TourReducer from "./features/tourSlice"

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        tour: TourReducer,
    },
})