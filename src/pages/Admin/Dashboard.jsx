import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) getDashData();
  }, [aToken]);

  return (
    <div className=" min-h-screen p-5 text-[#E0E0E0]">
      {dashData && (
        <>
          {/* Stats Cards */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: assets.doctor_icon, count: dashData.doctors, label: "Doctors" },
              { icon: assets.appointment_icon, count: dashData.appointments, label: "Appointments" },
              { icon: assets.patients_icon, count: dashData.patients, label: "Patients" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-[#1A1A1A] p-4 min-w-52 rounded border border-gray-700 cursor-pointer hover:scale-105 hover:border-[#FF6B00] hover:shadow-[0_0_15px_#FF6B00] transition-all"
              >
                <img className="w-14" src={item.icon} alt={item.label} />
                <div>
                  <p className="text-xl font-semibold text-[#E0E0E0]">{item.count}</p>
                  <p className="text-gray-400">{item.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Latest Booking */}
          <div className="bg-[#1A1A1A] mt-10 rounded border border-gray-700">
            <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border-b border-gray-700">
              <img src={assets.list_icon} alt="" />
              <p className="font-semibold text-[#FF6B00]">Latest Booking</p>
            </div>

            <div className="pt-4">
              {dashData.latestAppointments.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center px-6 py-3 gap-3 hover:bg-[#2A2A2A] transition-colors rounded-md"
                >
                  <img
                    className="rounded-full w-10 border-2 border-gray-700 hover:border-[#FF6B00]"
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-[#E0E0E0] font-medium">{item.docData.name}</p>
                    <p className="text-gray-400">{item.slotDate}</p>
                  </div>
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
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
