import React from 'react';
import {MDBCard,MDBCardBody,MDBCardTitle,MDBCardText,MDBCardImage,MDBCardGroup} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";

const CardTour = ({imageFile, description, title, tags, _id, name}) => {

    const excerpt = string => {
        if(string.length > 45){
            string = string.substring(0,45) + "..."
        }
        return string;
    }
    return (
        <MDBCardGroup>
            <MDBCard className="mt-2 h-100 d-sm-flex" style={{maxWidth: "20rem"}}>
                <MDBCardImage
                    src={imageFile}
                    alt={title}
                    position="top"
                    style={{
                        maxWidth: "100%",
                        height: "180px"
                    }}
                />
                <div className="top-left">{name}</div>
                <span className="text-start tag-card">
                    {tags && tags.map(tag => `${tag}`)}
                </span>
                <MDBCardBody>
                    <MDBCardTitle className="text-start">{title}</MDBCardTitle>
                    <MDBCardText className="text-start">
                        {excerpt(description)}
                        <Link to={`/tour/${_id}`}>
                            Read More
                        </Link>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </MDBCardGroup>
    );
};

export default CardTour;