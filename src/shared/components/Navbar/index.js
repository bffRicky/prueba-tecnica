import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import "./index.scss";

const Navbar = () => {
  const [isActive, setIsActive] = useState(0);

  useEffect(() => {
    if (window.location.pathname === process.env.REACT_APP_ROUTE_DASHBOARD) {
      setIsActive(1);
    } else if (window.location.pathname === process.env.REACT_APP_ROUTE_TRAVELERS) {
      setIsActive(2);
    } else {
      setIsActive(3);
    }
  }, []);

  console.log(window.location.pathname);
  return (
    <nav className="navbar navbar-container">
      <div className={`navbar__item ${isActive === 1 ? "active" : ""}`}>
        <Link to={process.env.REACT_APP_ROUTE_DASHBOARD}>Dashboard</Link>
      </div>
      <div className={`navbar__item ${isActive === 2 ? "active" : ""}`}>
        <Link to={process.env.REACT_APP_ROUTE_TRAVELERS}>Viajeros</Link>
      </div>
      <div className={`navbar__item ${isActive === 3 ? "active" : ""}`}>
        <Link to={process.env.REACT_APP_ROUTE_RESERVATIONS}>Reservas</Link>
      </div>
    </nav>
  );
};

export default Navbar;
