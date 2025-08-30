import React from "react";
import App from "./App";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register";

const AppLayer = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppLayer;
