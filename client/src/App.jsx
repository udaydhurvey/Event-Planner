import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/HEro";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <header>
          <Navbar />
          <Hero />
        </header>
      </BrowserRouter>
    </>
  );
};

export default App;
