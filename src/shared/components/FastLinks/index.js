import React from "react";

import { Link } from "react-router-dom";

//MUI
import {
  Box,
  Skeleton,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  IconButton,
  Typography,
  Backdrop,
  Modal,
  Fade,
  Alert,
  TextField,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

//MUI ICONS
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  PersonAddAlt as PersonAddAltIcon,
  Flight as FlightIcon,
  Pending as PendingIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
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
