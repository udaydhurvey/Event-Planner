import React, { useState } from "react";
import bgcontact from "../assets/contact1.jpg";
import { Link } from "react-router-dom";
import { MdMessage } from "react-icons/md";
import contact from "../assets/lets-chat.jpg";

const Contact = () => {
  const [contactData, SetContactData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    SetContactData((previousData) => ({ ...previousData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contactData);

    SetContactData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <>
      <div className="relative flex justify-center items-center gap-5">
        <img src={bgcontact} alt="" className="absolute -z-1" />
        <div className="pt-10 relative left-6">
          <img src={contact} alt="" className="h-149  w-100" />
        </div>
        <div className=" bg-white border-2 border-[#d9cbb7]  shadow-2xl p-8 w-full max-w-md mt-10">
          <h1 className="text-4xl font-bold text-center text-[#b42c38] mb-6 font-serif">
            Let's Talk Us
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 font-medium font-serif text-black">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={contactData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#8b5a5c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9cbb7]"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium font-serif text-black">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={contactData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#8b5a5c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9cbb7]"
              />
            </div>

            <div>
              <label className="font-serif text-black font-medium">
                Contact Number
              </label>
              <input
                type="tel"
                name="phone"
                value={contactData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#8b5a5c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9cbb7]"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium font-serif text-black">
                Message
              </label>
              <textarea
                name="message"
                required
                rows="4"
                value={contactData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#8b5a5c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9cbb7]"
                placeholder="Write your message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#b42c38] text-white py-3  rounded-lg hover:bg-[#915156] transition duration-300"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="pt-1.5">
                  <MdMessage />
                </div>
                <div>
                  <span> Send Message</span>
                </div>
              </div>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
