import React, { useEffect, useState } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { reduxAddTraveler } from "../../shared/features/travelers/travelersSlice";

import { createUUID } from "../../shared/utils/tools";

//MUI
import {
  Box,
  Button,
  Typography,
  Backdrop,
  Modal,
  Fade,
  Alert,
  TextField,
  Divider,
} from "@mui/material";

const AddTraveler = ({ modalIsOpen, onCloseFn }) => {
  const [newFormTravelerData, setNewFormTravelerData] = useState({
    uuid: "",
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    pais: "",
    fechaRegistro: "",
  });
  const [newTravelerIsValid, setNewTravelerIsValid] = useState();

  //REDUX LOGIC
  //is the function for send the actions to the reducer
  const dispatch = useDispatch();

  //allow to read the redux state of travelers and reservations
  const travelersRedux = useSelector((state) => state.travelers);

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

  //ADD TRAVELER
  //set the data of the new traveler
  const handleChangeNewTraveler = (e) => {
    const { name, value } = e.target;

    setNewFormTravelerData((values) => ({ ...values, [name]: value }));
  };

  //handle the visualization of the alert if the data are empty
  const handleOnBlurNewTraveler = (e) => {
    const { name, value } = e.target;
    if (value === "") setNewTravelerIsValid(false);
    else setNewTravelerIsValid(true);
  };

  const handleSubmitNewTraveler = (e) => {
    e.preventDefault();

    let valuesAreComplete = true;

    const localFormData = newFormTravelerData;
    localFormData.uuid = createUUID("trav");
    localFormData.fechaRegistro = new Date().toISOString().split("T")[0];

    for (const [key, value] of Object.entries(localFormData)) {
      if (value === "") {
        valuesAreComplete = false;
        setNewTravelerIsValid(false);
        break;
      }
    }

    if (valuesAreComplete) {
      //save data on redux
      dispatch(reduxAddTraveler(localFormData));

      //close modal and reset the form
      onCloseFn();

      //reset the form
      setNewFormTravelerData({
        uuid: "",
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        pais: "",
        fechaRegistro: "",
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
          <Typography variant="h5">Añadir Viajeros</Typography>
          <Divider sx={{ my: 1 }} />
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            onSubmit={handleSubmitNewTraveler}
            autoComplete="off">
            <TextField
              label="Nombre"
              name="nombre"
              value={newFormTravelerData.nombre}
              onChange={handleChangeNewTraveler}
              onBlur={handleOnBlurNewTraveler}
              fullWidth
            />
            <TextField
              label="Apellidos"
              name="apellidos"
              value={newFormTravelerData.apellidos}
              onChange={handleChangeNewTraveler}
              onBlur={handleOnBlurNewTraveler}
              fullWidth
            />{" "}
            <TextField
              label="Email"
              name="email"
              value={newFormTravelerData.email}
              onChange={handleChangeNewTraveler}
              onBlur={handleOnBlurNewTraveler}
              type="email"
              fullWidth
            />{" "}
            <TextField
              label="Pais"
              name="pais"
              type="text"
              value={newFormTravelerData.pais}
              onChange={handleChangeNewTraveler}
              onBlur={handleOnBlurNewTraveler}
              fullWidth
            />{" "}
            <TextField
              label="Telefono"
              name="telefono"
              value={newFormTravelerData.telefono}
              onChange={handleChangeNewTraveler}
              onBlur={handleOnBlurNewTraveler}
              type="number"
              fullWidth
            />
            {newTravelerIsValid === false ? (
              <Alert severity="warning">
                Hay que rellenar todos los campos para crear un nuevo viajero
              </Alert>
            ) : null}
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "var(--primary)" }}>
              Guarda Viajero
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddTraveler;
