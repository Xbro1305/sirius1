import React from "react";
import { Header } from "./Components/Header/Header";
import { Provider } from "react-redux";
import { store } from "./Context/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Menu } from "./Components/Menu/Menu";
import { Districts } from "./Pages/Manager_districts/Manager_districts";

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        {/* <Menu /> */}
        <Routes>
          <Route path="/" element={<h1>Home </h1>} />
          <Route
            path="/manager_districts/:manager_id"
            element={<Districts />}
          />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};
