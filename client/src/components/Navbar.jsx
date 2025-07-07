import React from "react";
import logo from "../assets/eventlogo.png";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { GrContact } from "react-icons/gr";

const Navbar = () => {
  return (
    <>
      <div className="bg-transparent flex justify-center gap-10 items-center sticky top-0 z-99 text-s text-white font-serif">
        <div className="flex justify-center items-center gap-1">
          <Link to={"/"}>HOME</Link>
          <IoMdHome  className="text-xl mb-1"/>
        </div>
        <Link to={"/about"}>ABOUT</Link>
        <Link to={"/services"}>SERVICES</Link>
        <Link>
          {" "}
          <img src={logo} alt="" className="h-20 w-20" />
        </Link>
        <Link to={"/stories"}>STORIES</Link>
        <Link to={"/gallery"}>GALLERY</Link>
        <div className="flex justify-center items-center gap-2 hover:translate-y-9">
          <Link to={"/contact"}>CONTACT</Link>
          <GrContact className="text-xl mt-1 "/>
          
        </div>
        <button className="rounded px-3 py-1 bg-transparent border-1 border-pink-500 text-pink-500 hover:bg-pink-600 hover:text-white">
          <Link to={"/Login"}>Login</Link>
        </button>
      </div>
    </>
  );
};

export default Navbar;
