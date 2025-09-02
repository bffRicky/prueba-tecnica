import jsonTravelers from "./travelers.json";
import jsonReservations from "./reservations.json";

//get all travelers
export const getTravelers = async () => {
  return jsonTravelers;
};

//get traveler by id
export const getTravelerById = async (travelers, id) => {
  return travelers.find((traveler) => traveler.uuid === id);
};

//RESERVATIONS
export const getReservations = async () => {
  //if data on redux get this data
  //else fetch data from api
  return jsonReservations;
};
