import React, {useState} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCardFooter,
    MDBValidation,
    MDBBtn,
    MDBIcon,
    MDBSpinner
} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";

const Login = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });
    const {email, password} = userData;

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
        console.log("submitted: ",userData)
    }

    return (
        <div style={{margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px"}}>
            <MDBCard alignment="center">
                <MDBIcon fas icon="user-circle" className="fa-2x" />
                <h5>Sign in</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
                        <div className="col-md-12">
                            <MDBInput
                                label="Email"
                                type="email"
                                value={email}
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
                                value={password}
                                name="password"
                                onChange={handleInputChange}
                                required
                                invalid="true"
                                validation="Please provide your password!"
                            />
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{width: '100%'}} className="mt-2">
                                    Login
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/register">
                        <p>Don't have an account? Sign Up</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    );
};

export default Login;