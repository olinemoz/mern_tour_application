import React from 'react';
import {useSelector} from "react-redux";
import LoadingToRedirectRoute from "./LoadingToRedirectRoute";

const PrivateRoute = ({children}) => {
    const {user} = useSelector(state => state.auth);

    return user ? children : <LoadingToRedirectRoute />
};

export default PrivateRoute;