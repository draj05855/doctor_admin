import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) return toast.error('Image Not Selected');

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', fees);
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName('');
        setPassword('');
        setEmail('');
        setAddress1('');
        setAddress2('');
        setDegree('');
        setAbout('');
        setFees('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Request failed.';
      toast.error(errorMessage);
      console.log(error.response?.data || error);
    }
  };

  return (
    <div className="bg-[#0D0D0D] min-h-screen w-full p-5">
      <form onSubmit={onSubmitHandler} className="w-full max-w-4xl mx-auto text-[#E0E0E0]">
        <p className="mb-3 text-lg font-medium text-[#FF6B00]">Add Doctor</p>

        <div className="bg-[#1A1A1A] px-8 py-8 border border-gray-700 rounded max-h-[80vh] overflow-y-scroll">
          <div className="flex items-center gap-4 mb-8 text-gray-400">
            <label htmlFor="doc-img">
              <img
                className="w-16 bg-[#2A2A2A] rounded-full cursor-pointer"
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt=""
              />
            </label>
            <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
            <p>
              Upload doctor <br /> picture
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-10 text-[#E0E0E0]">
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <p>Doctor name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className="bg-[#2A2A2A] border border-gray-600 rounded px-3 py-2 text-[#E0E0E0]" type="text" placeholder="Name" required />
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <p>Doctor Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} className="bg-[#2A2A2A] border border-gray-600 rounded px-3 py-2 text-[#E0E0E0]" type="email" placeholder="Email" required />
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <p>Doctor Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} className="bg-[#2A2A2A] border border-gray-600 rounded px-3 py-2 text-[#E0E0E0]" type="password" placeholder="Password" required />
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <p>Experience</p>
                <select onChange={(e) => setExperience(e.target.value)} value={experience} className="bg-[#2A2A2A] border border-gray-600 rounded px-3 py-2 text-[#E0E0E0]">
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={`${i + 1} Year`}>{i + 1} Year</option>
                  ))}
                </select>
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <p>Fees</p>
                <input onChange={(e) => setFees(e.target.value)} value={fees} className="bg-[#2A2A2A] border border-gray-600 rounded px-3 py-2 text-[#E0E0E0]" type="number" placeholder="Fees" required />
              </div>
            </div>

            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <p>Speciality</p>
                <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="bg-[#2A2A2A] border border-gray-600 rounded px-3 py-2 text-[#E0E0E0]">
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>

              <div>
                <div className="flex-1 flex flex-col gap-1">
                  <p>Education</p>
                  <input onChange={(e) => setDegree(e.target.value)} value={degree} className="bg-[#2A2A2A] border border-gray-600 rounded px-3 py-2 text-[#E0E0E0]" type="text" placeholder="Education" required />
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <p>Address</p>
                  <input onChange={(e) => setAddress1(e.target.value)} value={address1} className="bg-[#2A2A2A] border border-gray-600 rounded px-3 py-2 text-[#E0E0E0]" type="text" placeholder="Address 1" required />
                  <input onChange={(e) => setAddress2(e.target.value)} value={address2} className="bg-[#2A2A2A] border border-gray-600 rounded px-3 py-2 text-[#E0E0E0]" type="text" placeholder="Address 2" required />
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="mt-4 mb-2">About Doctor</p>
            <textarea onChange={(e) => setAbout(e.target.value)} value={about} className="w-full px-4 pt-2 border border-gray-600 bg-[#2A2A2A] rounded text-[#E0E0E0]" placeholder="Write about doctor" rows={5} required />
          </div>

          <button type="submit" className="bg-[#FF6B00] hover:bg-[#FF8C32] px-10 py-3 mt-4 text-[#0D0D0D] rounded-full transition-all duration-300">
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
