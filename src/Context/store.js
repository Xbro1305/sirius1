import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reMenu } from "./Menu";

export const store = configureStore({
  reducer: combineReducers({
    menu: reMenu,
  }),
  devTools: process.env.NODE_ENV !== "production",
});
