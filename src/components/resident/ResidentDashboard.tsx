// import React from "react";
// import { CheckCircle, AlertCircle } from "lucide-react";

// const ResidentDashboard: React.FC = () => {
//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-gray-800">Resident Dashboard</h2>
//       <div className="p-6 bg-white rounded-lg shadow-md">
//         <CheckCircle className="h-6 w-6 text-green-500 mb-2" />
//         <p className="font-semibold">Access Granted</p>
//       </div>
//       <div className="p-6 bg-white rounded-lg shadow-md">
//         <AlertCircle className="h-6 w-6 text-red-500 mb-2" />
//         <p className="font-semibold">Security Alerts</p>
//       </div>
//     </div>
//   );
// };

// export default ResidentDashboard;


import React from "react";
import { UserPlus, Clock, ShieldAlert, CheckCircle, ArrowRight } from "lucide-react";

const ResidentDashboard: React.FC = () => {
  return (
    <div className="space-y-8 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
        Resident Dashboard
      </h2>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-105 cursor-pointer">
          <UserPlus className="h-12 w-12 text-blue-600 mb-3" />
          <p className="font-semibold text-lg">Manage Visitors</p>
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
            <h3 className="text-xl font-semibold text-gray-700">Your Recent Visitors</h3>
            <a href="#" className="text-blue-600 hover:underline flex items-center space-x-1">
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
                  <p className="text-sm text-gray-500">Checked in at 10:30 AM</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-full">Approved</span>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">Michael Lee</p>
                  <p className="text-sm text-gray-500">Checked in at Yesterday, 04:15 PM</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-full">Approved</span>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Sarah Williams</p>
                  <p className="text-sm text-gray-500">Pending check-in</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
            </li>
          </ul>
        </div>

        {/* Security Alerts Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-700">Security Alerts</h3>
            <a href="#" className="text-blue-600 hover:underline flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <ShieldAlert className="h-6 w-6 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Unauthorized entry detected at Gate 1.</p>
                <p className="text-sm text-gray-500">Reported 30 minutes ago</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">System check successful. All systems are operational.</p>
                <p className="text-sm text-gray-500">Reported 2 hours ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResidentDashboard;