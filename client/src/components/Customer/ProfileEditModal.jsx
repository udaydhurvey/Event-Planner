import React, { useEffect, useState } from "react";
import { IoIosCloseCircle, IoIosSave } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import api from "../../config/api";
import {toast} from "react-hot-toast"

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];



const ProfileEditModal = ({ isOpen, onClose, oldData }) => {
  const [userdata, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    photo: "",
    gender: "",
    occupation: "",
    address: "",
    city: "",
    district: "",
    state: "",
    representing: "",
  });

  const [preview, setPreview] = useState("");
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setPicture(e.target.files[0]);
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("fullName", userdata.fullName);
    formData.append("phone", userdata.phone);
    formData.append("picture", picture);
    formData.append("gender",userdata.gender)
    formData.append("occupation",userdata.occupation)
    formData.append("address",userdata.address)
    formData.append("city",userdata.city)
    formData.append("state",userdata.state)
    formData.append("district",userdata.district)
    formData.append("representing",userdata.representing)
    

    try {
      const res = await api.put("/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);
      setUserData(res.data.data);
      
    } catch (error) {
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (oldData) {
      setUserData({
        fullName: oldData.fullName || "",
        email: oldData.email || "",
        phone: oldData.phone || "",
        photo: oldData.photo || "",
      });
    }
  }, [isOpen, oldData]);

  if (!isOpen) return null;
  return (
    <>
      <div className="inset-0 fixed bg-black/70 flex justify-center items-center">
        <div
          className={`border w-1/2 max-h-7/10 mt-10 bg-white rounded-lg overflow-y-auto`}
        >
          <div className="text-xl flex justify-between p-3 border-b-2 sticky top-0 bg-white z-10">
            <h1 className="font-bold">Edit Profile</h1>
            <button onClick={onClose}>
              <IoIosCloseCircle className="text-3xl text-red-500" />
            </button>
          </div>

          <div className="flex flex-col gap-4 p-6 bg-white rounded-2xl shadow-md">
            <div className="relative w-40 h-40 mx-auto">
              <div className="w-full h-full rounded-full overflow-hidden shadow-sm border border-rose-200">
                <img
                  src={preview || userdata.photo}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="border rounded-full p-2 w-fit absolute bottom-2 right-2 bg-rose-200 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer shadow-sm">
                <label
                  className="text-2xl cursor-pointer"
                  htmlFor="imageUpload"
                >
                  <FaCamera />
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="imageUpload"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="grid gap-4 p-4 w-full grid-cols-[30%_70%] items-center text-gray-800">
              <span className="font-semibold text-sm">Email:</span>
              <input
                type="text"
                name="fullname"
                value={userdata.email}
                onChange={handleChange}
                className="p-2 w-full bg-gray-100 border border-gray-200 rounded-md"
                disabled
              />

              <span className="font-semibold text-sm">Name:</span>
              <input
                type="text"
                name="fullname"
                value={userdata.fullName}
                onChange={handleChange}
                className="p-2 border border-rose-300 rounded-md w-full"
              />

              <span className="font-semibold text-sm">Phone:</span>
              <input
                type="tel"
                name="phone"
                value={userdata.phone}
                onChange={handleChange}
                className="p-2 border border-rose-300 rounded-md w-full"
              />

              <span className="font-semibold text-sm">Gender:</span>
              <select
                name="gender"
                value={userdata.gender}
                onChange={handleChange}
                className="p-2 border border-rose-300 rounded-md w-full bg-white"
              >
                <option value="N/A">N/A</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <span className="font-semibold text-sm">Occuption:</span>
              <input
                type="text"
                name="occupation"
                value={userdata.occupation}
                onChange={handleChange}
                className="p-2 border border-rose-300 rounded-md w-full"
              />

              <span className="font-semibold text-sm">Address:</span>
              <input
                type="text"
                name="address"
                value={userdata.address}
                onChange={handleChange}
                className="p-2 border border-rose-300 rounded-md w-full"
              />

              <span className="font-semibold text-sm">City:</span>
              <input
                type="text"
                name="city"
                value={userdata.city}
                onChange={handleChange}
                className="p-2 border border-rose-300 rounded-md w-full"
              />

              <span className="font-semibold text-sm">District:</span>
              <input
                type="text"
                name="district"
                value={userdata.district}
                onChange={handleChange}
                className="p-2 border border-rose-300 rounded-md w-full"
              />

              <span className="font-semibold text-sm">State:</span>
              <select
                name="state"
                value={userdata.state}
                onChange={handleChange}
                className="p-2 border border-rose-300 rounded-md w-full bg-white"
              >
                <option value="N/A">N/A</option>
                {indianStates ? (
                  indianStates.map(
                    (state,i) => <option value={state} key={i}>{state}</option>
                  )
                ) : (
                  <option value={""}>No States available</option>
                )}
              </select>

              <span className="font-semibold text-sm">Representing:</span>
              <select
                name="representing"
                value={userdata.representing}
                onChange={handleChange}
                className="p-2 border border-rose-300 rounded-md w-full bg-white"
              >
                <option value="N/A">N/A</option>
                <option value="male">Bride Side</option>
                <option value="female">Groom Side</option>
                <option value="other">Common</option>
              </select>
            </div>

            <button
              className="border p-2 rounded-lg flex gap-2 justify-center items-center bg-rose-300 hover:bg-rose-400 transition-all text-white font-semibold text-lg shadow-sm"
              onClick={handleEditProfile}
            >
              <IoIosSave />
              {loading ? "Saving Data . . . " : "Save Data"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEditModal;
