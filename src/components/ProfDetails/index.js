import React, {useContext, useEffect, useState} from "react"
import Col from "../Col"
import "./style.css"
import UserContext from "../../utils/UserContext";
import Moment from 'react-moment';

function ProfDetails(props) {
    const {user} = useContext(UserContext)
    const [callBackStuff , setCallBackStuff] = useState(props)
    console.log(props, "hello qsdaf")
    const [dogDetails , setDogDetails] = useState(true)
    const [userDetails , setUserDetails] = useState(false) 

console.log(callBackStuff)

    if(dogDetails === true){
        return (
            <div className="container">
            <Col size="md-12">
                <div className="profDetails">
                    <div className="content">
                        <h2 style={{textAlign: "center" , marginBottom:"2.5%"}}>Profile Details</h2>
                        <div style={{marginBottom:"2%"}} className="line"></div>
                        <h4  className="contentOne">{props.children}</h4>
                        {/* <h4>Username:&nbsp;&nbsp; {user.userName}</h4>
                        <h4>Location:&nbsp;&nbsp;&nbsp; {user.city}&nbsp;,&nbsp;&nbsp;&nbsp; {user.zipCode} </h4>
                        <h4>About pet:&nbsp; {user.info}</h4>
                        <h4>Join Date:&nbsp;&nbsp;&nbsp; */}
                        {/* </h4> */}
                    </div>
                </div>
            </Col>
            </div>
        )
        
    }
}
export default ProfDetails;
