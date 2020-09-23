import React, { useContext, useEffect, useState } from "react";
import { Row, Container } from "../components/Grid";
import Navbar from "../components/Navbar";
import Col from "../components/Col";
import MatchCards from "../components/MatchCards";
import { MessageButton } from "../components/Button";
import "../components/MatchCards/images/small-profile-pic-one.png";
import Map from "../components/map";
import UserContext from "../utils/UserContext";
import API from "../utils/API";


function Matches() {
  const { user , userForMatchesPage } = useContext(UserContext)
  const [finalUser, setFinalUser] = useState([]) 
  const [isLoading, setIsLoading] = useState(true)
  console.log("userForMatchesPage" , userForMatchesPage)

useEffect(()=>{
  if(userForMatchesPage.length === null){
    setIsLoading(true)
  }if(userForMatchesPage.length > 0){
    setIsLoading(false)
    setFinalUser(userForMatchesPage)
    console.log("I have loaded", finalUser)
  }
},[isLoading , userForMatchesPage.length]
)
  if(isLoading){
    return (
      <div>
      <Navbar />
    <div>Loading</div>
    </div>
    )
  }
  if(!isLoading){
    return (
      <div>
        <Navbar />
        <div style={{ backgroundColor:"rgb(232, 86, 86)", textAlign: "center" , width:"80%" ,  height:"110px" , paddingTop:"2%"  , borderRadius : "25px" , marginLeft:"9%" , marginBottom:"3%" , fontFamily: "Georgia, serif"}}>
          {/* top     right      bottom      left  */}
        <h2 style={{ color:"white" , fontSize:"45px"}}>{user.userName}'s Matches</h2>
        {/* <div className="line" style={{ border: "solid black 2px", margin: "4% 10% 5% 10%" }}></div> */}
        </div>
        <Container fixed>
          <Row>
            <Col size="md-12">
              <MatchCards
                arrayData={finalUser}
                message={" sent you a message, reply now!"}
                image="https://cdn.iconscout.com/icon/free/png-256/user-avatar-contact-portfolio-personal-portrait-profile-6-5623.png"
                {...MessageButton}
              />
            </Col>
      </Row>
            <div style={{ backgroundColor:"rgb(232, 86, 86)", textAlign: "center" , width:"80%" ,  height:"110px" , paddingTop:"2%"  , borderRadius : "25px" , marginLeft:"9%" , marginBottom:"2%" , marginTop:"5%" , fontFamily: "Georgia, serif"}}>
            <h3 style={{ color:"white" , fontSize:"45px"}}>Meet up at a pet-friendly park near you</h3>
            {/* <div className="line" style={{ border: "solid black 2px", margin: "4% 10% 5% 10%" }}></div> */}
            </div>
      <Map />
    </Container>
    </div>
    ); 
      }
      }

  

export default Matches;