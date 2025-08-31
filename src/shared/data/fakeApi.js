import jsonTravelers from "./travelers.json";
import jsonReservations from "./reservations.json";

//if fromfakeFetch build the FN with delay

//get all travelers
export const getTravelers = async () => {
  //if data on redux get this data
  //else fetch data from api
  return jsonTravelers;
};

//get traveler by id
export const getTravelerById = async (travelers, id) => {
  return travelers.find((traveler) => traveler.uuid === id);
};

//get reservations by traveler id
export const getTraverlerReservations = (reservations, travelerId) => {
  return reservations.filter((res) => {
    if (res.viajeroID === travelerId) return res;
  });
};

//add traveler (only in frontend)
export const addTraveler = async (travelers, newTraveler) => {
  //the data are modified from redux only (in frontend only)
  const addTravelers = travelers.push(newTraveler);

  //here save data on redux
  //addTravelers
};

//edit traveler by id (only in frontend)
export const editTravelerById = async (travelers, id, updatedData) => {
  //the data are modified from redux only (in frontend only)
  const editedTravelers = travelers.map((traveler) => {
    if (traveler.uuid === id) {
      return (traveler = updatedData);
    } else return traveler;
  });

  //here save data on redux
  //editedTravelers
};

//delete traveler by id (only in frontend)
export const deleteTravelerById = async (travelers, id) => {
  //the data are modified from redux only (in frontend only)
  const deletedTravelers = travelers.map((traveler) => {
    if (traveler.uuid !== id) {
      return traveler;
    }
  });

  //here save data on redux
  //deletedTravelers
};

//RESERVATIONS
export const getReservations = async () => {
  //if data on redux get this data
  //else fetch data from api
  return jsonReservations;
};

//add traveler (only in frontend)
export const addReservation = async (reservations, newReservation) => {
  //the data are modified from redux only (in frontend only)
  const addReservations = reservations.push(newReservation);

  //here save data on redux
  //addReservations
};

//edit traveler by id (only in frontend)
export const editReservationById = async (reservations, id, updatedData) => {
  //the data are modified from redux only (in frontend only)
  const editedReservations = reservations.map((res) => {
    if (res.uuid === id) {
      return (res = updatedData);
    } else return res;
  });

  //here save data on redux
  //editedReservations
};

//delete traveler by id (only in frontend)
export const deleteReservationById = async (reservations, id) => {
  //the data are modified from redux only (in frontend only)
  const deletedReservation = reservations.map((res) => {
    if (res.uuid !== id) {
      return res;
    }
  });

  //here save data on redux
  //deletedReservation
};
