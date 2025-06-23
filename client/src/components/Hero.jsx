import React from "react";
import bgphoto from "../assets/backgroundimage.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="-mt-30 relative h-200 flex justify-center items-center">
      <img src={bgphoto} alt="" className="absolute -z-1" />

      <div className="grid justify-center items-center ">
        <h1 className="text-red-400 text-8xl font-bold font-serif">
          Turn Your Dream 
        </h1>
        <h1 className="text-red-400 text-8xl font-bold font-serif ml-35">Into Reality</h1>

        <div className="flex justify-center items-center gap-10">
            <button className="rounded px-5 py-3 bg-red-400"><Link to={"/Login"}>Login</Link></button>
            <button className="rounded px-5 py-3 bg-red-400">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
