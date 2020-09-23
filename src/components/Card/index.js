import React, { useState } from "react";
import Col from "../Col";
import Profile from "../../pages/Profile";
import "./style.css";


function Card(props) {
  const [petPhoto , setPetPhoto] = useState()
  const [userPhoto , setUserPhoto] = useState()
  const [userPhotoLoaded, setUserPhotoLoaded] = useState(false)
  const [petPhotoLoaded, setPetPhotoLoaded] = useState(true)
  console.log(props)
  function switchPictures(){
    if(props.img2 === undefined){
      setUserPhotoLoaded(false)
      return(
        <div>Loading</div>
      )
    } else{
      setUserPhoto(props.img2)
      setPetPhoto(props.img1)
      setUserPhotoLoaded(true)
      setPetPhotoLoaded(false)
      console.log(props.img2)
    }
  }
  function switchPicturesTwo(){
    if(petPhotoLoaded === false){
      setPetPhotoLoaded(true)
    }
  }

  if(petPhotoLoaded === true){
    return (
      <Col size="md-6">
        <div style={{ width: "20%" , float:"left", marginLeft:"8.2%" }}><button onClick={switchPictures} style={{height:"50px" , width:"128px", backgroundColor:"rgb(232, 86, 86" , color:"white" , border: "none" , fontSize:"25px" , padding: "5%"}}>{props.message}</button></div>
        <div className="card">
          <div className="img-container">
            <img alt={props.petName} src={props.petPhotoUrl} />
          </div>
          <h4 className="content-card" >{props.children}
          </h4>
        </div>
      </Col>
    );
  } if(userPhotoLoaded === true){
    return (
      <Col size="md-6">
        <div style={{ width: "20%" , float:"left", marginLeft:"8.2%" }}><button onClick={switchPicturesTwo} style={{height:"50px" , width:"128px", backgroundColor:"rgb(232, 86, 86" , color:"white" , border: "none" , fontSize:"25px" , padding: "5%"}}>{props.messageTwo}</button></div>
        <div className="card">
          <div className="img-container">
            <img alt={props.userName} src={userPhoto} />
          </div>
          <h4 className="content-card" >{props.children}
          </h4>
        </div>
      </Col>
    );
  }

}
export default Card;



