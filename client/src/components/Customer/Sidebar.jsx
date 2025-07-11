import React from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaCalendarCheck,
  FaLifeRing,
  FaCommentDots,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ active, setActive }) => {
  return (
    <>
      <div className="w-100 border min-h-[88vh] p-5 flex flex-col justify-between">
        <div>
          <div className="border-b-2 pb-3 h-fit">
            <span className="text-2xl ms-3 font-bold">Customer's Dashboard</span>
          </div>

          <div className="py-8 px-5">
            <ul className="grid gap-2">
              <li
                className={`flex items-center gap-2 border p-3 rounded-lg text-lg hover:bg-cyan-500 hover:text-white transition hover:scale-104 ${
                  active === "overview" && "bg-cyan-500 text-white"
                }`}
                onClick={()=>setActive("overview")}
              >
                <FaTachometerAlt /> Overview
              </li>
              <li
                className={`flex items-center gap-2 border p-3 rounded-lg text-lg  hover:bg-cyan-500 hover:text-white transition hover:scale-104 ${
                  active === "profile" && "bg-cyan-500 text-white"
                }`}
                onClick={()=>setActive("profile")}
              >
                <FaUser /> Profile
              </li>
              <li
                className={`flex items-center gap-2 border p-3 rounded-lg text-lg hover:bg-cyan-500 hover:text-white transition hover:scale-104 ${
                  active === "bookings" && "bg-cyan-500 text-white"
                }`}
                 onClick={()=>setActive("bookings")}
              >
                <FaCalendarCheck /> Bookings
              </li>
              <li
                className={`flex items-center gap-2 border p-3 rounded-lg text-lg hover:bg-cyan-500 hover:text-white  transition hover:scale-104 ${
                  active === "support" && "bg-cyan-500 text-white"
                }`}
                 onClick={()=>setActive("support")}
              >
                <FaLifeRing /> Support
              </li>
              <li
                className={`flex items-center gap-2 border p-3 rounded-lg text-lg hover:bg-cyan-500 hover:text-white ${
                  active === "feedback" && "bg-cyan-500 text-white"
                }`}
                 onClick={()=>setActive("feedback")}
              >
                <FaCommentDots /> Feedback
              </li>
            </ul>
          </div>
        </div>
        <div>
          <button className="text-xl text-red-500 font-bold w-full h-full border border-red-500 p-3 rounded-lg flex gap-2 items-center justify-center hover:bg-red-500 hover:text-white transition hover:scale-104">
            Logout
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;