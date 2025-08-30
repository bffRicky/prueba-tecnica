import React from "react";

// react-router components
import { Routes, Route } from "react-router-dom";
import "./shared/assets/scss/main.scss";

import Layout from "./shared/components/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route
          path={process.env.REACT_APP_ROUTE_DASHBOARD_EMPTY}
          element={<Layout title={process.env.REACT_APP_APP_NAME} />}
        />
        <Route
          path={process.env.REACT_APP_ROUTE_DASHBOARD}
          element={<Layout title={process.env.REACT_APP_APP_NAME} />}
        />
        <Route
          path={process.env.REACT_APP_ROUTE_TRAVELERS}
          element={<Layout title={process.env.REACT_APP_APP_NAME} />}
        />
        <Route
          path={process.env.REACT_APP_ROUTE_TRAVELERS + "/:UUID"}
          element={<Layout title={process.env.REACT_APP_APP_NAME} />}
        />
        <Route
          path={process.env.REACT_APP_ROUTE_RESERVAS}
          element={<Layout title={process.env.REACT_APP_APP_NAME} />}
        />
      </Routes>
    </>
  );
}

export default App;
