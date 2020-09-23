import React, { useContext ,useState } from "react";
import UserContext from "../utils/UserContext";
import { Row, Container } from "../components/Grid";
import Card from "../components/Card";
import ProfDetails from "../components/ProfDetails";
import Col from "../components/Col";
import Navbar from "../components/Navbar";
import { EditProfileButton } from "../components/Button";
import Map from "../components/map";
import Moment from 'react-moment';

let Profile = (props) => {
    const { user } = useContext(UserContext)
    const [clicked , setClicked] = useState("hello")
    console.log("user profile page", user);

    let interests = "";
    let vaccinated = "";
    let trained = "";

    // if ('park' in user && user.park === "on")
    if (user.vaccinated === true) {
        vaccinated = "Yes"
    } else if (user.vaccinated === false) {
        vaccinated = "No"
    }

    if (user.trained === true) {
        trained = "Yes"
    } else if (user.trained === false) {
        trained = "No"
    }

    if (user.park === true) { interests = interests + "Playing in the Park. " }
    if (user.ball === true) { interests = interests + "Playing with a ball. " }
    if (user.frisbee === true) { interests = interests + "Playing with a frisbee. " }

    let readableDate = <Moment format="YYYY/MM/DD">{user.date}</Moment>
    console.log(props)
    console.log(clicked)
    return (
        <div>
            <Navbar
            color="white"
            />
            <div style={{ backgroundColor: "rgb(232, 86, 86)", textAlign: "center", width: "80%", height: "110px", paddingTop: "2%", borderRadius: "25px", marginLeft: "9%", marginBottom: "6.5%", fontFamily: "Georgia, serif" }}>
                <h2 style={{ color: "white", fontSize: "45px" }}>Welcome to your profile {user.userName}!</h2>
            </div>
            <Container fluid>
                <Row-fluid>
                    <Col size="md-12">
                        <Card petName={user.petName} petPhotoUrl={user.petPhotoUrl} messageTwo={"Dog Pic"} message = {"My Pic"} img1 = {user.petPhotoUrl} img2={user.userPhotoUrl} >
                            <div style={{float:"left" , width:"50%" }}>
                            <div style={{ marginLeft: "5%" , fontSize:"25px" }}>Pet name: &nbsp;&nbsp;{user.petName}</div>
                            <div style={{ paddingTop: "2.5%", marginLeft: "5%" , fontSize:"25px" }}>Breed: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.breed}</div>
                            <div style={{ paddingTop: "2.5%", marginLeft: "5%" , fontSize:"25px" }}>Age: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.age}</div>
                            </div>
                            <div style={{float: "left" ,width:"50%" }}>
                            <div style={{ marginLeft: "5%" , fontSize:"25px"  }}>Vaccinated: {vaccinated}</div>
                            <div style={{ marginTop: "2.5%", marginLeft: "5%" , fontSize:"25px" }}>Trained: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{trained}</div>
                            <div style={{ paddingTop: "2.5%", marginLeft: "5%" , fontSize:"25px" }}>Interests: &nbsp;{interests}</div>
                            </div>
                        </Card>
                    </Col>
                </Row-fluid>
                <Row>
                    <Col size="md-11">
                        <ProfDetails callbackStuff={setClicked}>
                            <div style={{ paddingTop: "2%" , marginLeft: "2.5%" }}>User Name : {user.userName} </div>
                            <div style={{ paddingTop: "4%" , marginLeft: "2.5%" }} >Location: &nbsp;&nbsp;&nbsp;&nbsp;{user.city}</div>
                            <div style={{ paddingTop: "4%" , marginLeft: "2.5%" }}>Zip Code: &nbsp;&nbsp;&nbsp;&nbsp;{user.zipCode} </div>
                            <div style={{ paddingTop: "4%" , marginLeft: "2.5%" }}>Join Date: &nbsp;&nbsp;&nbsp;{readableDate}</div>
                            <div style={{ paddingTop: "4%" , marginLeft: "2.5%" }}>More about my pet: &nbsp;&nbsp;{user.info}</div>
                            {/* <div style={{paddingTop: "3%"}}>About my pet: &nbsp;{interests}</div> */}
                            <EditProfileButton />
                        </ProfDetails>
                    </Col>
                </Row>
                <Col size="md-12">
                    <div style={{ backgroundColor: "rgb(232, 86, 86)", textAlign: "center", width: "80%", height: "110px", paddingTop: "2%", borderRadius: "25px", marginLeft: "9%", marginTop:"10%" , fontFamily: "Georgia, serif" }}>
                        <h2 style={{ color: "white", fontSize: "45px" }}>Pet-friendly parks near you</h2>
                    </div>
                </Col>
                <Map />
            </Container>
        </div>
    )
}

export default Profile;