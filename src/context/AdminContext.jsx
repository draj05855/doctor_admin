import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, SetDashData] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/all-doctors`,
        {},
        { headers: { 'Authorization': `Bearer ${aToken}` } }
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log("Doctors:", data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-availability`,
        { docId },
        { headers: { 'Authorization': `Bearer ${aToken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      console.log("Backend URL:", backendUrl);
      console.log("Token:", aToken);

      const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });

      console.log("Raw response from backend:", data);

      if (data && data.success) {
        if (Array.isArray(data.appointments)) {
          setAppointments(data.appointments);
          console.log("Appointments set:", data.appointments);
        } else {
          console.warn("Appointments data is not an array:", data.appointments);
        }
      } else {
        toast.error(data?.message || "Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if(aToken){
    console.log("getAllAppointments called");
    getAllAppointments();
    }
  }, []);

  const cancelAppointment = async (appointmentId) =>{
    try{

          const { data } = await axios.post(`${backendUrl}/api/admin/cancel-appointment`,{appointmentId}, {
        headers: { Authorization: `Bearer ${aToken}` },
      });
      if(data.success){
        toast.success(data.message)
        getAllAppointments()
      }else{
        toast.error(error.message)
      }
    }catch(error){
        toast.error(error.message)
    }
  }

  const getDashData = async () =>{
    try{
       const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`,{
        headers: { Authorization: `Bearer ${aToken}` },
      });
      if(data.success){
        SetDashData(data.dashData)
        console.log(data.dashData);
        
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  }

  const value = {
    aToken, setAToken,
    backendUrl, doctors, getAllDoctors, changeAvailability,
    appointments, setAppointments, getAllAppointments, cancelAppointment, dashData, getDashData
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
