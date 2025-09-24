import React, { useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../../config/api";
import { IoIosCloseCircle } from "react-icons/io";

const AddBanquetHallModal = ({ isOpen, onClose }) => {
  const [banquethallData, setBanquethallData] = useState({
    hallName: "",
    address: "",
    capacity: "",
    managerName: "",
    contactNumber: "",
    email: "",
    rent: "",
    minBookingAmount: "",
    featureDescription: "",
  });

  const [preview, setPreview] = useState([]);
  const [photos, setPhotos] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBanquethallData((previousData = { ...previousData, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const Image = e.target.files;
    setPreview([]);
    Array.from(Image).forEach((image) => {
      const imageURL = URL.createObjectURL(image);
      setPreview((previousData) => [...previousData, imageURL]);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("hallName", banquethallData.hallName);
    formData.append("address", banquethallData.address);
    formData.append("capacity", banquethallData.capacity);
    formData.append("managerName", banquethallData.managerName);
    formData.append("contactNumber", banquethallData.contactNumber);
    formData.append("email", banquethallData.email);
    formData.append("rent", banquethallData.rent);
    formData.append("minBookingAmount", banquethallData.minBookingAmount);
    formData.append("featureDescription", banquethallData.featureDescription);

    if (photos && photos.length > 0) {
      Array.from(photos).forEach((photo) => {
        formData.append("picture", photo);
      });
    }

    try {
      const res = await api.post("/admin/addbanquethall", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
    }
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
        <div className="w-full max-w-2xl bg-white rounded-xl overflow-y-auto max-h-[85vh] shadow-lg mt-20 scrollbar-hide">
          <div className="sticky top-0 bg-white z-10 border-b px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold"> Banquet Hall</h1>
            <button onClick={onClose}>
              <IoIosCloseCircle className="text-3xl text-red-500 hover:text-red-600 transition" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 p-6">
            <input
              type="text"
              name="hallName"
              placeholder="Hall Name"
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={banquethallData.hallName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="ress"
              placeholder="ress"
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={banquethallData.ress}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="capacity"
              placeholder="Capacity"
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={banquethallData.capacity}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-2 gap-2">
              <div>
                <input
                  type="text"
                  name="managerName"
                  placeholder="Manager Name"
                  className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={banquethallData.managerName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="contactNumber"
                  placeholder="Contact Number"
                  className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={banquethallData.contactNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={banquethallData.email}
              onChange={handleChange}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="number"
                  name="rent"
                  placeholder="Rent (₹)"
                  className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={banquethallData.rent}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  name="minAmount"
                  placeholder="minBookingAmount"
                  className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={banquethallData.minAmount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <textarea
              name="featureDescription"
              placeholder="Feature Description"
              rows={4}
              className="w-full border px-4 py-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={banquethallData.featureDescription}
              onChange={handleChange}
              required
            />

            <div>
              <input
                type="file"
                name="photo"
                accept="image/"
                onChange={handlePhotoChange}
                multiple
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {preview.length > 0 &&
                preview.map((image, index) => <img src={image} key={index} />)}
            </div>

            <div></div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-100 transition font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg font-semibold shadow hover:from-green-500 hover:to-blue-600 transition"
              >
                Hall
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBanquetHallModal;
