import React from "react";
import logo from "../assets/eventlogo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="bg-transparent flex justify-center gap-10 items-center sticky top-0 z-99 text-2xl text-white">
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/services"}>Services</Link>
       <Link> <img src={logo} alt="" className="h-20 w-20" /></Link>
        <Link to={"/stories"}>Stories</Link>
        <Link to={"/gallery"}>Gallery</Link>
        <Link to={"/contact"}>Contact</Link>
      </div>
    </>
  );
};

export default Navbar;
