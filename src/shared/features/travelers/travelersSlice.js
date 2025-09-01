import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTravelers } from "../../data/fakeApi";

//do the async call to fetch travelers and return the data
export const fetchTravelers = createAsyncThunk("travelers/fetch", async () => {
  const response = await getTravelers();
  return response;
});

//is the initial state of the slice of travelers
const initialState = {
  travelers: [],
  loading: false,
  error: null,
};

//create the slice of travelers with its reducers
const travelersSlice = createSlice({
  name: "travelers",
  initialState,

  //slice actions
  reducers: {
    reduxAddTraveler: (state, action) => {
      state.travelers.push(action.payload);
    },
    reduxEditTraveler: (state, action) => {
      state.travelers = state.travelers.map((traveler) => {
        if (traveler.uuid === action.payload.uuid) {
          return (traveler = action.payload);
        } else return traveler;
      });
    },
    reduxDeleteTraveler: (state, action) => {
      state.travelers = state.travelers.filter((traveler) => {
        if (traveler.uuid !== action.payload.uuid) {
          return traveler;
        }
      });
    },
  },
  //handle the async actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchTravelers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTravelers.fulfilled, (state, action) => {
        state.loading = false;
        state.travelers = action.payload;
      })
      .addCase(fetchTravelers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reduxAddTraveler, reduxEditTraveler, reduxDeleteTraveler } =
  travelersSlice.actions;
export default travelersSlice.reducer;
