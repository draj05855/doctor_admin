import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl mx-auto my-5 p-4 bg-white shadow rounded-lg">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">All Appointments</h2>
      
      <div className="overflow-x-auto">
        <div className="min-w-full border rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1.5fr_1fr_1fr_1fr] gap-2 bg-gray-100 border-b py-2 px-4 text-gray-600 font-medium text-sm">
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
                className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1.5fr_1fr_1fr_1fr] gap-2 items-center border-b last:border-0 py-3 px-4 hover:bg-gray-50 transition"
              >
                {/* Sr. No */}
                <p className="text-gray-700 font-medium">{index + 1}</p>

                {/* Patient Name */}
                <p className="text-gray-700">{item.userData?.name || "N/A"}</p>

                {/* Payment Mode */}
                <p className="text-gray-700">
                  {item.payment ? 'Online' : 'Cash'}
                </p>

                {/* Date & Time */}
                <p className="text-gray-700">{item.slotDate}, {item.slotTime}</p>

                {/* Fees */}
                <p className="text-gray-700">{currency}{item.amount}</p>

                {/* Status */}
                <p
                  className={`font-medium ${
                    item.isCompleted
                      ? 'text-green-600'
                      : item.cancelled
                      ? 'text-red-600'
                      : 'text-gray-700'
                  }`}
                >
                  {item.isCompleted
                    ? 'Completed'
                    : item.cancelled
                    ? 'Cancelled'
                    : 'Pending'}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {!item.isCompleted && !item.cancelled && (
                    <>
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        src={assets.cancel_icon}
                        alt="Cancel"
                        className="w-5 h-5 cursor-pointer hover:opacity-80"
                      />
                      <img
                        onClick={() => completeAppointment(item._id)}
                        src={assets.tick_icon}
                        alt="Confirm"
                        className="w-5 h-5 cursor-pointer hover:opacity-80"
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
    </div>
  );
};

export default DoctorAppointment;
