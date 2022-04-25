import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000"
})

export const signIn = (userData) => {
    return API.post("users/signin", userData)
}
export const signUp = (userData) => {
    return API.post("users/signup", userData)
}
export const googleSignIn = (result) => {
    return API.post("users/googleSignIn", result)
}