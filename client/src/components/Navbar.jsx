import React from "react";
import logo from "../assets/eventlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { GrContact } from "react-icons/gr";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isLogin, isAdmin } = useAuth();

  const handleClick = () => {
    isAdmin ? navigate("/adminpanel") : navigate("/dashboard");
  };
  return (
    <>
      <div className=" bg-transparent flex justify-center ms-30 gap-10 items-center sticky top-0 z-99 text-s text-white font-serif">
        <div className="flex justify-center items-center gap-1">
          <IoMdHome className="text-xl mb-1" />
          <Link to={"/"} className="relative inline-block">HOME</Link>
        </div>
        <Link to={"/about"}>ABOUT</Link>
        <Link to={"/services"}>SERVICES</Link>
        <Link>
          {" "}
          <img src={logo} alt="" className="h-20 w-20" />
        </Link>
        <Link to={"/stories"}>STORIES</Link>
        <Link to={"/gallery"}>GALLERY</Link>
        <div className="flex justify-center items-center gap-2">
          <Link to={"/contact"}>CONTACT</Link>
          <GrContact className="text-xl mt-1 " />
        </div>
        {isLogin ? (
          <div className="flex gap-3 items-center cursor-pointer" onClick={handleClick}>
            <img
              src={user.photo}
              alt="User Dp"
              className="h-10 w-10 border rounded-full object-cover"
            />
            <span className="text-pink-500">{user.fullName}</span>
          </div>
        ) : (
          <button
            className="border p-3 rounded-md bg-transparent"
            onClick={() => navigate("login")}
          >
            {" "}
            Login{" "}
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
