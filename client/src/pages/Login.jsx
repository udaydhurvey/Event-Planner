import React, { useState } from "react";
import Loginbg from "../assets/login.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../config/api";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { user, setUser, isLogin, setIsLogin, isAdmin, setIsAdmin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = async (e) => {
    e.preventDefault();
    const logindata = {
      email: email,
      password: password,
    };

    try {
      const res = await api.post("/auth/login", logindata);
      toast.success(res.data.message);
      setPassword("");
      setEmail("");
      setUser(res.data.data);
      sessionStorage.setItem("EventUser",JSON.stringify(res.data.data));
      setIsLogin(true);
      res.data.data.role === "Admin"
        ? (setIsAdmin(true), navigate("/adminpanel"))
        : navigate("/dashboard");
    } catch (error) {
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
      console.log(error);
    }
    console.log(logindata);
  };


  return (
    <div className="mt-[-2%] relative flex items-center justify-center p-4">
      <img src={Loginbg} alt="" className="absolute -z-1 w-full" />
      <div className="backdrop-blur-md border-2 border-[#efcad1] rounded-2xl shadow-2xl p-8 w-full max-w-md mt-10">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4"></div>
          <h1 className="text-3xl font-bold text-pink-500 mb-2">Login</h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-black mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 rounded-lg  text-pink-600 border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div>
            <label className="block text-black mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-3 rounded-lg  text-pink-600 border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div className="flex justify-between items-center text-sm mt-4">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="form-checkbox text-pink-700" />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500  hover:bg-gradient-to-l hover:from-purple-500 hover:to-pink-600  hover:scale-103 text-black font-semibold py-3 rounded-lg shadow-lg transition"
          >
            Login
          </button>
        </form>

        <p className="text-black text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to={"/register"}
            className="text-pink-600  transition hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
