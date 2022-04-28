import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {MDBCard,MDBCardBody,MDBCardText,MDBCardImage, MDBContainer, MDBIcon} from "mdb-react-ui-kit";
import moment from "moment";
import {getTour} from "../redux/features/tourSlice";

const SingleTour = () => {
    const {tour} = useSelector(state => state.tour);
    const dispatch = useDispatch();
    const {id} = useParams();
    useEffect(() => {
        if(id){
            dispatch(getTour(id));
        }
    },[id, dispatch])
    return (
        <MDBContainer>
            <MDBCard className="mb-3 mt-2">
                <MDBCardImage
                    src={tour.imageFile}
                    alt={tour.title}
                    position="top"
                    style={{
                        maxHeight: "600px",
                        width: "100%"
                    }}
                />
                <MDBCardBody>
                    <h3>{tour.title}</h3>
                    <span>
                        <p className="text-start tourName">Created By: {tour?.name}</p>
                    </span>
                    <div style={{float: "left"}}>
                        <span className="text-start">
                            {tour && tour.tags && tour.tags.map(item => `#${item}`)}
                        </span>
                    </div>
                    <br/>
                    <MDBCardText className="text-start mt-2">
                        <MDBIcon
                            style={{float: "left", margin: "5px"}}
                            far
                            icon="calendar-alt"
                            size="lg"
                        />
                        <small className="text-muted">
                            {moment(tour.createdAt).fromNow()}
                        </small>
                    </MDBCardText>
                    <MDBCardText className="lead text-start mb-0">
                        {tour.description}
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default SingleTour;