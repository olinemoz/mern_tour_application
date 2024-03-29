import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000"
})

API.interceptors.request.use((req) => {
    if(window.localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${
            JSON.parse(window.localStorage.getItem('profile')).token
        }`
    }
    return req;
})

export const signIn = (userData) => {
    return API.post("/users/signin", userData)
}
export const signUp = (userData) => {
    return API.post("/users/signup", userData)
}
export const googleSignIn = (result) => {
    return API.post("/users/googleSignIn", result)
}

export const createTour = (tourData) => {
    return API.post("/tour",tourData)
}
export const getTours = () => {
    return API.get("/tour")
}
export const getTour = (id) => {
    return API.get(`/tour/${id}`)
}
export const getToursByUser = (userId) => {
    return API.get(`/tour/userTours/${userId}`)
}
export const deleteTour = (tourId) => {
    return API.delete(`/tour/${tourId}`)
}
export const updateTour = (updatedTourData, tourId) => {
    return API.patch(`/tour/${tourId}`,updatedTourData)
}