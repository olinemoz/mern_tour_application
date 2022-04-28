import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

const LoadingToRedirectRoute = () => {
    let [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(--count)
        },1000)
        if(count === 0){
            navigate("/login")
        }
        return () => clearInterval(interval)
    },[count,navigate])
    return (
        <div style={{marginTop: "100px"}}>
            <h5>Redirecting you in {count} seconds!</h5>
        </div>
    );
};

export default LoadingToRedirectRoute;