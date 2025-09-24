import React from "react";
import { Users, UserPlus, ClipboardList, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../common/Breadcrumb";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
        Admin Dashboard
      </h2>
      <Breadcrumb />

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-lg flex items-center justify-between transition-transform duration-300 hover:scale-105">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Residents</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">1,250</p>
          </div>
          <Users className="h-10 w-10 text-blue-600" />
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg flex items-center justify-between transition-transform duration-300 hover:scale-105">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Visitors Today</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">240</p>
          </div>
          <UserPlus className="h-10 w-10 text-green-600" />
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg flex items-center justify-between transition-transform duration-300 hover:scale-105">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Entries</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">5,800</p>
          </div>
          <ClipboardList className="h-10 w-10 text-purple-600" />
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg flex items-center justify-between transition-transform duration-300 hover:scale-105">
          <div>
            <p className="text-sm font-medium text-gray-500">New Sign-ups This Month</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">35</p>
          </div>
          <TrendingUp className="h-10 w-10 text-orange-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Management & Logs Section */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-semibold text-gray-700">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Manage Residents */}
            <div
              onClick={() => navigate("/admin/manage-residents")}
              className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <Users className="h-12 w-12 text-blue-500 mb-4" />
              <p className="font-semibold text-lg">Manage Residents</p>
            </div>

            {/* Manage Visitors */}
            <div
              onClick={() => navigate("/admin/manage-visitors")}
              className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <UserPlus className="h-12 w-12 text-green-500 mb-4" />
              <p className="font-semibold text-lg">Manage Visitors</p>
            </div>

            {/* Entry Logs */}
            <div
              onClick={() => navigate("/admin/entry-logs")}
              className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <ClipboardList className="h-12 w-12 text-purple-500 mb-4" />
              <p className="font-semibold text-lg">View Entry Logs</p>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Activities</h3>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <UserPlus className="h-5 w-5 text-green-500 mt-1" />
              <div>
                <p className="font-medium text-gray-900">John Doe added a new visitor.</p>
                <p className="text-sm text-gray-500">2 minutes ago</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <ClipboardList className="h-5 w-5 text-purple-500 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Entry log updated for gate 2.</p>
                <p className="text-sm text-gray-500">1 hour ago</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <p className="font-medium text-gray-900">New resident, Jane Smith, registered.</p>
                <p className="text-sm text-gray-500">4 hours ago</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <UserPlus className="h-5 w-5 text-green-500 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Visitor for Apt 302 checked out.</p>
                <p className="text-sm text-gray-500">5 hours ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
