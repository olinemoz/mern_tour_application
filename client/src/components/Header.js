import React, {useState} from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand
} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux";
import {loggedOut} from "../redux/features/authSlice";

const Header = () => {
    const [show, setShow] = useState(false);
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <MDBNavbar fixed="top" expand="lg" style={{backgroundColor: '#f0e6ea'}}>
            <MDBContainer>
                <MDBNavbarBrand href="/" style={{color: '#606080', fontWeight: "600", fontSize: "22px"}}>
                    Nice Tour
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    type="button"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{color: '#606080'}}
                    onClick={() => setShow(!show)}
                >
                    <MDBIcon icon="bars" fas/>
                </MDBNavbarToggler>
                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                        {
                            (user?.result?._id) && (
                                <h5 style={{marginRight: '30px', marginTop: "16px"}}>Hello, {user?.result?.name}!</h5>
                            )
                        }
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/">
                                <p className="header-text">Home</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {
                            (user?.result?._id) && (
                                <>
                                    <MDBNavbarItem>
                                        <MDBNavbarLink href="/addTour">
                                            <p className="header-text">Add Tour</p>
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>
                                    <MDBNavbarItem>
                                        <MDBNavbarLink href="/dashboard">
                                            <p className="header-text">Dashboard</p>
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>
                                </>
                            )
                        }
                        {
                            (user?.result?._id) ? (
                                <>
                                    <MDBNavbarItem>
                                        <MDBNavbarLink href="/login" onClick={() => dispatch(loggedOut())}>
                                            <p className="header-text">Logout</p>
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>
                                </>
                            ) : (
                                <>
                                    <MDBNavbarItem>
                                        <MDBNavbarLink href="/login">
                                            <p className="header-text">Login</p>
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>
                                </>
                            )
                        }
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default Header;