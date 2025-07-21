import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import { Toaster } from "react-hot-toast";
import CustomerDashboard from "./pages/CustomerDashboard";



const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/dashboard" element={<CustomerDashboard />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
