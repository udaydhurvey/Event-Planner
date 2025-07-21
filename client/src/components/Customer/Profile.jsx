import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../config/api";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProfileEditModal from "./ProfileEditModal";

const Profile = () => {
  const navigate = useNavigate();
  const [userdata, setUserData] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchUserData = async () => {
    try {
      const res = await api.get("/user/profile");
      setUserData(res.data.data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [isEditModalOpen]);

  return (
    <>
      <div className="flex justify-between bg-gradient-to-r from-pink-600 to-purple-600 p-4 shadow-lg">
        <h1 className="text-2xl font-bold text-white flex items-center mb-1">Profile</h1>
        <button
          className="border border-white hover:scale-105 text-white p-2 rounded-lg font-bold flex gap-2 justify-center items-center hover:bg-pink-600 text-lg"
          onClick={() => setIsEditModalOpen(true)}
        >
          {" "}
          <FaUserEdit className="text-xl" />
          Edit
        </button>
      </div>

      <div className=" p-5 flex">
        <div className="flex flex-col gap-5 border w-2/7 m-4 rounded-lg p-5">
          <div className="border w-50 h-50 rounded-full overflow-hidden ms-8">
            <img
              src={userdata.photo}
              alt="profilePic"
              className="w-50 h-50 object-cover rounded-full"
            />
          </div>
          <div>
            <b>Name :</b> <span>{userdata.fullName}</span>
          </div>
          <div>
            <b> Email:</b> <span>{userdata.email}</span>
          </div>
          <div>
            <b>Phone:</b> <span>{userdata.phone}</span>
          </div>
        </div>

        <div className="border m-4 p-5 w-5/7 grid gap-5 rounded-lg ">
          <h2 className="text-xl font-semibold text-pink-700 mb-4 border-b border-pink-200 pb-2">
            Additional Information
          </h2>
          <div>
            <b>Gender :</b> <span>{userdata.gender}</span>
          </div>
          <div>
            <b>Occuption:</b> <span>{userdata.occupation}</span>
          </div>
          <div>
            <b>Address:</b> <span>{userdata.address}</span>
          </div>
          <div>
            <b>City :</b> <span>{userdata.city}</span>
          </div>
          <div>
            <b>District:</b> <span>{userdata.district}</span>
          </div>
          <div>
            <b>State:</b> <span>{userdata.state}</span>
          </div>

          <div>
            <b>Representing:</b> <span>{userdata.representing}</span>
          </div>
        </div>
      </div>

      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
        }}
        oldData={userdata}
      />
    </>
  );
};

export default Profile;
