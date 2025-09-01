import { configureStore } from "@reduxjs/toolkit";
import travelersReducer from "../features/travelers/travelersSlice";

//create the redux store and its reducers
export const store = configureStore({
  reducer: {
    travelers: travelersReducer,
  },
});
