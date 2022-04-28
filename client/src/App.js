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
import SingleTour from "./pages/SingleTour";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";

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
                <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
                <Route path="/addTour" element={<PrivateRoute><AddEditTour/></PrivateRoute>}/>
                <Route path="/editTour/:id" element={<PrivateRoute><AddEditTour/></PrivateRoute>}/>
                <Route path="/tour/:id" element={<PrivateRoute><SingleTour/></PrivateRoute>}/>
                <Route path="*" element={<NotFound />}/>
            </Routes>
        </div>
    );
};

export default App;