import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets.js";

const AllAppointments = () => {
  const { atoken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (atoken) getAllAppointments();
  }, [atoken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Header - Adjusted grid columns */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_3fr_2fr_1fr_0.5fr] py-3 px-6 border-b font-semibold text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointments List - Matching the header's grid */}
        {appointments.map((item, index) => {
          return (
            <div
              className="grid grid-cols-[0.5fr_2fr_3fr_2fr_1fr_0.5fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
              key={index}
            >
              <p>{index + 1}</p>
              <p>{item.userData.name}</p>
              <p>{item.slotDate}, {item.slotTime}</p>
              <p>{item.docData.name}</p>
              <p>{currency}{item.amount}</p>
              
              {/* This is the new button for the cancel icon */}
              <button className="flex justify-center p-1">
                {
                item.cancelled
                ? <p className="text-red-400 text-xs font-medium">Cancelled</p>
              : <img onClick={()=>cancelAppointment(item._id)} className="w-5 h-5 cursor-pointer" src={assets.cancel_icon} alt="Cancel" />
              }
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllAppointments;