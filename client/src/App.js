import React, {useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import {useDispatch} from "react-redux";
import {loggedIn} from "./redux/features/authSlice";
import AddEditTour from "./pages/AddEditTour";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        //Keep LoggedIn User with Local Storage
        const user = JSON.parse(window.localStorage.getItem('profile'));
        if (user) {
            dispatch(loggedIn(user));
        }
    }, [dispatch])
    return (
        <div className="App">
            <Header/>
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/addTour" element={<AddEditTour/>}/>
                <Route path="/editTour/:id" element={<AddEditTour/>}/>
            </Routes>
        </div>
    );
};

export default App;