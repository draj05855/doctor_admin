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

  // When edit mode starts, copy context data into localProfile
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
        {
          headers: { Authorization: `Bearer ${dToken}` },
        }
      );

      if (data.success) {
        setProfileData(localProfile); // Update context
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
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Doctor Image */}
        <div className="flex-shrink-0">
          <img
            src={profileData.image || "https://via.placeholder.com/150"}
            alt={profileData.name}
            className="w-40 h-40 rounded-full border-4 border-indigo-200 object-cover"
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{profileData.name}</h1>
            <p className="text-indigo-600 font-medium">
              {profileData.degree} - {profileData.speciality}
            </p>
            <span className="inline-block mt-1 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
              {profileData.experience} Years Experience
            </span>
          </div>

          {/* About */}
          <div className="bg-gray-50 p-4 rounded border border-gray-100">
            <h2 className="font-semibold text-gray-700 mb-1">About</h2>
            {isEdit ? (
              <textarea
                value={localProfile.about || ""}
                onChange={(e) => setLocalProfile(prev => ({ ...prev, about: e.target.value }))}
                className="w-full border border-gray-300 p-2 rounded"
              />
            ) : (
              <p className="text-gray-600 text-sm">{profileData.about}</p>
            )}
          </div>

          {/* Fees */}
          <p className="text-gray-700">
            Appointment Fee:{" "}
            {isEdit ? (
              <input
                type="number"
                value={localProfile.fees || 0}
                onChange={(e) => setLocalProfile(prev => ({ ...prev, fees: e.target.value }))}
                className="border border-gray-300 rounded px-2 py-1 w-24"
              />
            ) : (
              <span className="font-semibold">{currency} {profileData.fees}</span>
            )}
          </p>

          {/* Address */}
          <div className="text-gray-700">
            <h3 className="font-semibold mb-1">Address:</h3>
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={localProfile.address?.line1 || ""}
                  onChange={(e) => setLocalProfile(prev => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value }
                  }))}
                  className="border border-gray-300 rounded px-2 py-1 w-full mb-1"
                />
                <input
                  type="text"
                  value={localProfile.address?.line2 || ""}
                  onChange={(e) => setLocalProfile(prev => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value }
                  }))}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
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
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="text-gray-700 font-medium">Available</label>
          </div>

          {/* Buttons */}
          {isEdit ? (
            <div className="flex gap-2 mt-3">
              <button
                onClick={updateProfile}
                className="px-6 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-all"
              >
                Save
              </button>
              <button
                onClick={() => setIsEdit(false)}
                className="px-6 py-2 bg-gray-400 text-white font-medium rounded hover:bg-gray-500 transition-all"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="mt-3 px-6 py-2 bg-indigo-600 text-white font-medium rounded hover:bg-indigo-700 transition-all"
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
