import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllApoinment from './pages/Admin/AllApoinment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { AdminContext, default as AdminContextProvider } from './context/AdminContext';
import { DoctorContext, default as DoctorContextProvider } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import Doctorprofile from './pages/Doctor/Doctorprofile';

const AppContent = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  if (aToken) {
    // Admin logged in
    return (
      <div className='bg-[#F8F9FD]'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Routes>
            <Route path='/' element={<></>} />
            <Route path='/admin-dashboard' element={<Dashboard />} />
            <Route path='/all-appoinments' element={<AllApoinment />} />
            <Route path='/add-doctor' element={<AddDoctor />} />
            <Route path='/doctor-list' element={<DoctorsList />} />
            {/* Optional: doctor routes if admin wants to see */}
            <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
            <Route path='/doctor-appointments' element={<DoctorAppointment />} />
            <Route path='/doctor-profile' element={<Doctorprofile />} />
          </Routes>
        </div>
      </div>
    )
  } else if (dToken) {
    // Doctor logged in
    return (
      <div className='bg-[#F8F9FD]'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Routes>
            <Route path='/' element={<DoctorDashboard />} />
            <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
            <Route path='/doctor-appointments' element={<DoctorAppointment />} />
            <Route path='/doctor-profile' element={<Doctorprofile />} />
          </Routes>
        </div>
      </div>
    )
  } else {
    // No login
    return (
      <>
        <Login />
        <ToastContainer />
      </>
    )
  }
}

const App = () => {
  return (
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContent />
      </DoctorContextProvider>
    </AdminContextProvider>
  )
}

export default App
