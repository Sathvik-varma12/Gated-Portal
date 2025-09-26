import React, { useState, useRef, useEffect } from "react";
import {
  UserPlus,
  Clock,
  ShieldAlert,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../common/Breadcrumb";

const ResidentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // clear auth token/session
    sessionStorage.clear();
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-6xl space-y-8">
        {/* Header with Dashboard Title and Profile */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Dashboard
          </h2>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100"
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
                JD
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-semibold text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500">Resident</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => navigate("/profile")}
                >
                  My Profile
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        
        <Breadcrumb />

        {/* Quick Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            onClick={() => navigate("/manage-visitors")}
            className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            <UserPlus className="h-12 w-12 text-blue-600 mb-3" />
            <p className="font-semibold text-lg">Visitors</p>
            <p className="text-sm text-gray-500">Add or remove guests</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-105 cursor-pointer">
            <Clock className="h-12 w-12 text-green-600 mb-3" />
            <p className="font-semibold text-lg">View Entry History</p>
            <p className="text-sm text-gray-500">Review recent check-ins</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-105 cursor-pointer">
            <ShieldAlert className="h-12 w-12 text-red-600 mb-3" />
            <p className="font-semibold text-lg">Report an Issue</p>
            <p className="text-sm text-gray-500">Contact security or admin</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Visitors Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Your Recent Visitors
              </h3>
              <a
                href="#"
                className="text-blue-600 hover:underline flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">Emily Johnson</p>
                    <p className="text-sm text-gray-500">
                      Checked in at 10:30 AM
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  Approved
                </span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">Michael Lee</p>
                    <p className="text-sm text-gray-500">
                      Checked in at Yesterday, 04:15 PM
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  Approved
                </span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Sarah Williams</p>
                    <p className="text-sm text-gray-500">Pending check-in</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                  Pending
                </span>
              </li>
            </ul>
          </div>

          {/* Security Alerts Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Security Alerts
              </h3>
              <a
                href="#"
                className="text-blue-600 hover:underline flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <ShieldAlert className="h-6 w-6 text-red-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">
                    Unauthorized entry detected at Gate 1.
                  </p>
                  <p className="text-sm text-gray-500">Reported 30 minutes ago</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">
                    System check successful. All systems are operational.
                  </p>
                  <p className="text-sm text-gray-500">Reported 2 hours ago</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentDashboard;