import React, { useState } from "react";

import "./index.scss";

//components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";

//icons
import MenuIcon from "@mui/icons-material/Menu";

//images
import LogoDifferent from "../../assets/images/logo-DR.c02acf59.webp";

const Header = () => {
  //menu
  const [anchorEl, setAnchorEl] = useState(null);

  //handle the links
  const pages = [
    { name: "Dashboard", link: process.env.REACT_APP_ROUTE_DASHBOARD },
    { name: "Travelers", link: process.env.REACT_APP_ROUTE_TRAVELERS },
    { name: "Reservas", link: process.env.REACT_APP_ROUTE_RESERVATIONS },
  ];

  //menu functions
  const open = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "var(--white)",
        color: "var(--secondary)",
        boxShadow: "none",
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            src={LogoDifferent}
            alt="Logo de Different Road"
            sx={{ height: 40, px: 2 }}
          />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "end",
            }}>
            <IconButton aria-label="delete" onClick={handleClickMenu}>
              <MenuIcon />
              <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
                {pages.map((page, i) => {
                  return (
                    <MenuItem
                      key={page + i}
                      onClick={() => {
                        window.location.href = page.link;
                        handleCloseMenu();
                      }}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  );
                })}
              </Menu>
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2, ml: 4 }}>
            {pages.map((page, i) => {
              return (
                <Link
                  href={page.link}
                  key={page.link + i}
                  underline="none"
                  sx={{
                    ":hover": { color: "var(--primary)" },
                  }}>
                  {page.name}
                </Link>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
