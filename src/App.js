import React from "react";

// react-router components
import { Routes, Route } from "react-router-dom";
import "./shared/assets/scss/main.scss";

import Dashboard from "./modules/Dashboard";
import Travelers from "./modules/Travelers";
import Reservations from "./modules/Reservations";

function App() {
  return (
    <>
      <Routes>
        <Route
          path={process.env.REACT_APP_ROUTE_DASHBOARD_EMPTY}
          element={<Dashboard title={process.env.REACT_APP_APP_NAME} />}
        />
        <Route
          path={process.env.REACT_APP_ROUTE_DASHBOARD}
          element={<Dashboard title={process.env.REACT_APP_APP_NAME} />}
        />
        <Route
          path={process.env.REACT_APP_ROUTE_TRAVELERS}
          element={<Travelers title={process.env.REACT_APP_APP_NAME} />}
        />
        <Route
          path={process.env.REACT_APP_ROUTE_TRAVELERS + "/:UUID"}
          element={<Travelers title={process.env.REACT_APP_APP_NAME} />}
        />
        <Route
          path={process.env.REACT_APP_ROUTE_RESERVATIONS}
          element={<Reservations title={process.env.REACT_APP_APP_NAME} />}
        />
      </Routes>
    </>
  );
}

export default App;
