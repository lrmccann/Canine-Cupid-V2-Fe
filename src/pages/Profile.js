import React, { useContext }  from "react";
import UserContext from "../utils/UserContext";
import { Row, Container } from "../components/Grid";
import Card from "../components/Card";
import ProfDetails from "../components/ProfDetails";
import Col from "../components/Col";
import Navbar from "../components/Navbar";
import { EditProfileButton } from "../components/Button";
import Map from "../components/map";
import Moment from 'react-moment';

let Profile = () => {
    const { user } = useContext(UserContext)
    console.log("user profile page",user);

    let interests = "";
    let vaccinated = "";
    let trained = "";

    // if ('park' in user && user.park === "on")
    if (user.vaccinated === true){
        vaccinated = "Yes" 
    } else if (user.vaccinated === false){
        vaccinated = "No"
    }

    if (user.trained === true){
        trained = "Yes" 
    } else if (user.trained === false){
        trained = "No"
    }
    
    if (user.park === true)
        { interests = interests + "Playing in the Park. " }
    if (user.ball === true)
        { interests = interests + "Playing with a ball. " }
    if (user.frisbee === true)
        { interests = interests + "Playing with a frisbee. " }


    let readableDate = <Moment format="YYYY/MM/DD">{user.date}</Moment>

    return (
        <div>
            <Navbar/>
            <h2 style={{fontFamily: "Georgia, serif" , margin: "0 0 0 35.5%" }}>Welcome to your profile {user.userName}!</h2>
            <div className="line" style={{ border: "solid black 2px", margin: "4% 10% 5% 10%" }}></div>
            <Container fluid>
                <Row-fluid>
                    <Col size="md-12">                        
                        <Card petName={user.petName} photoUrl={user.photoUrl}>
                        <div style={{marginTop:"1%", marginLeft:"5%"}}>Pet name: &nbsp;&nbsp;{user.petName}</div> 
                        <div style={{marginTop:"5%", marginLeft:"5%"}}>Breed: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.breed}</div> 
                        <div style={{marginTop:"5%", marginLeft:"5%"}}>Age: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.age}</div>
                        <div style={{marginTop:"5%", marginLeft:"5%"}}>Vaccinated: {vaccinated}</div>
                        <div style={{marginTop:"5%", marginLeft:"5%"}}>Trained: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{trained}</div>
                        </Card>
                    </Col>
                </Row-fluid>
                <Row>
                    <Col size="md-11">
                    <ProfDetails>
                    <div>User Name : {user.userName} </div>
                    <div style={{paddingTop: "3%"}} >Location: &nbsp;&nbsp;&nbsp;&nbsp;{user.city}</div>
                    <div style={{paddingTop: "3%"}}>Zip Code: &nbsp;&nbsp;&nbsp;&nbsp;{user.zipCode} </div>
                    <div style={{paddingTop: "3%"}}>Join Date: &nbsp;&nbsp;&nbsp;{readableDate}</div>
                    {/* <div style={{paddingTop: "3%"}}>About my pet: &nbsp;&nbsp;{user.info}</div> */}
                    <div style={{paddingTop: "3%"}}>About my pet: &nbsp;{interests}</div>
                    <EditProfileButton/>
                    </ProfDetails>
                    </Col>
                </Row>
                 <Col size="md-12">
                    <h1 className="mapText" style={{marginTop:"7.5%"}}>Pet-friendly parks near you</h1>
                    <div className="line" style={{ border: "solid black 2px", margin: "4% 10% 5% 10%" }}></div>
                </Col>
                <Map />
            </Container>
        </div>
    )
}

export default Profile;