import React from "react";
import "./App.css";
import Product from "./components/Product";
import Home from "./components/Home";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
