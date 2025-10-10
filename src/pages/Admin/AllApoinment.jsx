import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets.js";

const AllAppointments = () => {
  const { atoken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (atoken) getAllAppointments();
  }, [atoken]);

  return (
    <div className="bg-[#0D0D0D] min-h-screen w-full p-5 text-[#E0E0E0]">
      <p className="mb-3 text-lg font-medium text-[#FF6B00]">
        All Appointments
      </p>
      <div className="bg-[#1A1A1A] border border-gray-700 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_3fr_2fr_1fr_0.5fr] py-3 px-6 border-b border-gray-700 font-semibold text-[#E0E0E0]">
          <p>#</p>
          <p>Patient</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointments List */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_3fr_2fr_1fr_0.5fr] items-center py-3 px-6 border-b border-gray-700 hover:bg-[#2A2A2A] transition-colors rounded-md"
          >
            <p>{index + 1}</p>
            <p>{item.userData.name}</p>
            <p>
              {item.slotDate}, {item.slotTime}
            </p>
            <p>{item.docData.name}</p>
            <p>
              {currency}
              {item.amount}
            </p>

            <button className="flex justify-center p-1">
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-5 h-5 cursor-pointer hover:scale-110 transition-all"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;

