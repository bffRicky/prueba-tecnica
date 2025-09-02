import React, { useEffect, useState } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { reduxEditTraveler } from "../../shared/features/travelers/travelersSlice";

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

const EditTraveler = ({ modalIsOpen, onCloseFn, travelerToEdit }) => {
  const [editFormTravelerData, setEditFormTravelerData] = useState(travelerToEdit);

  const [editTravelerIsValid, setEditTravelerIsValid] = useState();

  useEffect(() => {
    setEditFormTravelerData(travelerToEdit);
  }, [travelerToEdit]);

  //REDUX LOGIC
  //is the function for send the actions to the reducer
  const dispatch = useDispatch();

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

  //set the data of the edited traveler
  const handleChangeEditTraveler = (e) => {
    const { name, value } = e.target;

    setEditFormTravelerData((values) => ({ ...values, [name]: value }));
  };

  //handle the visualization of the alert if the data are empty
  const handleOnBlurEditTraveler = (e) => {
    const { name, value } = e.target;
    if (value === "") setEditTravelerIsValid(false);
    else setEditTravelerIsValid(true);
  };

  const handleSubmitEditTraveler = (e) => {
    e.preventDefault();

    let valuesAreComplete = true;

    for (const [key, value] of Object.entries(editFormTravelerData)) {
      if (value === "") {
        valuesAreComplete = false;
        setEditTravelerIsValid(false);
        break;
      }
    }

    if (valuesAreComplete) {
      //save data on redux
      dispatch(reduxEditTraveler(editFormTravelerData));

      //close modal and reset the form
      onCloseFn();

      //reset the form
      setEditFormTravelerData({});
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-edit"
      aria-describedby="transition-modal-edit-description"
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
          <Typography variant="h5">Actualiza Viajero</Typography>
          <Divider sx={{ my: 1 }} />
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            onSubmit={handleSubmitEditTraveler}
            autoComplete="off">
            <TextField
              label="Nombre"
              name="nombre"
              value={editFormTravelerData.nombre}
              onChange={handleChangeEditTraveler}
              onBlur={handleOnBlurEditTraveler}
              fullWidth
            />
            <TextField
              label="Apellidos"
              name="apellidos"
              value={editFormTravelerData.apellidos}
              onChange={handleChangeEditTraveler}
              onBlur={handleOnBlurEditTraveler}
              fullWidth
            />{" "}
            <TextField
              label="Email"
              name="email"
              value={editFormTravelerData.email}
              onChange={handleChangeEditTraveler}
              onBlur={handleOnBlurEditTraveler}
              fullWidth
            />{" "}
            <TextField
              label="Pais"
              name="pais"
              value={editFormTravelerData.pais}
              onChange={handleChangeEditTraveler}
              onBlur={handleOnBlurEditTraveler}
              fullWidth
            />{" "}
            <TextField
              label="Telefono"
              name="telefono"
              value={editFormTravelerData.telefono}
              onChange={handleChangeEditTraveler}
              onBlur={handleOnBlurEditTraveler}
              fullWidth
            />
            {editTravelerIsValid === false ? (
              <Alert severity="warning">
                Hay que rellenar todos los campos para crear un nuevo viajero
              </Alert>
            ) : null}
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "var(--primary)" }}>
              Actualiza Viajero
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditTraveler;
