import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import API from "../utils/API";
import UserContext from "../utils/UserContext"
import { Col, Row, Container } from "../components/Grid";
import { Input, Checkbox, TextArea, FormBtn } from "../components/Form";
import Navbar from "../components/Navbar";
import Modal from 'react-bootstrap/Modal';
import { ModalButton } from "../components/Button";
import RadioButton from "../components/RadioButton"
import "./Signup.css"

function Signup() {
  
  const { getData, getAllUsersNames } = useContext(UserContext)
  const history = useHistory();
  const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  ///////////////////+++++++++++++++++////////////////////
  const [checkVaccinated, setCheckVaccinated] = useState(false) 
  const [checkTrained, setCheckTrained] = useState(false)
  const [checkPark, setCheckPark] = useState(false) 
  const [checkBall, setCheckBall] = useState(false) 
  const [checkFrisbee, setCheckFrisbee] = useState(false)

  console.log("checkVaccinated", checkVaccinated);
  console.log("checkTrained", checkTrained);
  console.log("checkPark", checkPark);
  console.log("checkBall", checkBall);
  console.log("checkFrisbee", checkFrisbee);
   
  ////////////// Code for Modal //////
  const [isOpen, setIsOpen] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState();
  const showModal = (errorMsg) => {
    setIsOpen(true);
    setIsErrorMessage(errorMsg);
  };
  const hideModal = () => {
    setIsOpen(false);
  };
  ///////////////////////////////////

  const [formObject, setFormObject] = useState({})
  console.log("formObject", formObject);

  async function getAllNames (sessionToken,arrYes) {
    console.log("getAllNames")
    await API.getAllUsers(sessionToken)
    .then((res)=>{
      //  arr1 of all users Names received in response get filtered to exclude Logged user from the array, result in arr2
      const arr1 = res.data;
      function checkUserName(name) {
        if (name!==formObject.userName){
          return name;
        }
      }
      const arr2 = arr1.filter(checkUserName)

      // arrYes conteined users name mutched by Loged user, all those name should be exlused from arr2, result in data
      const filteredNames = function () {
        const arr3 = arr2.filter(e=>arrYes.findIndex(i=>i === e) === -1);
        return arr3;
      };

      const data = filteredNames();

      getAllUsersNames(data)}
    )
  }
  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };
  // Then alert the User if the User name had been taken otherwise update Context with new User data
  function handleSignupResponse(res) {
    console.log("res.data", res.data)
    if (res.data === "User name already taken.") {
      let errorMsg = res.data;
      showModal(errorMsg);
    } else {
      console.log("res.data", res.data)
      getData(res.data);
      getAllNames(res.data.sessionToken,res.data.matchesYes);
      history.push("/profile");
    };
  };
  //--------------------------
  function formFrontendValidations() { 
    let validEmailFormat = validEmailRegex.test(formObject.email)
    let userNameValid = 'userName' in formObject && (formObject.userName.length > 4 && formObject.userName.length < 21)
    let passwordValid = 'password' in formObject && (formObject.password.length > 4 && formObject.password.length < 21)
    let emailValid = 'email' in formObject && formObject.email.length > 0 && validEmailFormat
    let petNameValid = 'petName' in formObject && formObject.petName.length > 0    
    console.log("valids", userNameValid, passwordValid, emailValid, petNameValid) 
    let fieldsValid = userNameValid && passwordValid && emailValid && petNameValid
    if (!fieldsValid) {
      let errorMsg = "Please fill ALL the required fields correctly i.e. Username (5-20 characters) , Password (5-20 Characters) , Email (in valid @format) and Petname (required)";
      showModal(errorMsg);
      return false
    }
    else {
      return true
    };
  };
  // -------------------------------------------------- 
  
  // When the form is submitted, use the API.saveUser method to save the User data
  function handleFormSubmit(event) {
    event.preventDefault();
    let formValid = formFrontendValidations();
    console.log("formValid", formValid)
    if (formValid === true) {
      API.saveUser({
        password: formObject.password,
        userData: {
          userName: formObject.userName,
          petName: formObject.petName,
          zipCode: formObject.zipCode,
          city: formObject.city,
          breed: formObject.breed,
          age: formObject.age,
          park: checkPark,
          ball: checkBall,
          frisbee: checkFrisbee,
          vaccinated: checkVaccinated,
          trained: checkTrained,
          email: formObject.email,
          petPhotoUrl: formObject.petPhotoUrl,
          userPhotoUrl: formObject.userPhotoUrl,          
          info: formObject.info
        }
      })
        .then(res => handleSignupResponse(res))
        .catch(error => console.log(error.response));
      };
    };
  
  return (
    <div>
      <h2 style={{ fontFamily: "Georgia, serif" , margin: "2.5% 0 0 44%" , fontSize:"50px" }}>Sign Up</h2>
      <div style={{ border: "solid black 1px", margin: "4% 10% 5% 10%" }}></div>
      <Container fluid>
        <form>
          <div className="userDetails" style={{backgroundColor: "white"}}>
            <div className="content">
              <Row>
              <h2 style={{marginLeft: "2%" , float:"left" }}>User Details</h2><p style={{marginLeft: "85%", marginBottom:"2%"}}>* Required Fields</p>
                <Col size="md-4">
                  <Input
                    onChange={handleInputChange}
                    type="text"
                    minLength="5"
                    maxLength="20"
                    size="40"
                    fontWeight="bolder"
                    label="User Name &nbsp;&nbsp; * "
                    name="userName"
                    placeholder="5-20 characters required"
                  />
                  <Input
                    onChange={handleInputChange}
                    type="email"
                    size="40"
                    label="Email &nbsp;&nbsp; * "
                    name="email"
                    placeholder="Email (Required and in email format)"
                  />
                    <Input
                    onChange={handleInputChange}
                    type="text"
                    size="40"
                    label="City: "
                    name="city"
                    placeholder="City"
                  />
                </Col>
                <Col size="md-4">
                <Input
                    onChange={handleInputChange}
                    type="text"
                    size="2000"
                    label="URL to your Photograph: "
                    name="userPhotoUrl"
                    placeholder="URL to your Photograph"
                  />
                  <Input
                    defaultValue=""
                    onChange={handleInputChange}
                    type="password"
                    minLength="5"
                    maxLength="20"
                    size="40"
                    label="Password &nbsp;&nbsp; * "
                    name="password"
                    placeholder="5-20 characters required"
                  />
                    <Input
                    onChange={handleInputChange}
                    type="number"
                    size="10"
                    label="Zipcode: "
                    name="zipCode"
                    placeholder="Zipcode"
                  />
                </Col>
              </Row>
            </div>
          </div>
          <div className="petDetails" style={{backgroundColor: "white"}}>
            <div className="content">
              <Row>
              <h2 style={{marginLeft: "2%" ,  float: "left"}}>Pet's Details</h2><p style={{marginLeft: "85%", marginBottom:"2%"}}>* Required Fields</p>
                <Col size="md-4">
                  <Input
                    onChange={handleInputChange}
                    type="text"
                    size="40"
                    label="Your Pet's Name &nbsp;&nbsp; * "
                    name="petName"
                    placeholder="Your Pet's Name (Required)"
                  />
                  <Input
                    onChange={handleInputChange}
                    type="text"
                    maxLength="50"
                    size="40"
                    label="Your Pet's Breed: "
                    name="breed"
                    placeholder="Your Pet's Breed"
                  />
                  <Input
                    onChange={handleInputChange}
                    type="number"
                    maxLength="3"
                    size="40"
                    label="Your Pet's Age in years: "
                    name="age"
                    placeholder="Your Pet's Age"
                  />
                  <Input
                    onChange={handleInputChange}
                    type="text"
                    size="2000"
                    label="URL to your Pet's Photograph: "
                    name="petPhotoUrl"
                    placeholder="URL to your Pet's Photograph"
                  />
                  <RadioButton
                    radioLabel = "Vaccinated:"
                    radioName = "vaccinated"
                    onChange={(event)=>setCheckVaccinated(event.target.value)}
                  />
                  <RadioButton
                    radioLabel = "Trained:"
                    radioName = "trained"
                    onChange={(event)=>setCheckTrained(event.target.value)}
                  />
                </Col>
                <Col size="md-4">               
                  <p>Your Pet's Interests:</p>
                  <label>
                    Playing in the park :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      type="checkbox"
                      name="park"                      
                      checked={checkPark}
                      onChange={(event)=>setCheckPark(event.target.checked)}      
                      // checked={state.park}                
                      // onChange={handleChange}
                      // onChange={(event)=>setCheckPark(event.target.value)}
                    />
                  </label>
                  <label>
                    Playing with a ball :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      type="checkbox"
                      name="ball"                      
                      checked={checkBall}
                      onChange={(event)=>setCheckBall(event.target.checked)} 
                    />
                  </label>
                  <label>
                    Playing with a frisbee :&nbsp;
                    <input
                      type="checkbox"
                      name="frisbee"                      
                      checked={checkFrisbee}
                      onChange={(event)=>setCheckFrisbee(event.target.checked)} 
                    />
                  </label>
                  {/* <Checkbox
                    onChange={handleInputChange}
                    label="Playing in the Park:  "
                    name="park"
                  />
                  <Checkbox
                    onChange={handleInputChange}
                    label="Playing with a Ball:  "
                    name="ball"
                  />
                  <Checkbox
                    onChange={handleInputChange}
                    label="Playing with a Frisbee:  "
                    name="frisbee"
                  /> */}
                  <TextArea
                    onChange={handleInputChange}
                    label="Additional Information about your Pet: "
                    name="info"
                    rows="8"
                    placeholder="Additional Information about your Pet"
                  />
                </Col>
              </Row>
              <Row>
                <Col size="md-4">
                  <FormBtn
                    disabled={!(formObject.userName && formObject.password && formObject.petName && formObject.email)}
                    onClick={handleFormSubmit}
                  >
                    Save Profile
                    </FormBtn>
                  {/* ----------------------Rendering Modal */}
                  <Modal className="my-modal" show={isOpen} onHide={hideModal}>
                    <Modal.Header>
                      <Modal.Title>Sorry!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{isErrorMessage}</Modal.Body>
                    <Modal.Footer>
                      <ModalButton onClick={hideModal}>Ok</ModalButton>
                    </Modal.Footer>
                  </Modal>
                  {/* ------------------------------------ */}
                </Col>
              </Row>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default Signup;