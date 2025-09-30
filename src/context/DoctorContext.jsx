import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);

  // ✅ Rename to setProfileData (was setprofileData)
  const [profileData, setProfileData] = useState(false);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/doctor/appointments`, {
        headers: { Authorization: `Bearer ${dToken}` },
      });
      if (data.success) {
        const fetchedAppointments = Array.isArray(data.appointments) ? data.appointments : [];
        setAppointments(fetchedAppointments.reverse());
      } else toast.error(data.message);
    } catch (error) {
      console.log("Error fetching appointments:", error);
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const config = { headers: { Authorization: `Bearer ${dToken}` } };
      const { data } = await axios.post(`${backendURL}/api/doctor/complete-appointment`, { appointmentId }, config);
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else toast.error(data.message);
    } catch (error) {
      console.log("Error completing appointment:", error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const config = { headers: { Authorization: `Bearer ${dToken}` } };
      const { data } = await axios.post(`${backendURL}/api/doctor/cancel-appointment`, { appointmentId }, config);
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else toast.error(data.message);
    } catch (error) {
      console.log("Error cancelling appointment:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) localStorage.setItem("dToken", dToken);
    else localStorage.removeItem("dToken");
  }, [dToken]);

  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/doctor/dashboard`, {
        headers: { Authorization: `Bearer ${dToken}` },
      });
      if (data.success) setDashData(data.dashData);
      else toast.error(data.message);
    } catch (error) {
      console.log("Error fetching dashboard:", error);
      toast.error(error.message);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/doctor/profile`, {
        headers: { Authorization: `Bearer ${dToken}` },
      });
      if (data.success) setProfileData(data.profileData);
    } catch (error) {
      console.log("Error fetching profile:", error);
      toast.error(error.message);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendURL,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    setDashData,
    getDashData,
    profileData,
    setProfileData, // ✅ Correct name
    getProfileData,
  };

  return <DoctorContext.Provider value={value}>{props.children}</DoctorContext.Provider>;
};

export default DoctorContextProvider;
