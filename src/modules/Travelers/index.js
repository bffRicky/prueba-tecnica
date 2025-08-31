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
import Typography from "@mui/material/Typography";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const Travelers = () => {
  const [travelers, setTravelers] = useState([]);

  const templateTraveler = {
    uuid: "",
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    pais: "",
    fechaRegistro: "",
  };

  useEffect(() => {
    (async () => {
      setTravelers(await getTravelers());
      console.log(await getTravelers());
    })();
  }, []);

  //build the card for each traveler
  const buildCard = (
    {
      uuid = "",
      nombre = "",
      apellidos = "",
      email = "",
      telefono = "",
      pais = "",
      fechaRegistro = "",
    },
    addTraveler = false
  ) => {
    return (
      <>
        {addTraveler ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}>
            <PersonAddAltIcon sx={{ fontSize: 64, color: "var(--primary)" }} />
          </Box>
        ) : (
          <>
            <CardContent>
              <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
                {pais}
              </Typography>
              <Typography variant="h5" component="div">
                {nombre}
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                {apellidos}
              </Typography>
              <Typography variant="body2">
                {email} <br /> {telefono}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">edit/ mira reservas</Button>
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
            width: "fit-content",
            minWidth: "150px",
            borderRadius: 3,
            ":hover": {
              boxShadow: 3,
              backgroundColor: "rgba(var(--primary-value),0.3)",
              transition: "all 0.6s",
              cursor: "pointer",
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
                {buildCard({ ...traveler })}
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
        buildBoxCards(travelers)
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
