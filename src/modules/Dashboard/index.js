import React, { useState, useEffect } from "react";

import Layout from "../../shared/components/Layout";
import FastLinks from "../../shared/components/FastLinks";
import AddTraveler from "../Travelers/AddTraveler";

//redux
import { useSelector, useDispatch } from "react-redux";
import { fetchTravelers } from "../../shared/features/travelers/travelersSlice";

import { fetchReservations } from "../../shared/features/reservations/reservationsSlice";

//MUI
import { Box, Skeleton, Card, CardContent, Typography } from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";

//MUI ICONS
import { Add as AddIcon, PersonAddAlt as PersonAddAltIcon } from "@mui/icons-material";

const Dashboard = () => {
  const [travelers, setTravelers] = useState([]);
  const [reservations, setReservations] = useState([]);

  const [chartValue, setChartValue] = useState([]);

  const [modalAddIsOpen, setModalIsAddOpen] = useState(false);

  const [totalIncome, setTotalIncome] = useState(0);
  const [reservationStatus, setReservationStatus] = useState({
    confirmada: 0,
    pendiente: 0,
    cancelada: 0,
  });
  const [travelersCountry, setTravelersCountry] = useState(0);

  const [countriesNumber, setCountriesNumber] = useState(0);

  //toggle the modals
  const toggleModalAdd = () => setModalIsAddOpen(!modalAddIsOpen);

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
    if (travelersRedux.travelers.length > 0) {
      setTravelers(travelersRedux.travelers);

      const travelerCountry = [];

      //set the number of the states
      travelersRedux.travelers.map((trav) => {
        travelerCountry.push(trav.pais);
      });
      setTravelersCountry([...new Set(travelerCountry)]);

      //set the state that has most travelers
      const countsCountry = {};
      travelerCountry.forEach((item) => {
        countsCountry[item] = (countsCountry[item] || 0) + 1;
      });

      setCountriesNumber(countsCountry);
    }
  }, [travelersRedux.travelers]);

  //when the state as data i save that locally
  useEffect(() => {
    if (reservationsRedux.reservations.length > 0) {
      setReservations(reservationsRedux.reservations);

      //get the total income from reservation and the count of the status of reservations
      let countTotalIncome = 0;
      let localResStat = { confirmada: 0, pendiente: 0, cancelada: 0 };

      reservationsRedux.reservations.map((res) => {
        countTotalIncome += Number(res.precio);

        localResStat[res.estado.toLowerCase()] =
          localResStat[res.estado.toLowerCase()] + 1;
      });
      setReservationStatus(localResStat);

      setTotalIncome(countTotalIncome);
    }
  }, [reservationsRedux.reservations]);

  useEffect(() => {
    if (travelersCountry.length > 0) {
      const valueAxisX = travelersCountry.map((countryName) => {
        return countriesNumber[countryName];
      });

      setChartValue(valueAxisX);
    }
  }, [travelersCountry, countriesNumber]);

  return (
    <Layout>
      <FastLinks />
      <AddTraveler modalIsOpen={modalAddIsOpen} onCloseFn={toggleModalAdd} />

      <Box sx={{ my: 3 }}>
        <Typography variant="h5" sx={{ color: "var(--primary)", mb: 2 }}>
          VIAJEROS
        </Typography>
        {travelers.length > 0 ? (
          <Box
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
              gap: 2,
            }}>
            <Card
              variant="outlined"
              sx={{
                width: "150px",
                // minWidth: "150px",
                borderRadius: 3,
                ":hover": {
                  boxShadow: 3,
                },
                backgroundColor: "rgba(var(--primary-value), 0.2)",
              }}
              key={"add-user"}>
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
            </Card>

            <Card
              variant="outlined"
              sx={{
                width: "fit-content",
                minWidth: 150,
                borderRadius: 3,
                border: "none",
                background:
                  "linear-gradient(135deg, rgba(var(--primary-value), 0.4) 0%, #fff7f7ff 100%)",
                ":hover": {
                  boxShadow: 3,
                },
              }}>
              <CardContent sx={{ m: 0, "&:last-child": { py: 1 } }}>
                <Typography
                  gutterBottom
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    color: "text.secondary",
                    fontSize: 14,
                    m: 0,
                  }}>
                  Total viajeros
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    color: "var(--secondary)",
                    fontWeight: 600,
                  }}>
                  {travelers.length}
                </Typography>
              </CardContent>
            </Card>
            <Card
              variant="outlined"
              sx={{
                width: "fit-content",
                minWidth: 150,
                borderRadius: 3,
                border: "none",
                background:
                  "linear-gradient(135deg, rgba(var(--primary-value), 0.4) 0%, #fff7f7ff 100%)",
                ":hover": {
                  boxShadow: 3,
                },
              }}>
              <CardContent sx={{ m: 0, "&:last-child": { py: 1 } }}>
                <Typography
                  gutterBottom
                  sx={{
                    color: "text.secondary",
                    fontSize: 14,
                    verticalAlign: "center",
                    m: 0,
                  }}>
                  Total paises de origen
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    color: "var(--secondary)",
                    fontWeight: 600,
                  }}>
                  {travelersCountry.length}
                </Typography>
              </CardContent>
            </Card>
          </Box>
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
              {[...Array(3)].map((_, index) => (
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
      </Box>
      <Box sx={{ my: 3 }}>
        <Typography variant="h5" sx={{ color: "var(--primary)", mb: 2 }}>
          RESERVAS
        </Typography>
        {reservations.length > 0 ? (
          <Box
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
              gap: 2,
            }}>
            <Card
              variant="outlined"
              sx={{
                width: "fit-content",
                minWidth: 150,
                borderRadius: 3,
                border: "none",
                background:
                  "linear-gradient(135deg, rgba(var(--secondary-value), 0.4) 0%, #fff7f7ff 100%)",
                ":hover": {
                  boxShadow: 3,
                },
              }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{
                    color: "text.secondary",
                    fontSize: 14,
                    verticalAlign: "center",
                    m: 0,
                  }}>
                  Total reservas
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    color: "var(--secondary)",
                    fontWeight: 600,
                  }}>
                  {reservations.length}
                </Typography>
              </CardContent>
            </Card>
            <Card
              variant="outlined"
              sx={{
                width: "fit-content",
                minWidth: 150,
                borderRadius: 3,
                border: "none",
                background:
                  "linear-gradient(135deg, rgba(var(--secondary-value), 0.4) 0%, #fff7f7ff 100%)",
                ":hover": {
                  boxShadow: 3,
                },
              }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{
                    color: "text.secondary",
                    fontSize: 14,
                    verticalAlign: "center",
                    m: 0,
                  }}>
                  Entradas totales
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    color: "var(--secondary)",
                    fontWeight: 600,
                  }}>
                  {totalIncome}€
                </Typography>
              </CardContent>
            </Card>
            <Card
              variant="outlined"
              sx={{
                width: "fit-content",
                minWidth: 150,
                borderRadius: 3,
                border: "none",
                background:
                  "linear-gradient(135deg, rgba(var(--secondary-value), 0.4) 0%, #fff7f7ff 100%)",
                ":hover": {
                  boxShadow: 3,
                },
              }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{
                    color: "text.secondary",
                    fontSize: 14,
                    verticalAlign: "center",
                    m: 0,
                  }}>
                  Media precios
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    color: "var(--secondary)",
                    fontWeight: 600,
                  }}>
                  {Math.round(totalIncome / reservations.length)}€
                </Typography>
              </CardContent>
            </Card>
          </Box>
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
              {[...Array(3)].map((_, index) => (
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
      </Box>
      <Box sx={{ my: 2 }}>
        {Object.entries(reservationStatus).length > 0 ? (
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: reservationStatus.confirmada,
                    label: "Confirmadas",
                  },
                  { id: 1, value: reservationStatus.pendiente, label: "Pendiente" },
                  { id: 2, value: reservationStatus.cancelada, label: "Cancelada" },
                ],
              },
            ]}
            width={200}
            height={200}
          />
        ) : null}
      </Box>
      <Box sx={{ my: 3 }}>
        <Typography variant="h5" sx={{ color: "var(--primary)", mb: 2 }}>
          PAISES
        </Typography>

        {travelersCountry.length > 0 ? (
          <BarChart
            xAxis={[{ data: [...travelersCountry] }]}
            series={[{ data: [...chartValue] }]}
            height={300}
          />
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
              {[...Array(3)].map((_, index) => (
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
      </Box>
    </Layout>
  );
};

export default Dashboard;
