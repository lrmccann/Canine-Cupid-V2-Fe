import React, { useState, useContext } from "react";
import { Col, Row, Container } from "../components/Grid";
import { homepageButton } from "../components/Button";
import {NavbarAboutUs} from '../components/Navbar';
import Header from "../components/Header";
import "./Signup.css"


function aboutUs() {
        return(
            <div className="aboutUs-page-content">
                <Header />
                <NavbarAboutUs/>
                <Container>
                <Row>
                    <Col size="lg-12">
                    <div className="aboutUsContent" style={{ height: "440px", width: "100%", border: "solid black 1px", backgroundColor: "white", marginTop:"5%", marginBottom:"5%" }}>
                    <p style={{ fontSize: "22px", padding:"2%" , fontFamily: 'Karla sans-serif' , fontFamily: 'Kumbh Sans sans-serif' , fontFamily: 'Poppins, sans-serif'}}>
                  Coronavirus has impacted our world in many ways, one of which being the recent skyrocket in animal adoption rates.
                  Shelters everywhere have been cleared by people looking for four-legged friends, and while staying home with them 24/7 was initially great, our pups are getting just as stir-crazy as we are.
                  That’s where Canine Cupid comes in.
                  </p>
                  <p style={{ fontSize: "22px", padding: "2%" ,fontFamily: 'Karla sans-serif' , fontFamily: 'Kumbh Sans sans-serif' , fontFamily: 'Poppins, sans-serif'}} >
                  Canine Cupid is the dog-matching app you and your pup have been waiting for.
                  Just make an account outlining your dog’s likes, dislikes, and personality traits to match them with a friend that is just as special as they are.
                  </p>
                  <p style={{ fontSize: "22px", padding: "2%" , fontFamily: 'Karla sans-serif' , fontFamily: 'Kumbh Sans sans-serif' , fontFamily: 'Poppins, sans-serif' }}>
                  Grab your mask, your pup’s leash and head out for a (socially-distanced) playdate!
                  </p>
                    </div>
                    </Col>

                </Row>

                </Container>

            </div>




    )

    }


export default aboutUs;