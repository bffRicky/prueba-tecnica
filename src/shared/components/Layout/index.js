import React from "react";

import "./index.scss";

import Header from "../Header";
import Navbar from "../Navbar";

const Layout = ({ children }) => {
  return (
    <div className="main-container">
      <Header />
      <div className="main-container__body">
        <Navbar />
        <div className="body__page">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
