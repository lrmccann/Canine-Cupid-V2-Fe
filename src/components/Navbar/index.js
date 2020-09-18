import React from "react"
import "./style.css";
import { MyProfileButton, MatchNowButton, MatchesButton, LogOutButton, LoginButton, SignupButton } from "../Button"


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

export default Navbar;