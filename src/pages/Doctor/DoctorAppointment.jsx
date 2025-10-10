import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  // Helper to determine badge style
  const getStatusBadge = (item) => {
    if (item.isCompleted) return 'bg-gradient-to-r from-green-500 to-green-400 text-white';
    if (item.cancelled) return 'bg-gradient-to-r from-red-500 to-red-400 text-white';
    return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
  };

  return (
    <div className="bg-[#0D0D0D] min-h-screen w-full p-5 text-[#E0E0E0]">
      <p className="mb-3 text-lg font-medium text-[#FF6B00]">All Appointments</p>

      <div className="bg-[#1A1A1A] border border-gray-700 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1.5fr_1fr_1fr_1fr] py-3 px-6 border-b border-gray-700 font-semibold text-[#E0E0E0]">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Status</p>
          <p>Action</p>
        </div>

        {/* Table Rows */}
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1.5fr_1fr_1fr_1fr] items-center py-3 px-6 border-b border-gray-700 rounded-md
                         bg-[#1A1A1A] transition-all
                         hover:bg-gradient-to-r hover:from-[#1A1A1A] hover:to-[#FF6B0050]"
            >
              <p className="text-[#E0E0E0] font-medium">{index + 1}</p>
              <p className="text-[#E0E0E0]">{item.userData?.name || 'N/A'}</p>
              <p className="text-[#E0E0E0]">{item.payment ? 'Online' : 'Cash'}</p>
              <p className="text-[#E0E0E0]">{item.slotDate}, {item.slotTime}</p>
              <p className="text-[#E0E0E0]">{currency}{item.amount}</p>

              {/* Status Badge with hover glow */}
              <p
                className={`px-2 py-1 rounded-full text-xs font-medium text-center ${getStatusBadge(item)}
                            transition-shadow duration-300
                            hover:shadow-[0_0_8px_#FF6B00]`}
              >
                {item.isCompleted
                  ? 'Completed'
                  : item.cancelled
                  ? 'Cancelled'
                  : 'Pending'}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {!item.isCompleted && !item.cancelled && (
                  <>
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      alt="Cancel"
                      className="w-5 h-5 cursor-pointer hover:scale-110 transition-all hover:brightness-125"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      src={assets.tick_icon}
                      alt="Confirm"
                      className="w-5 h-5 cursor-pointer hover:scale-110 transition-all hover:brightness-125"
                    />
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-gray-500">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointment;
