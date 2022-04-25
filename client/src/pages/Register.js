import React, {useEffect, useState} from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBIcon,
    MDBInput,
    MDBSpinner,
    MDBValidation
} from "mdb-react-ui-kit";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../redux/features/authSlice";

const Register = () => {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const {loading, error} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (error){
            toast.error(error);
        }
    }, [error])

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setUserData({
            ...userData,
            [name]: value
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if(userData.password !== userData.confirmPassword){
            return toast.error("Password did not matched!");
        }

        if(userData.email && userData.password && userData.firstName && userData.lastname){
            dispatch(register({userData, navigate, toast}))
        }
    }

    return (
        <div style={{margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px"}}>
            <MDBCard alignment="center">
                <MDBIcon fas icon="user-circle" className="fa-2x"/>
                <h5>Sign up</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
                        <div className="col-md-6">
                            <MDBInput
                                label="First Name"
                                type="text"
                                value={userData.firstName}
                                name="firstName"
                                onChange={handleInputChange}
                                required
                                invalid="true"
                                validation="Please provide your First Name!"
                            />
                        </div>
                        <div className="col-md-6">
                            <MDBInput
                                label="Last Name"
                                type="text"
                                value={userData.lastName}
                                name="lastName"
                                onChange={handleInputChange}
                                required
                                invalid="true"
                                validation="Please provide your First Name!"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Email"
                                type="email"
                                value={userData.email}
                                name="email"
                                onChange={handleInputChange}
                                required
                                invalid="true"
                                validation="Please provide your email!"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Password"
                                type="password"
                                value={userData.password}
                                name="password"
                                onChange={handleInputChange}
                                required
                                invalid="true"
                                validation="Please provide your password!"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Confirm Password"
                                type="password"
                                value={userData.confirmPassword}
                                name="confirmPassword"
                                onChange={handleInputChange}
                                required
                                invalid="true"
                                validation="Please provide your confirm password!"
                            />
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{width: '100%'}} className="mt-2">
                                {loading && (
                                    <MDBSpinner
                                        size="sm"
                                        role="status"
                                        tag="span"
                                        className="me-2"
                                    />
                                )}
                                Register
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/login">
                        <p>Already have an account? Login</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    );
};

export default Register;