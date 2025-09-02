import React, { useEffect, useState } from "react";

import Layout from "../../shared/components/Layout";
import FastLinks from "../../shared/components/FastLinks";
import AddTraveler from "./AddTraveler";
import EditTraveler from "./EditTraveler";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTravelers,
  reduxAddTraveler,
  reduxEditTraveler,
  reduxDeleteTraveler,
} from "../../shared/features/travelers/travelersSlice";

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

const Travelers = () => {
  const [travelers, setTravelers] = useState([]);
  const [reservations, setReservations] = useState([]);

  const [modalAddIsOpen, setModalIsAddOpen] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const [travelerToEdit, setTravelerToEdit] = useState({});

  const [modalReservationIsOpen, setModalReservationIsOpen] = useState(false);
  const [currentTraveler, setCurrentTraveler] = useState([]);
  const [currentReservations, setCurrentReservations] = useState([]);
  const [currentResTableRow, setCurrentResTableRow] = useState([]);

  const [travelersFiltered, setTravelersFiltered] = useState([]);
  const [allStateOfTravelers, setAllStateOfTravelers] = useState([]);

  useEffect(() => {
    const states = [];

    if (travelers.length > 0) {
      travelers.map((travelers) => {
        return states.push(travelers.pais);
      });
    }

    setAllStateOfTravelers(new Set(states));
  }, [travelers]);

  // console.log(allStateOfTravelers);

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
    if (reservationsRedux.reservations.length > 0) {
      setReservations(reservationsRedux.reservations);
    }
  }, [reservationsRedux.reservations]);

  //toggle the modals
  const toggleModalAdd = () => setModalIsAddOpen(!modalAddIsOpen);
  const toggleModalEdit = () => setModalEditIsOpen(!modalEditIsOpen);
  const toggleModalReservation = () => setModalReservationIsOpen(!modalReservationIsOpen);

  const handleOnclickEdit = (traveler) => {
    setTravelerToEdit(traveler);
    toggleModalEdit();
    // setEditFormTravelerData(traveler);
  };

  //delete the traveler from the array list of travelers
  const handleOnclickDelete = (traveler) => {
    const textMessage = `¿Estás seguro de que quieres eliminar este viajero? ${traveler.nombre} ${traveler.apellidos}`;

    //the user confirm if want to delete the traveler
    if (window.confirm(textMessage)) {
      dispatch(reduxDeleteTraveler(traveler));
    }
  };

  const handleShowReservations = (traveler) => {
    toggleModalReservation();

    //reset the variable
    setCurrentResTableRow([]);
    setCurrentTraveler(traveler);

    const searchedReservations = reservations.filter((res) => {
      return res.viajeroId === traveler.uuid;
    });

    setCurrentReservations(searchedReservations);

    searchedReservations.map((row) => {
      setCurrentResTableRow((values) => [
        ...values,
        {
          destination: row.destino,
          status: row.estado,
          startDate: row.fechaInicio,
          endDate: row.fechaFin,
          price: row.precio,
        },
      ]);
    });
  };

  const handleEditReservation = (reservationToEdit, traveler) => {
    console.log(reservationToEdit, traveler);
  };

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
                icon={<FlightIcon />}
                label="Reservas"
                variant="contained"
                color="info"
                onClick={() => {
                  handleShowReservations(traveler);
                }}
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
                  sx={{ ...sxValue, backgroundColor: "rgba(var(--primary-value), 0.2)" }}
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
      <FastLinks />
      <Divider sx={{ mt: 1, mb: 3 }} />
      {travelers.length > 0 ? (
        <>
          <AddTraveler modalIsOpen={modalAddIsOpen} onCloseFn={toggleModalAdd} />
          <EditTraveler
            modalIsOpen={modalEditIsOpen}
            onCloseFn={toggleModalEdit}
            travelerToEdit={travelerToEdit}
          />
          <Box sx={{ mb: 3 }}>{}</Box>
          {buildBoxCards(travelers)}

          <Modal
            aria-labelledby="transition-modal-reservation"
            aria-describedby="transition-modal-reservation-description"
            open={modalReservationIsOpen}
            onClose={toggleModalReservation}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}>
            <Fade in={modalReservationIsOpen}>
              <Box sx={{ ...modalBoxStyle, minWidth: "550px" }}>
                {currentReservations.length > 0 ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontWeight: "600",
                      }}>
                      <Typography>
                        {`${currentTraveler.nombre} ${currentTraveler.apellidos}`}{" "}
                      </Typography>
                      <Chip
                        icon={
                          <AddIcon
                            sx={{
                              color: "var(--white)",
                            }}
                          />
                        }
                        label="Reservas"
                        variant="contained"
                        color="info"
                        sx={{
                          backgroundColor: "var(--primary)",
                          fontWeight: "500",
                          ":hover": {
                            backgroundColor: "var(--secondary)",
                          },
                        }}
                        onClick={() => {
                          // handleShowReservations(traveler);
                        }}
                      />
                    </Box>

                    <Divider
                      sx={{
                        mt: 1.5,
                        mb: 3,
                      }}
                    />

                    <TableContainer component={Paper}>
                      <Table
                        // sx={{ minWidth: 650 }}
                        size="small"
                        aria-label="a dense table">
                        <TableHead
                          sx={{
                            backgroundColor: "rgba(var(--primary-value),0.8)",
                          }}>
                          <TableRow>
                            <TableCell align="left">
                              <Typography sx={{ fontWeight: "550" }}>Destino</Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography sx={{ fontWeight: "550" }}>Estado</Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography sx={{ fontWeight: "550" }}>
                                Fecha inicio
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography sx={{ fontWeight: "550" }}>
                                Fecha fin
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography sx={{ fontWeight: "550" }}>Precio</Typography>
                            </TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {currentResTableRow.map((currentRes) => {
                            return (
                              <TableRow
                                key={currentRes.destination + currentTraveler.nombre}
                                align="left"
                                sx={{
                                  "&:last-child td, &:last-child th": { border: 0 },
                                }}>
                                <TableCell component="th" scope="row">
                                  {currentRes.destination}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {currentRes.status.toLowerCase() === "confirmada" ? (
                                    <CheckCircleIcon color="success" />
                                  ) : currentRes.status.toLowerCase() === "pendiente" ? (
                                    <PendingIcon color="warning" />
                                  ) : (
                                    <CancelIcon color="error" />
                                  )}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {currentRes.startDate}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {currentRes.endDate}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {currentRes.price}€
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <IconButton
                                    size="small"
                                    aria-label="edit"
                                    color="primary"
                                    onClick={() => {
                                      handleEditReservation(currentRes, currentTraveler);
                                    }}>
                                    <EditIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                ) : (
                  <Typography>{`${currentTraveler.nombre} ${currentTraveler.apellidos} no tiene reservas`}</Typography>
                )}
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
