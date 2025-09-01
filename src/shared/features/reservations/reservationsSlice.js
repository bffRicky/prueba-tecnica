import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getReservations } from "../../data/fakeApi";

//do the async call to fetch reservations and return the data
export const fetchReservations = createAsyncThunk("reservations/fetch", async () => {
  const response = await getReservations();
  return response;
});

//is the initial state of the slice of reservations
const initialState = {
  reservations: [],
  loading: false,
  error: null,
};

//create the slice of reservations with its reducers
const reservationsSlice = createSlice({
  name: "reservations",
  initialState,

  //slice actions
  reducers: {
    reduxAddReservation: (state, action) => {
      state.reservations.push(action.payload);
    },
    reduxEditReservation: (state, action) => {
      state.reservations = state.reservations.map((reservation) => {
        if (reservation.uuid === action.payload.uuid) {
          return (reservation = action.payload);
        } else return reservation;
      });
    },
    reduxDeleteReservation: (state, action) => {
      state.reservations = state.reservations.filter((reservation) => {
        if (reservation.uuid !== action.payload.uuid) {
          return reservation;
        }
      });
    },
  },
  //handle the async actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reduxAddReservation, reduxEditReservation, reduxDeleteReservation } =
  reservationsSlice.actions;
export default reservationsSlice.reducer;
