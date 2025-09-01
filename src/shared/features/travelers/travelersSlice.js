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
