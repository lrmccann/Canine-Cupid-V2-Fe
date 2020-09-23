import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import API from "../utils/API";
import UserContext from "../utils/UserContext";
import { Col, Row, Container } from "../components/Grid";
import { Input } from "../components/Form";
import { LoginButton } from "../components/Button";
import { ModalButton, LoginModalButton, XButton } from "../components/Button";
import {NavbarNolinks} from '../components/Navbar';
import Header from "../components/Header";
import DogLogin from "./images/dog-for-login.png";
import LoginText from "./images/login-text.png";
import "./Signup.css"

function Login() {

  const { getData, getAllUsersNames } = useContext(UserContext)

  const history = useHistory();

  const [loginObject, setLoginObject] = useState({})
  console.log("stateLogin", loginObject);

  ////////////// Code for Modal //////
  const [isOpen, setIsOpen] = React.useState(false);
  const [isErrorMessage, setIsErrorMessage] = React.useState();
  const [loginIsOpen, setLoginIsOpen] = React.useState();

  const showModal = (errorMsg) => {
    setIsOpen(true);
    setIsErrorMessage(errorMsg);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const showLoginModal = () => {
    setLoginIsOpen(true);
  }
  ///////////////////////////////////

  function handleInputChange(event) {
    const { name, value } = event.target;
    setLoginObject({ ...loginObject, [name]: value })
  };

  async function handleLoginSubmit(event) {
    event.preventDefault();
    if (loginObject.userName && loginObject.password) {
      await API.checkUser({
        userName: loginObject.userName,
        password: loginObject.password
      })
        .then(res => handleAuthenticatedResponse(res))
        .catch(error => console.log(error.response));
    }
  };

  async function getAllNames(sessionToken, arrYes) {
    console.log("getAllNames")
    await API.getAllUsers(sessionToken)
      .then((res) => {
        //  arr1 of all users Names received in response get filtered to exclude Logged user from the array, result in arr2
        const arr1 = res.data;
        function checkUserName(name) {
          if (name !== loginObject.userName) {
            return name;
          }
        }
        const arr2 = arr1.filter(checkUserName)

        // arrYes conteined users name mutched by Loged user, all those name should be exlused from arr2, result in data
        const filteredNames = function () {
          const arr3 = arr2.filter(e => arrYes.findIndex(i => i === e) === -1);
          return arr3;
        };

        const data = filteredNames();

        getAllUsersNames(data)
      }
      )
  }

  function handleAuthenticatedResponse(res) {
    if (res.data === "User not found.") {
      let errorMsg = "User Not Found!";
      showModal(errorMsg);
    } else if (res.data === "Wrong password.") {
      let errorMsg = "Password is Wrong!";
      showModal(errorMsg);
    } else {
      console.log("res.data", res.data);
      getData(res.data);
      getAllNames(res.data.sessionToken, res.data.matchesYes);
      // getAllUsersID(allID);
      // console.log("allID",allID);
      history.push("/profile");
    };
  };

  function handleSignupSubmit(event) {
    event.preventDefault();
    history.push("/signup");
  };
  return (
    <div className="login-page-content">
          <Header />
      <NavbarNolinks>
      <LoginButton
        onClick={showLoginModal} />
      </NavbarNolinks>
      <div className="body">
        {/* <NavbarLogin onClick={showLoginModal} /> */}
        {/* <!-- Optional theme --> */}
        <Container fluid>
          <Row>
          <div className="col-md-5" style={{marginTop:"17%", marginLeft:"4%" , float:"left", opacity: "100%"}}>
                <img className="login-text" src={LoginText}/>
            </div>
            <div className="col-md-6" style={{float:"left", marginTop:"2%" , marginLeft: "3.5%" }}>
            <Col size="md-6">
              <img className="login-image" src={DogLogin}/>
              </Col>
              </div>
          </Row>
        </Container>
        <Modal className="login-modal body" show={loginIsOpen} onHide={hideModal}>
          <Modal.Header>
            <Modal.Title> <h4 style={{ textAlign: "center" }}>Enter your pup's credentials</h4></Modal.Title>
            <XButton 
            onClick={hideModal}
            >
            </XButton>

          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="content">
                <Row>
                  <Col size="md-6">
                    <Input
                      onChange={handleInputChange}
                      type="text"
                      size="36"
                      label="User Name: "
                      name="userName"
                      placeholder="User Name (required)"
                    />
                    <Input
                      onChange={handleInputChange}
                      type="password"
                      size="36"
                      label="Password: "
                      name="password"
                      placeholder="Password (required)"
                    />
                    <LoginButton
                      disabled={!(loginObject.userName && loginObject.password)}
                      onClick={handleLoginSubmit}
                      height="40px"
                      width="130px"
                      border="1px solid black"
                      float="right"
                      fontSize="20px"
                      marginRight=".2%"
                      marginTop=".2%"
                      fontWeight="bold"
                      backgroundColor="white"
                    />
                  </Col>
                </Row>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer><a href="/Signup" {...handleSignupSubmit}><h6>Don't have an account?</h6></a></Modal.Footer>
        </Modal>
        {/* ----------------------Rendering Modal */}
        <Modal className="my-modal" show={isOpen} onHide={hideModal}>
          <Modal.Header>
            <Modal.Title>Sorry!</Modal.Title>
          </Modal.Header>
          <Modal.Body>{isErrorMessage}</Modal.Body>
          <Modal.Footer>
            <ModalButton
              height="40px"
              width="130px"
              border="1px solid black"
              float="right"
              fontSize="20px"
              marginRight=".2%"
              marginBottom=".3%"
              fontWeight="bold"
              backgroundColor="white"
              onClick={hideModal}>Ok</ModalButton>
          </Modal.Footer>
        </Modal>
        {/* ------------------------------------ */}
      </div>
    </div>
  );
}

export default Login;