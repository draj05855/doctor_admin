import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendURL } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [localProfile, setLocalProfile] = useState(profileData);

  useEffect(() => {
    if (isEdit && profileData) setLocalProfile(profileData);
  }, [isEdit, profileData]);

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  if (!profileData) return null;

  const updateProfile = async () => {
    try {
      const { data } = await axios.post(
        `${backendURL}/api/doctor/update-profile`,
        localProfile,
        { headers: { Authorization: `Bearer ${dToken}` } }
      );

      if (data.success) {
        setProfileData(localProfile);
        setIsEdit(false);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div
      className="max-w-4xl mx-auto my-10 p-6 rounded-xl border border-gray-700 transition-all duration-300 hover:shadow-[0_0_20px_#FF6B00] hover:scale-105"
      style={{ background: "linear-gradient(145deg, #1A1A1A, #0D0D0D)" }}
    >
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Doctor Image */}
        <div className="flex-shrink-0">
          <img
            src={profileData.image || "https://via.placeholder.com/150"}
            alt={profileData.name}
            className="w-40 h-40 rounded-full border-4 border-[#FF6B00] object-cover"
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-[#E0E0E0]">{profileData.name}</h1>
            <p className="text-[#FF6B00] font-medium">
              {profileData.degree} - {profileData.speciality}
            </p>
            <span className="inline-block mt-1 bg-[#FF6B0040] text-[#FF6B00] px-3 py-1 rounded-full text-sm font-semibold">
              {profileData.experience} Years Experience
            </span>
          </div>

          {/* About */}
          <div className="bg-[#0D0D0D] p-4 rounded border border-gray-700">
            <h2 className="font-semibold text-[#E0E0E0] mb-1">About</h2>
            {isEdit ? (
              <textarea
                value={localProfile.about || ""}
                onChange={(e) => setLocalProfile(prev => ({ ...prev, about: e.target.value }))}
                className="w-full border border-gray-700 bg-[#1A1A1A] text-[#E0E0E0] p-2 rounded placeholder-gray-500"
                placeholder="Write about yourself"
              />
            ) : (
              <p className="text-[#E0E0E0] text-sm">{profileData.about}</p>
            )}
          </div>

          {/* Fees */}
          <p className="text-[#E0E0E0]">
            Appointment Fee:{" "}
            {isEdit ? (
              <input
                type="number"
                value={localProfile.fees || 0}
                onChange={(e) => setLocalProfile(prev => ({ ...prev, fees: e.target.value }))}
                className="border border-gray-700 rounded px-2 py-1 w-24 bg-[#1A1A1A] text-[#E0E0E0]"
              />
            ) : (
              <span className="font-semibold">{currency} {profileData.fees}</span>
            )}
          </p>

          {/* Address */}
          <div className="text-[#E0E0E0]">
            <h3 className="font-semibold mb-1">Address:</h3>
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={localProfile.address?.line1 || ""}
                  onChange={(e) => setLocalProfile(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                  className="border border-gray-700 rounded px-2 py-1 w-full mb-1 bg-[#1A1A1A] text-[#E0E0E0]"
                />
                <input
                  type="text"
                  value={localProfile.address?.line2 || ""}
                  onChange={(e) => setLocalProfile(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                  className="border border-gray-700 rounded px-2 py-1 w-full bg-[#1A1A1A] text-[#E0E0E0]"
                />
              </>
            ) : (
              <p className="text-sm">
                {profileData.address?.line1}<br />
                {profileData.address?.line2}
              </p>
            )}
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isEdit ? localProfile.available : profileData.available}
              onChange={(e) => setLocalProfile(prev => ({ ...prev, available: e.target.checked }))}
              disabled={!isEdit}
              className="w-5 h-5 text-[#FF6B00] border-gray-700 rounded bg-[#1A1A1A] focus:ring-[#FF6B00]"
            />
            <label className="text-[#E0E0E0] font-medium">Available</label>
          </div>

          {/* Buttons */}
          {isEdit ? (
            <div className="flex gap-2 mt-3">
              <button
                onClick={updateProfile}
                className="px-6 py-2 bg-[#FF6B00] text-white font-medium rounded hover:bg-[#FF8C32] transition-all"
              >
                Save
              </button>
              <button
                onClick={() => setIsEdit(false)}
                className="px-6 py-2 bg-gray-700 text-white font-medium rounded hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="mt-3 px-6 py-2 bg-[#FF6B00] text-white font-medium rounded hover:bg-[#FF8C32] transition-all"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
