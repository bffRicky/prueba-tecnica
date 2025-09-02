import React from "react";

import { Link } from "react-router-dom";

//MUI
import { Box, Button, Typography } from "@mui/material";

//MUI ICONS
import {
  Flight as FlightIcon,
  Dashboard as DashboardIcon,
  Backpack as BackpackIcon,
} from "@mui/icons-material";

const FastLinks = () => {
  return (
    <Box sx={{ backgroundColor: "#eee", px: 3, py: 1, borderRadius: 5 }}>
      <Typography variant="h6">Enlaces rapidos</Typography>
      <Box
        sx={{ display: "flex", flexWrap: "wrap", flexDirection: "row", gap: 2, my: 1 }}>
        <Button
          variant="outlined"
          startIcon={<DashboardIcon />}
          component={Link}
          to={process.env.REACT_APP_ROUTE_DASHBOARD_EMPTY}>
          Dashboard
        </Button>
        <Button
          variant="outlined"
          startIcon={<BackpackIcon />}
          component={Link}
          to={process.env.REACT_APP_ROUTE_TRAVELERS}>
          Viajeros
        </Button>
        <Button
          variant="outlined"
          startIcon={<FlightIcon />}
          component={Link}
          to={process.env.REACT_APP_ROUTE_RESERVATIONS}>
          Reservas
        </Button>
      </Box>
    </Box>
  );
};

export default FastLinks;
