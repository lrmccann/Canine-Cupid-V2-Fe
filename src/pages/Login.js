import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import API from "../utils/API";
import UserContext from "../utils/UserContext";
import { Col, Row, Container } from "../components/Grid";
import { Input } from "../components/Form";
import { SignupButton, LoginButton } from "../components/Button";
import { NavbarLogin } from "../components/Navbar";
import { ModalButton, LoginModalButton } from "../components/Button";
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
    <div className="body">
      {/* <NavbarLogin onClick={showLoginModal} /> */}
      <LoginButton 
          height= "40px"
          width= "130px"
          border= "1px solid black"
          float= "right"
          font-size ="20px"
          font-weight="bold"
          background-color="pink"
          onClick={showLoginModal}/>
      {/* <!-- Optional theme --> */}
      <Container fluid>
        <Row>
          <div className="container">
          <div className="col-xs-5">
            <div className="shader" style={{ marginTop: "600px", marginRight: "35%", paddingLeft: "2%" }}>
              <h3>A Word From Canine-Cupid</h3>
              <p style={{ fontSize: "17px", fontWeight: "bolder", marginTop: "1.2%" }}>
                Coronavirus has impacted our world in many ways, one of which being the recent skyrocket in animal adoption rates.
                Shelters everywhere have been cleared by people looking for four-legged friends, and while staying home with them 24/7 was initially great, our pups are getting just as stir-crazy as we are.
                That’s where Canine Cupid comes in.
                Canine Cupid is the dog-matching app you and your pup have been waiting for.
                Just make an account outlining your dog’s likes, dislikes, and personality traits to match them with a friend that is just as special as they are.
                Grab your mask, your pup’s leash and head out for a (socially-distanced) playdate!
      </p>
            </div>
          </div>
          </div>
          {/* <div className="col-xs-7">
  </div> */}
        </Row>
      </Container>
      {/* <div className="diagonal-box">
      <div style={{transform: "skewY(11deg)"}}>
      </div>
      <div className="content"><h3>Coronavirus has impacted our world in many ways, one of which being the recent skyrocket in animal adoption rates.
         Shelters everywhere have been cleared by people looking for four-legged friends, and while staying home with them 24/7 was initially great, our pups are getting just as stir-crazy as we are. 
              That’s where Canine Cupid comes in. 
              Canine Cupid is the dog-matching app you and your pup have been waiting for.
               Just make an account outlining your dog’s likes, dislikes, and personality traits to match them with a friend that is just as special as they are. 
              Grab your mask, your pup’s leash and head out for a (socially-distanced) playdate!
              </h3></div> */}
      {/* ----------------------Rendering Modal */}
      <Modal className="login-modal" show={loginIsOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title> <h4 style={{ textAlign: "center" }}>Enter your pup's credentials</h4></Modal.Title>
          <LoginModalButton onClick={hideModal}></LoginModalButton>
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
          <ModalButton onClick={hideModal}>Ok</ModalButton>
        </Modal.Footer>
      </Modal>
      {/* ------------------------------------ */}
    </div>
  );
}

export default Login;


mongodb+srv://Logan:Allison401!@canine-cupid.cleqx.mongodb.net/Canine-Cupid?retryWrites=true&w=majority