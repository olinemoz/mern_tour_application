import * as React from 'react';
import {useEffect, useState} from "react";
import {MDBCard, MDBCardBody, MDBCardFooter, MDBValidation, MDBBtn, MDBSpinner} from "mdb-react-ui-kit";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import FileBase64 from "react-file-base64";
import {useDispatch, useSelector} from "react-redux";
import {createTour} from "../redux/features/tourSlice";


const AddEditTour = () => {
    const [tourData, setTourData] = useState({
        title: "",
        description: "",
        tags: [],
    });
    const {error, loading} = useSelector(state => state.tour);
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(error){
            toast.error(error)
        }
    }, [error])
    const onInputChange = event => {
      const name = event.target.name;
      const value = event.target.value;
      setTourData({
          ...tourData,
          [name]: value
      })
    }
    const handleClear = () => {
        setTourData({
            title: "",
            description: "",
            tags: [],
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        if(tourData.title && tourData.description){
            const newTourData = {...tourData, name: user?.result?.name};
            dispatch(createTour({newTourData,navigate,toast}));
            handleClear();
        }
    }

    return (
        <div className="container"
             style={{
                 margin: "auto",
                 padding: "15px",
                 maxWidth: "450px",
                 alignContent: "center",
                 marginTop: "120px"
             }}>
            <MDBCard alignment="center">
                <h5>Add Tour</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
                        <div className="col-md-12">
                            <input
                                type="text"
                                placeholder="Enter title..."
                                value={tourData.title}
                                name="title"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid="true"
                                validation="Please provide title"
                            />
                        </div>
                        <div className="col-md-12">
                        <textarea
                            type="text"
                            placeholder="Enter description..."
                            value={tourData.description}
                            style={{height: "100px"}}
                            name="description"
                            onChange={onInputChange}
                            className="form-control"
                            required
                            invalid="true"
                            validation="Please provide description"
                        />
                        </div>
                        <div className="d-flex justify-content-start">
                            <FileBase64
                                type="file"
                                multiple={false}
                                onDone={({base64}) => setTourData({...tourData, imageFile: base64})}
                            />
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{width: '100%'}} type="submit">Submit</MDBBtn>
                            <MDBBtn style={{width: '100%'}} className="mt-2" color="danger"
                                    onClick={handleClear}>Clear</MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};

export default AddEditTour;