import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import Home from "./pages/homePage";

const App = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
