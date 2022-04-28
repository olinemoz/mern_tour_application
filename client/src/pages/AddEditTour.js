import * as React from 'react';
import {useEffect, useState} from "react";
import {MDBCard, MDBCardBody, MDBValidation, MDBBtn, MDBInput} from "mdb-react-ui-kit";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import FileBase64 from "react-file-base64";
import {useDispatch, useSelector} from "react-redux";
import {createTour, updateTour} from "../redux/features/tourSlice";


const AddEditTour = () => {
    const [tourData, setTourData] = useState({
        title: "",
        description: "",
        tags: [],
    });

    const {error, userTours} = useSelector(state => state.tour);
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            const singleTour = userTours.find(tour => tour._id === id);
            setTourData({...singleTour})
        }
    }, [id, userTours])

    useEffect(() => {
        if (error) {
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
        if (tourData.title && tourData.description) {
            const newTourData = {...tourData, name: user?.result?.name};
            if (!id) {
                dispatch(createTour({newTourData, navigate, toast}));
            } else {
                dispatch(updateTour({tourId: id, updatedTourData: newTourData, toast, navigate}))
            }
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
                <h5>{id ? "Update Tour" : "Add Tour"}</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
                        <div className="col-md-12">
                            <MDBInput
                                type="text"
                                placeholder="Enter title..."
                                value={tourData.title || ""}
                                name="title"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid="true"
                                validation="Please provide title"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                type="text"
                                placeholder="Enter description..."
                                value={tourData.description}
                                name="description"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                textarea
                                rows={4}
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
                            <MDBBtn style={{width: '100%'}} type="submit">{id ? "Update" : "Add Blog"}</MDBBtn>
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