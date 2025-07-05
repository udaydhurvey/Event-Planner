import React from "react";
import { useState } from "react";
import Loginbg from "../assets/login.jpg";
import { Link } from "react-router-dom";


function Register() {

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  })

  const handleChange=(e)=>{
    const {name,value}=e.target;

    setRegisterData((previousData) =>({...previousData,[name]:value}))
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(registerData);

    setRegisterData({
      fullName: "",
      email: "",
      password: "",
      phone: "",
    })
  }


  return (
    <div className="flex items-center justify-center h-200">
      <img src={Loginbg} alt="" className="absolute -z-1 " />
      <div className="backdrop-blur-md border-2 border-[#efcad1] rounded-2xl shadow-2xl p-8 w-full max-w-md mt-10">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4"></div>
          <h1 className="text-3xl font-bold text-[#930959] mb-2">
            Registration Form
          </h1>
        </div>

        <form className="space-y-4 relative top-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-black mb-1">Name</label>
            <input
              type="name"
              name="fullName"
              placeholder="Enter your name"
              value={registerData.fullName}
              onChange={handleChange}
              className="w-full p-3 rounded-lg  text-pink-600 border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-black mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
               value={registerData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg  text-pink-600 border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-black mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your mobile number"
               value={registerData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg  text-pink-600 border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-black mb-1">Create Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create your password"
               value={registerData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg  text-pink-600 border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-300 text-black font-semibold py-3 rounded-lg shadow-lg transition"
          >
            Register Here
          </button>
        </form>

        <p className="text-[#000000] text-center mt-4">
          Already have an account?{" "}
          <Link to={"/login"} className="text-pink-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
