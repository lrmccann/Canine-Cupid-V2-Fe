import React, { Children } from "react"
import "./style.css";
import { MyProfileButton, MatchNowButton, MatchesButton, LogOutButton } from "../Button"



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
  console.log(props.children.props.onClick)
  return (
    <div className="navbar-login">
      <button className="nav-bar-login"
      onClick={props.children.props.onClick}
      > Sign In
      </button>
    </div>
  );
}

export default Navbar;