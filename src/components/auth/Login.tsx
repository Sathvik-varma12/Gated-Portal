import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("resident"); // default role
  const [flatNumber, setFlatNumber] = useState(""); // new state for flat number
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Normally, validate with backend API here
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "resident") {
      // Logic for residents, including the new flat number
      console.log(`Resident login attempt for user: ${username}, flat: ${flatNumber}`);
      // Add validation for flatNumber here before navigating
      // e.g., if (flatNumber.trim() !== "") {
      navigate("/resident");
      // } else {
      //   alert("Please enter a flat number.");
      // }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="resident">Resident</option>
            </select>
          </div>

          {/* Conditional Input for Flat Number */}
          {role === "resident" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Flat Number or Unique Code
              </label>
              <input
                type="text"
                value={flatNumber}
                onChange={(e) => setFlatNumber(e.target.value)}
                required // make this field required only for residents
                className="mt-1 w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;