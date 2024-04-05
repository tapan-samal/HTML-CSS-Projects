import React from "react";
import { Navbar, NavbarBrand, NavbarText } from "reactstrap";
import image from "../assets/images/profile.jpg";

function Header(props) {
  return (
    <div>
      <Navbar {...props}>
        <NavbarBrand href="/">Task Tracker</NavbarBrand>
        <NavbarText>
          <img className="profile-img" src={image} alt="profile" />
        </NavbarText>
      </Navbar>
    </div>
  );
}

export default Header;
