import React from "react";
import bgphoto from "../assets/backgroundimage.jpg";


const Hero = () => {
  return (
    <div className="-mt-30 relative h-200 flex justify-center items-center">
      <img
        src={bgphoto}
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      
      <div className="absolute inset-0 bg-black opacity-40 -z-10"></div>

      <div className="grid justify-center items-center ">
        <h1 className="text-white text-8xl tracking-tight font-bold font-serif">
          Turn Your Dream
        </h1>
        <h1 className="text-white text-8xl font-bold font-serif tracking-tight text-shadow-2xs text-shadow-amber-500 ml-35">
          Into Reality
        </h1>

        <div className="flex justify-center items-center gap-10 pt-3">
          <button className="rounded px-5 py-3 bg-transparent border-1 border-pink-500 text-pink-500 hover:bg-pink-600 hover:text-white">
            Book Now
          </button>
          <button className="rounded px-5 py-3 bg-transparent border-1 border-pink-500 text-pink-500">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
