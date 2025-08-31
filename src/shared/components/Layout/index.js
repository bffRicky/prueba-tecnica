import React from "react";

import "./index.scss";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <div className="main-container">
      <Header />
      <Toolbar />
      <Box sx={{ mt: 4 }}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </div>
  );
};

export default Layout;
