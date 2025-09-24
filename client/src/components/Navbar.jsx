import React from "react";
import logo from "../assets/eventlogo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { GrContact } from "react-icons/gr";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isLogin, isAdmin } = useAuth();
  const [navBg, setnavBg] = useState(false);

  const location = useLocation().pathname;

  const NavbarDesign = () => {
    location === "/" || location === "/login" || location === "/register"
      ? setnavBg(false)
      : setnavBg(true);
  };

  const handleClick = () => {
    isAdmin ? navigate("/adminpanel") : navigate("/dashboard");
  };

  useEffect(()=>{
    NavbarDesign();
  },[location]);

  return (
    <>
      <div className={`${navBg ? "bg-pink-800" : "bg-transparent"} flex justify-between gap-15 items-center sticky top-0 z-99 text-s text-white  font-serif`}>
        <div className="ps-10">
          <h1 className="cursor-pointer">EVENTPLANNER</h1>
        </div>
        <div className="flex justify-center  gap-20 pe-5">
          <div className="flex items-center justify-baseline gap-18">
            <div className="flex justify-center items-center gap-1">
              <IoMdHome className="text-xl mb-1" />
              <Link to={"/"} className="relative inline-block">
                HOME
              </Link>
            </div>
            <Link to={"/about"}>ABOUT</Link>
            <Link to={"/services"}>SERVICES</Link>
          </div>
          <Link>
            {" "}
            <img src={logo} alt="" className="h-20 w-20" />
          </Link>
          <div className="flex items-center gap-15 pe-5">
            <Link to={"/stories"}>STORIES</Link>
            <Link to={"/gallery"}>GALLERY</Link>
            <div className="flex justify-center items-center gap-2">
              <Link to={"/contact"}>CONTACT</Link>
              <GrContact className="text-xl mt-1 " />
            </div>
            {isLogin ? (
              <div
                className="flex gap-3 items-center cursor-pointer"
                onClick={handleClick}
              >
                <img
                  src={user.photo}
                  alt="User Dp"
                  className="h-10 w-10 border rounded-full object-cover"
                />
                <span className="text-pink-400">{user.fullName}</span>
              </div>
            ) : (
              <button
                className="rounded px-5 py-1 bg-transparent border-1 border-pink-500 text-pink-500 hover:bg-pink-600 hover:text-white"
                onClick={() => navigate("/login")}
              >
                {" "}
                Login{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
