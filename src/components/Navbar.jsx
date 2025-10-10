// Navbar.jsx

import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)
    const navigate = useNavigate()

    const logout = () => {
        if(aToken){
            setAToken('')
            localStorage.removeItem('aToken')
        }
        if(dToken){
            setDToken('')
            localStorage.removeItem('dToken')
        }
        navigate('/')
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b'
         style={{
            background: 'linear-gradient(135deg, #111111, #1C1C1C, #2A2A2A)',
            borderBottom: '1px solid #444'
         }}
    >
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-[#FF6B00] text-[#FF6B00]'>
          {aToken ? 'Admin' : dToken ? 'Doctor' : 'Guest'}
        </p>
      </div>
      {(aToken || dToken) &&
        <button
          onClick={logout}
          className='text-white text-sm px-10 py-2 rounded-full'
          style={{
            background: 'linear-gradient(90deg, #FF6B00, #FF8C32)',
            boxShadow: '0 0 12px #FF8C32'
          }}
        >
          Logout
        </button>
      }
    </div>
  )
}

export default Navbar
