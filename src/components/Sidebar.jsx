import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const menuStyle = ({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-4 md:px-8 rounded-lg transition-all duration-200 cursor-pointer transform ${
      isActive
        ? 'bg-[#1A1A1A] border-r-4 border-[#FF6B00] text-[#FF6B00] shadow-[0_0_10px_#FF6B00] scale-105'
        : 'hover:bg-[#1A1A1A] text-[#E0E0E0] hover:shadow-[0_0_8px_#FF8C32] hover:scale-105'
    }`;

  return (
    <div className="min-h-screen w-64 bg-[#0D0D0D] border-r border-gray-700 p-4">
      {aToken && (
        <ul className="mt-6 flex flex-col gap-2">
          <NavLink to="/admin-dashboard" className={menuStyle}>
            <img src={assets.home_icon} alt="" className="w-5 h-5" />
            <span className="hidden md:block font-medium">Dashboard</span>
          </NavLink>
          <NavLink to="/all-appoinments" className={menuStyle}>
            <img src={assets.appointment_icon} alt="" className="w-5 h-5" />
            <span className="hidden md:block font-medium">Appointments</span>
          </NavLink>
          <NavLink to="/add-doctor" className={menuStyle}>
            <img src={assets.add_icon} alt="" className="w-5 h-5" />
            <span className="hidden md:block font-medium">Add Doctors</span>
          </NavLink>
          <NavLink to="/doctor-list" className={menuStyle}>
            <img src={assets.people_icon} alt="" className="w-5 h-5" />
            <span className="hidden md:block font-medium">Doctors List</span>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className="mt-6 flex flex-col gap-2">
          <NavLink to="/doctor-dashboard" className={menuStyle}>
            <img src={assets.home_icon} alt="" className="w-5 h-5" />
            <span className="hidden md:block font-medium">Dashboard</span>
          </NavLink>
          <NavLink to="/doctor-appointments" className={menuStyle}>
            <img src={assets.appointment_icon} alt="" className="w-5 h-5" />
            <span className="hidden md:block font-medium">Appointments</span>
          </NavLink>
          <NavLink to="/doctor-profile" className={menuStyle}>
            <img src={assets.people_icon} alt="" className="w-5 h-5" />
            <span className="hidden md:block font-medium">Profile</span>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
