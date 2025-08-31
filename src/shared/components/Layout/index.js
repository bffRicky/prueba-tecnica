import React from "react";

import "./index.scss";

import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <div className="main-container">
      <Header />
      <div className="main-container__body">{children}</div>
    </div>
  );
};

export default Layout;
