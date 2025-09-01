import React, { useEffect, useState } from "react";

import "./index.scss";

import Layout from "../../shared/components/Layout";

import { getTravelers, getReservations } from "../../shared/data/fakeApi";

//MUI
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

//MUI ICONS
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const Travelers = () => {
  const [travelers, setTravelers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [newTravelerIsValid, setNewTravelerIsValid] = useState();
  const [editTravelerIsValid, setEditTravelerIsValid] = useState();
  const [modalAddIsOpen, setModalIsAddOpen] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);

  const [newFormTravelerData, setNewFormTravelerData] = useState({
    uuid: "",
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    pais: "",
    fechaRegistro: "",
  });

  const [editFormTravelerData, setEditFormTravelerData] = useState({});

  const toggleModalAdd = () => setModalIsAddOpen(!modalAddIsOpen);
  const toggleModalEdit = () => setModalEditIsOpen(!modalEditIsOpen);

  const createUUID = () => {
    return `user-tr-${Math.floor(Math.random() * 100)}-${Date.now()}`;
  };

  //get all travelers
  useEffect(() => {
    (async () => {
      setTravelers(await getTravelers());
      console.log(await getTravelers());

      setReservations(await getReservations());
      console.log(await getReservations());
    })();
  }, []);

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

    for (const [key, value] of Object.entries(newFormTravelerData)) {
      if (value === "") {
        valuesAreComplete = false;
        setNewTravelerIsValid(false);
        break;
      }
    }

    if (valuesAreComplete) {
      //save data on redux
      //redux(newFormTravelerData)

      //update the array list of travelers
      setTravelers([...travelers, newFormTravelerData]);

      //close modal and reset the form
      toggleModalAdd();

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

  //EDIT TRAVELER
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
      //redux(newFormTravelerData)

      //update the array list of travelers
      const editedTravelers = travelers.map((traveler) => {
        if (traveler.uuid === editFormTravelerData.uuid) {
          return (traveler = editFormTravelerData);
        } else return traveler;
      });

      setTravelers(editedTravelers);

      //close modal and reset the form
      toggleModalEdit();

      //reset the form
      setEditFormTravelerData({});
    }
  };

  const handleOnclickEdit = (traveler) => {
    toggleModalEdit();
    setEditFormTravelerData({ ...traveler });
  };

  //delete the traveler from the array list of travelers
  const handleOnclickDelete = (traveler) => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar este viajero? ${traveler.nombre} ${traveler.apellidos}`
      )
    ) {
      const newTravelers = travelers.filter((t) => {
        if (t.uuid !== traveler.uuid) return t;
      });

      setTravelers(newTravelers);

      //save data on redux
      //redux(newTravelers)
    }
  };

  const handleShowReservations = (travelerId) => {
    console.log(
      reservations.filter((res) => {
        return res.viajeroId === travelerId;
      })
    );
  };

  useEffect(() => {
    console.log(newFormTravelerData);
  }, [newFormTravelerData]);

  useEffect(() => {
    console.log(editFormTravelerData);
  }, [editFormTravelerData]);

  //build the card for each traveler
  const buildCard = (traveler, addTraveler = false) => {
    return (
      <>
        {addTraveler ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              transition: "all 0.3s",
              ":hover": {
                cursor: "pointer",
                backgroundColor: "rgba(var(--primary-value), 0.4)",
              },
            }}
            onClick={() => {
              toggleModalAdd();
              setNewFormTravelerData((values) => ({ ...values, uuid: createUUID() }));
              setNewFormTravelerData((values) => ({
                ...values,
                fechaRegistro: new Date().toISOString().split("T")[0],
              }));
            }}>
            <PersonAddAltIcon sx={{ fontSize: 64, color: "var(--primary)" }} />
          </Box>
        ) : (
          <>
            <CardContent>
              <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
                {traveler.pais}
              </Typography>
              <Typography variant="h5" component="div">
                {traveler.nombre}
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                {traveler.apellidos}
              </Typography>
              <Typography variant="body2">
                {traveler.email} <br /> {traveler.telefono}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                boxSizing: "border-box",
              }}>
              <Chip
                label="Reservas"
                onClick={() => {
                  handleShowReservations(traveler.uuid);
                }}
                color="info"
              />
              <IconButton
                size="small"
                aria-label="edit"
                color="primary"
                onClick={() => {
                  handleOnclickEdit(traveler);
                }}>
                <EditIcon />
              </IconButton>
              {/* <IconButton aria-label="info" size="small" color="primary">
                <InfoIcon />
              </IconButton> */}
              <IconButton
                size="small"
                aria-label="delete"
                color="error"
                onClick={() => {
                  handleOnclickDelete(traveler);
                }}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </>
        )}
      </>
    );
  };

  //build the box with all the cards
  const buildBoxCards = (travelers) => {
    return (
      <Box
        sx={{
          minWidth: 275,
          display: "flex",
          flexDirection: "row",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 1,
        }}>
        {travelers.map((traveler, i) => {
          //set the style for each card to not repeat code
          const sxValue = {
            width: "220px",
            // minWidth: "150px",
            borderRadius: 3,
            ":hover": {
              boxShadow: 3,
            },
          };

          return (
            <React.Fragment key={traveler.uuid + i + "box"}>
              {i === 0 ? (
                <Card
                  variant="outlined"
                  sx={sxValue}
                  key={traveler.uuid + i + "add-user"}>
                  {buildCard({}, true)}
                </Card>
              ) : null}
              <Card variant="outlined" sx={sxValue} key={traveler.uuid}>
                {buildCard(traveler)}
              </Card>
            </React.Fragment>
          );
        })}
      </Box>
    );
  };

  return (
    <Layout>
      {travelers.length > 0 ? (
        <>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={modalAddIsOpen}
            onClose={toggleModalAdd}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}>
            <Fade in={modalAddIsOpen}>
              <Box
                sx={{
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
                }}>
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
                    fullWidth
                  />{" "}
                  <TextField
                    label="Pais"
                    name="pais"
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
          {buildBoxCards(travelers)}
          <Modal
            aria-labelledby="transition-modal-edit"
            aria-describedby="transition-modal-edit-description"
            open={modalEditIsOpen}
            onClose={toggleModalEdit}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}>
            <Fade in={modalEditIsOpen}>
              <Box
                sx={{
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
                }}>
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
        </>
      ) : (
        <React.Fragment key={"loading-travelers"}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: 1,
              mt: 2,
            }}
            key={"loading-travelers-box"}>
            {[...Array(9)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={210}
                height={118}
                animation="pulse"
              />
            ))}
          </Box>
        </React.Fragment>
      )}
    </Layout>
  );
};

export default Travelers;
