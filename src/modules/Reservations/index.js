import React, { useEffect, useState } from "react";

import Layout from "../../shared/components/Layout";
import FastLinks from "../../shared/components/FastLinks";
// import AddTraveler from "./AddTraveler";
// import EditTraveler from "./EditTraveler";

//redux
import { useSelector, useDispatch } from "react-redux";
import { fetchTravelers } from "../../shared/features/travelers/travelersSlice";

import {
  fetchReservations,
  reduxAddReservation,
  reduxEditReservation,
  reduxDeleteReservation,
} from "../../shared/features/reservations/reservationsSlice";

//MUI
import {
  Box,
  Skeleton,
  Card,
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

//MUI DATA GRUD
import { DataGrid } from "@mui/x-data-grid";

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
} from "@mui/icons-material";

const Reservations = () => {
  const [travelers, setTravelers] = useState([]);
  const [reservations, setReservations] = useState([]);

  const [tableRows, setTableRows] = useState([]);

  const tableColumns = [
    { field: "id", headerName: "id", width: 100 },
    { field: "destino", headerName: "Destino", width: 100 },
    { field: "viajeroId", headerName: "Id Viajero", width: 80 },
    {
      field: "estado",
      headerName: "Estado",
      width: 60,

      renderCell: (params) => {
        const estado = params.row.estado;

        return estado.toLowerCase() === "confirmada" ? (
          <CheckCircleIcon color="success" />
        ) : estado.toLowerCase() === "pendiente" ? (
          <PendingIcon color="warning" />
        ) : (
          <CancelIcon color="error" />
        );
      },
    },
    { field: "fechaInicio", headerName: "Fecha Inicio", width: 130 },
    { field: "fechaFin", headerName: "Fecha Fin", width: 130 },
    {
      field: "precio",
      headerName: "Precio",
      width: 90,
      renderCell: (params) => {
        const precio = params.row.precio;
        return precio + "€";
      },
    },
    {
      field: "actions",
      headerName: " ",
      width: 130,

      renderCell: (params) => {
        const reserObj = params.row.actions;
        return (
          <>
            <IconButton
              size="small"
              aria-label="edit"
              color="primary"
              onClick={() => {
                handleEditReservation(reserObj);
              }}>
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              aria-label="edit"
              color="error"
              onClick={() => {
                handleDeleteReservation(reserObj);
              }}>
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const handleEditReservation = (res) => {
    console.log(res);
  };
  const handleDeleteReservation = (res) => {
    const textMessage = `¿Estás seguro de que quieres eliminar esta Reserva? ${res.destino} ${res.uuid}`;

    //the user confirm if want to delete the traveler
    if (window.confirm(textMessage)) {
      console.log("entro");
      dispatch(reduxDeleteReservation(res));
    }
  };

  //REDUX LOGIC
  //is the function for send the actions to the reducer
  const dispatch = useDispatch();

  //allow to read the redux state of travelers and reservations
  const travelersRedux = useSelector((state) => state.travelers);
  const reservationsRedux = useSelector((state) => state.reservations);

  //load the travelers and reservations data when the component is mounted
  useEffect(() => {
    if (travelersRedux?.travelers?.length == 0) dispatch(fetchTravelers());
  }, [dispatch]);

  useEffect(() => {
    if (reservationsRedux?.reservations?.length == 0) dispatch(fetchReservations());
  }, [dispatch]);

  //when the state as data i save that locally
  useEffect(() => {
    if (travelersRedux.travelers.length > 0) setTravelers(travelersRedux.travelers);
  }, [travelersRedux.travelers]);

  //when the state as data i save that locally
  useEffect(() => {
    // console.log(reservationsRedux);
    console.warn(reservationsRedux.reservations);
    if (reservationsRedux.reservations.length > 0) {
      setReservations(reservationsRedux.reservations);
    }
  }, [reservationsRedux.reservations]);

  useEffect(() => {
    if (reservations.length > 0) buildtable();
  }, [reservations]);

  //create the table Rows dinamically
  const buildtable = () => {
    const rows = [];

    reservations.map((res) => {
      const singleRow = {};

      tableColumns.map((column) => {
        if (column.field !== "actions")
          singleRow[column.field] = res[column.field === "id" ? "uuid" : column.field];
        else singleRow["actions"] = res;
      });

      rows.push(singleRow);
    });
    console.log(rows);
    setTableRows(rows);
  };

  const paginationModel = { page: 0, pageSize: 10 };
  return (
    <Layout>
      <FastLinks />
      <Divider sx={{ mt: 1, mb: 3 }} />
      <Typography
        variant="h4"
        textAlign={"center"}
        color="var(--primary)"
        textTransform={"uppercase"}>
        Reservas
      </Typography>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={tableColumns}
          rows={tableRows}
          initialState={{ pagination: { paginationModel } }}
          // pageSizeOptions={[10, 20]}
          // checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </Layout>
  );
};

export default Reservations;
