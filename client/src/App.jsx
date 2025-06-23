import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/HEro";
import Login from "./pages/Login";
import Register from"./pages/Register";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <header>
          <Navbar />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
