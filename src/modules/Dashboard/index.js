import React, { useState, useEffect } from "react";

import Layout from "../../shared/components/Layout";
import FastLinks from "../../shared/components/FastLinks";
import AddTraveler from "../Travelers/AddTraveler";

//redux
import { useSelector, useDispatch } from "react-redux";
import { fetchTravelers } from "../../shared/features/travelers/travelersSlice";

import { fetchReservations } from "../../shared/features/reservations/reservationsSlice";

//MUI
import {
  Box,
  Skeleton,
  Card,
  CardContent,
  Container,
  Typography,
  IconButton,
} from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";

//MUI ICONS
import {
  Add as AddIcon,
  PersonAddAlt as PersonAddAltIcon,
  EventAvailable as EventAvailableIcon,
  Flag as FlagIcon,
  Hiking as HikingIcon,
  AttachMoney as AttachMoneyIcon,
  Groups as GroupsIcon,
} from "@mui/icons-material";

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

  const cardStyle = {
    width: "fit-content",
    padding: "0",
    borderRadius: 3,
    color: "#fff",
    backgroundColor: "rgba(var(--secondary-value), 0.7)",
    "&:last.child": { padding: "0" },
  };

  const cardContentStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    padding: "8px 16px",
    "&:last-child": {
      paddingBottom: "8px",
    },
  };
  const cardTextStyle = { display: "flex", flexDirection: "column" };
  const cardIconStyle = {
    color: "var(--secondary)",
    p: 0.5,
    backgroundColor: "#fff",
    borderRadius: 1,
  };

  const cardIconButtonStyle = { fontSize: 40 };

  const cardsData = [
    {
      icon: <HikingIcon sx={cardIconButtonStyle} />,
      title: "Viajeros totales",
      number: travelers.length,
    },
    {
      icon: <FlagIcon sx={cardIconButtonStyle} />,
      title: "Total paises de origen",
      number: travelersCountry.length,
    },
    {
      icon: <EventAvailableIcon sx={cardIconButtonStyle} />,
      title: "Reservas totales",
      number: reservations.length,
    },
    {
      icon: <AttachMoneyIcon sx={cardIconButtonStyle} />,
      title: "Reservas totales",
      number: totalIncome + "€",
    },
    {
      icon: <GroupsIcon sx={cardIconButtonStyle} />,
      title: "Reservas totales",
      number: Math.round(totalIncome / reservations.length) + "€",
    },
  ];

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

  const cardsBuilder = () => {
    return cardsData.map((card) => {
      return (
        <Card variant="outlined" sx={cardStyle}>
          <CardContent sx={cardContentStyle}>
            <IconButton size="large" sx={cardIconStyle} aria-label="">
              {card.icon}
            </IconButton>
            <div className="card-text" sx={cardTextStyle}>
              <Typography>{card.title}</Typography>
              <Typography component="div" sx={{ fontWeight: 600, fontSize: "20px" }}>
                {card.number}
              </Typography>
            </div>
          </CardContent>
        </Card>
      );
    });
  };

  return (
    <Layout>
      <FastLinks />
      <Typography
        variant="h4"
        textAlign={"center"}
        color="var(--primary)"
        textTransform={"uppercase"}
        sx={{ my: 4 }}>
        Dashboard
      </Typography>
      <AddTraveler modalIsOpen={modalAddIsOpen} onCloseFn={toggleModalAdd} />

      <Box sx={{ mb: 8, display: { xs: "none", sm: "block" } }}>
        <Container
          sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
          {cardsBuilder()}
        </Container>
      </Box>

      <Box
        sx={{
          my: 8,
          display: "flex",
          flexDirection: { sm: "row", xs: "column", alignItems: "center" },
          gap: 2,
        }}>
        <Card
          variant="outlined"
          sx={{
            width: "100%",
            minWidth: "150px",
            maxWidth: "250px",
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
            sx={{ justifyContent: "flex-end" }}
          />
        ) : null}
      </Box>
      <Box sx={{ my: 6 }}>
        <Typography variant="h5" sx={{ color: "var(--primary)", mb: 2 }}>
          PAISES DE LOS VIAJEROS
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
