import React, { useState } from "react";
import MovieImage from '../assets/Movie.png'; // Import the image

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API to change password
    console.log("Change password:", oldPassword, newPassword);
  };

  return (
    <div className="relative bg-gray-800 p-6 min-h-screen flex justify-center items-start shadow-2xl" style={{backgroundImage: `url(${MovieImage})`, backgroundSize: 'cover', backgroundPosition:'center' }}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-600 p-6 rounded-2xl shadow text-white"
      >
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>

        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded text-gray-800 bg-white"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded text-gray-800 bg-white"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
