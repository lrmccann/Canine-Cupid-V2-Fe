import React, { Children } from "react"
import "./style.css";
import { MyProfileButton, MatchNowButton, MatchesButton, LogOutButton , AboutUsButton , HomeButton, SignupButton } from "../Button"



export function Navbar() {

  return (
    <div className="navbar">
    <MyProfileButton/>
    <MatchNowButton/>
    <MatchesButton/>
    <LogOutButton/>
    </div>
  );
}

export function NavbarNolinks(props) {
  console.log(props)
  return (
    <div className="navbar-login">
        <SignupButton />
        <button className="nav-bar-login"
        onClick={props.children.props.onClick}
        > Log In
        </button>
        <AboutUsButton />
    </div>
  );
}

export function NavbarAboutUs(props) {
  // console.log(props)
  return (
    <div className="navbar-login">
      <HomeButton/>
    </div>
  );
}




export default Navbar;