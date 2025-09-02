import React, { useEffect, useState } from "react";

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
  const [activeLink, setActiveLink] = useState("");
  const pages = [
    { name: "Dashboard", link: process.env.REACT_APP_ROUTE_DASHBOARD },
    { name: "Viajeros", link: process.env.REACT_APP_ROUTE_TRAVELERS },
    { name: "Reservas", link: process.env.REACT_APP_ROUTE_RESERVATIONS },
  ];

  useEffect(() => {
    pages.map((page) => {
      //if the link is empty we're in the dashboard
      if (window.location.pathname === process.env.REACT_APP_ROUTE_DASHBOARD_EMPTY) {
        setActiveLink(process.env.REACT_APP_ROUTE_DASHBOARD);
      }
      if (window.location.pathname === page.link) {
        setActiveLink(page.link);
      }
    });
  }, [window.location.pathname]);

  //menu functions
  const open = Boolean(anchorEl);

  //handle the click menu like a toggle based on anchorEl value
  const handleClickMenu = (event) => {
    if (anchorEl && anchorEl === event.currentTarget) {
      return handleCloseMenu();
    } else {
      setAnchorEl(event.currentTarget);
    }
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
            sx={{ height: 40, pr: 2 }}
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
                      <Typography
                        textAlign="center"
                        sx={{
                          color: page.link === activeLink ? "var(--primary)" : "inherit",
                        }}>
                        {page.name}
                      </Typography>
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
                    color: page.link === activeLink ? "var(--primary)" : "inherit",
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
