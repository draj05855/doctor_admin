import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getDashData();
  }, [dToken]);

  if (!dashData) return null;

  return (
    <div className="min-h-screen p-5 text-[#E0E0E0]">
      {/* Top Stats */}
      <div className="flex flex-wrap gap-3">
        {[
          { icon: assets.earning_icon, count: `${currency}${dashData.earning}`, label: "Earnings" },
          { icon: assets.appointment_icon, count: dashData.appointment, label: "Appointments" },
          { icon: assets.patients_icon, count: dashData.patient, label: "Patients" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 min-w-[200px] rounded border border-gray-700 cursor-pointer
                       bg-[#1A1A1A] hover:scale-105 hover:border-[#FF6B00] hover:shadow-[0_0_15px_#FF6B00] transition-all"
          >
            <img className="w-14" src={item.icon} alt={item.label} />
            <div>
              <p className="text-xl font-semibold">{item.count}</p>
              <p className="text-gray-400">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Bookings */}
      <div className="bg-[#1A1A1A] mt-6 rounded border border-gray-700">
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-gray-700">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold text-[#FF6B00]">Latest Bookings</p>
        </div>

        <div>
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-6 py-3 gap-3 hover:bg-[#2A2A2A] rounded transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  className="rounded-full w-10 border-2 border-gray-700 hover:border-[#FF6B00]"
                  src={assets.user}
                  alt={item.userData.name}
                />
                <div className="flex flex-col text-sm">
                  <p className="font-medium">{item.userData.name}</p>
                  <p className="text-gray-400">{item.slotDate}</p>
                </div>
              </div>

              <p
                className={`px-2 py-1 rounded-full text-xs font-medium text-center ${
                  item.isCompleted
                    ? "bg-gradient-to-r from-green-500 to-green-400 text-white"
                    : item.cancelled
                    ? "bg-gradient-to-r from-red-500 to-red-400 text-white"
                    : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                } transition-shadow duration-300 hover:shadow-[0_0_8px_#FF6B00]`}
              >
                {item.isCompleted
                  ? "Completed"
                  : item.cancelled
                  ? "Cancelled"
                  : "Pending"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
