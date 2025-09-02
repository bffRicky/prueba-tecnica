import React, { useEffect, useState } from "react";

import Layout from "../../shared/components/Layout";
import FastLinks from "../../shared/components/FastLinks";
import AddReservation from "./AddReservation";
import EditReservation from "./EditReservation";

//redux
import { useSelector, useDispatch } from "react-redux";
import { fetchTravelers } from "../../shared/features/travelers/travelersSlice";

import {
  fetchReservations,
  reduxDeleteReservation,
} from "../../shared/features/reservations/reservationsSlice";

//MUI
import { IconButton, Typography, Divider, Chip, Paper } from "@mui/material";

//MUI DATA GRUD
import { DataGrid } from "@mui/x-data-grid";

//MUI ICONS
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Pending as PendingIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
} from "@mui/icons-material";

const Reservations = () => {
  const [travelers, setTravelers] = useState([]);
  const [reservations, setReservations] = useState([]);

  const [tableRows, setTableRows] = useState([]);

  const [modalAddIsOpen, setModalIsAddOpen] = useState(false);
  const [modalEditIsOpen, setModalIsEditOpen] = useState(false);
  const [reservationToEdit, setReservationToEdit] = useState([]);

  //toggle the modals
  const toggleModalAdd = () => setModalIsAddOpen(!modalAddIsOpen);
  const toggleModalEdit = () => setModalIsEditOpen(!modalEditIsOpen);

  const tableColumns = [
    { field: "id", headerName: "id", width: 100 },
    { field: "destino", headerName: "Destino", width: 100 },
    { field: "viajeroId", headerName: "Viajero", width: 160 },
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
    setReservationToEdit(res);
    toggleModalEdit();
  };
  const handleDeleteReservation = (res) => {
    const textMessage = `¿Estás seguro de que quieres eliminar esta Reserva? ${res.destino} ${res.uuid}`;

    //the user confirm if want to delete the traveler
    if (window.confirm(textMessage)) {
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
    if (reservationsRedux.reservations.length > 0) {
      setReservations(reservationsRedux.reservations);
    }
  }, [reservationsRedux.reservations]);

  //reload the table with the updated data
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
          if (column.field === "viajeroId")
            travelers.map((trav) => {
              if (trav.uuid === res[column.field])
                singleRow[column.field] = trav.nombre + " " + trav.apellidos;
            });
          else
            singleRow[column.field] = res[column.field === "id" ? "uuid" : column.field];
        else singleRow["actions"] = res;
      });

      rows.push(singleRow);
    });

    setTableRows(rows);
  };

  const paginationModel = { page: 0, pageSize: 20 };
  return (
    <Layout>
      <FastLinks />
      <Divider sx={{ mt: 1, mb: 3 }} />
      <AddReservation modalIsOpen={modalAddIsOpen} onCloseFn={toggleModalAdd} />
      <EditReservation
        modalIsOpen={modalEditIsOpen}
        onCloseFn={toggleModalEdit}
        reservationToEdit={reservationToEdit}
      />
      <Typography
        variant="h4"
        textAlign={"center"}
        color="var(--primary)"
        textTransform={"uppercase"}>
        Reservas
      </Typography>
      <Chip
        icon={<AddIcon />}
        label="Reservas"
        variant="contained"
        color="info"
        sx={{ mt: 1, mb: 2 }}
        onClick={() => {
          toggleModalAdd();
        }}
      />
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={tableColumns}
          rows={tableRows}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 20]}
          sx={{
            border: 0,
            mt: 2,
          }}
        />
      </Paper>
    </Layout>
  );
};

export default Reservations;
