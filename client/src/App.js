import React from 'react';
import {Routes, Route} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
    return (
        <div className="App">
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </div>
    );
};

export default App;