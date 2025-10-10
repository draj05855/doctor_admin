import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="bg-[#0D0D0D] min-h-screen w-full p-5 text-[#E0E0E0]">
      <h1 className="text-lg font-medium text-[#FF6B00]">All Doctors</h1>

      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-[#1A1A1A] border border-gray-700 rounded-xl max-w-56 overflow-hidden cursor-pointer hover:shadow-[0_0_10px_#FF6B00] transition-all"
          >
            <img
              className="group p-2 rounded-lg transition-all duration-500 bg-[#2A2A2A] hover:bg-[#FF6B00]"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4">
              <p className="text-[#E0E0E0] text-lg font-medium">{item.name}</p>
              <p className="text-gray-400 text-sm">{item.speciality}</p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                  className="accent-[#FF6B00]"
                />
                <p className="text-[#E0E0E0]">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
