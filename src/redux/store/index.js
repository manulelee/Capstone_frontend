import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../reducers/profile";

const store = configureStore({
  reducer: profileReducer,
});

export default store;
