import React, { useEffect, useState } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { fetchTravelers } from "../../shared/features/travelers/travelersSlice";

import { reduxEditReservation } from "../../shared/features/reservations/reservationsSlice";

//MUI
import {
  Autocomplete,
  Box,
  Button,
  Typography,
  Backdrop,
  Modal,
  Fade,
  Alert,
  TextField,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const EditReservation = ({ modalIsOpen, onCloseFn, reservationToEdit }) => {
  const [travelers, setTravelers] = useState([]);
  const [editFormReservationData, setEditFormReservationData] =
    useState(reservationToEdit);

  const [newReservationIsValid, setNewReservationIsValid] = useState();

  useEffect(() => {
    setEditFormReservationData(reservationToEdit);
  }, [reservationToEdit]);

  //REDUX LOGIC
  //is the function for send the actions to the reducer
  const dispatch = useDispatch();

  //allow to read the redux state of travelers and reservations
  const travelersRedux = useSelector((state) => state.travelers);

  useEffect(() => {
    if (travelersRedux?.travelers?.length == 0) dispatch(fetchTravelers());
  }, [dispatch]);

  //when the state as data i save that locally
  useEffect(() => {
    if (travelersRedux.travelers.length > 0) {
      setTravelers(travelersRedux.travelers);
    }
  }, [travelersRedux.travelers]);

  const modalBoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "var(--white)",
    border: "1px solid var(--secondary)",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
  };
  const handleSelectFields = (selectName, selectValue) => {
    handleChangeNewReservation({ target: { name: selectName, value: selectValue } });
  };
  //set the data of the new traveler
  const handleChangeNewReservation = (e) => {
    const { name, value } = e.target;

    setEditFormReservationData((values) => ({ ...values, [name]: value }));
  };

  //handle the visualization of the alert if the data are empty
  const handleOnBlurNew = (e) => {
    const { name, value } = e.target;
    if (value === "") setNewReservationIsValid(false);
    else setNewReservationIsValid(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valuesAreComplete = true;

    for (const [key, value] of Object.entries(editFormReservationData)) {
      if (value === "") {
        valuesAreComplete = false;
        setNewReservationIsValid(false);
        break;
      }
    }

    if (valuesAreComplete) {
      //save data on redux
      dispatch(reduxEditReservation(editFormReservationData));

      //close modal and reset the form
      onCloseFn();

      //reset the form
      setEditFormReservationData({
        uuid: "",
        destino: "",
        estado: "",
        fechaFin: "",
        fechaInicio: "",
        viajeroId: "",
        precio: "",
      });
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modalIsOpen}
      onClose={onCloseFn}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}>
      <Fade in={modalIsOpen}>
        <Box sx={modalBoxStyle}>
          <Typography variant="h5">Actualiza Reserva</Typography>
          <Divider sx={{ my: 1 }} />
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            onSubmit={handleSubmit}
            autoComplete="off">
            <TextField
              label="Destino"
              name="destino"
              value={editFormReservationData.destino}
              onChange={handleChangeNewReservation}
              onBlur={handleOnBlurNew}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="label-select">Estado</InputLabel>
              <Select
                labelId="label-select"
                id="label-select"
                value={editFormReservationData.estado}
                label="Estado"
                onChange={(e) => {
                  handleSelectFields("estado", e.target.value);
                }}>
                <MenuItem value={"Confirmada"}>Confirmada</MenuItem>
                <MenuItem value={"Pendiente"}>Pendiente</MenuItem>
                <MenuItem value={"Cancelada"}>Cancelada</MenuItem>
              </Select>
            </FormControl>
            <TextField
              placeholder="Fecha Inicio"
              name="fechaInicio"
              value={editFormReservationData.fechaInicio}
              onChange={handleChangeNewReservation}
              onBlur={handleOnBlurNew}
              type="date"
              fullWidth
            />{" "}
            <TextField
              placeholder="Fecha Fin"
              name="fechaFin"
              value={editFormReservationData.fechaFin}
              onChange={handleChangeNewReservation}
              onBlur={handleOnBlurNew}
              type="date"
              fullWidth
            />{" "}
            <TextField
              label="Precio"
              name="precio"
              value={editFormReservationData.precio}
              onChange={handleChangeNewReservation}
              onBlur={handleOnBlurNew}
              type="number"
              fullWidth
            />
            <Autocomplete
              options={travelers}
              getOptionLabel={(option) => option.nombre + " " + option.apellidos}
              fullWidth
              onChange={(event, trav) => {
                const id = trav?.uuid || null;
                handleSelectFields("viajeroId", id);
              }}
              value={
                travelers.find((t) => t.uuid === editFormReservationData.viajeroId) ||
                null
              }
              onBlur={handleOnBlurNew}
              renderInput={(params) => (
                <TextField {...params} label="Selecciona viajero" />
              )}
            />
            {newReservationIsValid === false ? (
              <Alert severity="warning">
                Hay que rellenar todos los campos para crear un nuevo viajero
              </Alert>
            ) : null}
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "var(--primary)" }}>
              Guarda Reserva
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditReservation;
