import React from "react";

import "./index.scss";
import Navbar from "../Navbar";

import LogoDifferent from "../../assets/images/logo-DR.c02acf59.webp";

const Header = () => {
  return (
    <header className="header header-container">
      <div className="header__logo">
        <img src={LogoDifferent} alt="logo de Different Roads" />
      </div>
      <div className="header__nav">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
