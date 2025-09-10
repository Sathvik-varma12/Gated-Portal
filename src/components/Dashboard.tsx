// import React from 'react';
// import { Users, UserPlus, Activity, CheckCircle, Clock, AlertCircle, ClipboardList } from 'lucide-react';
// import { useApp } from '../context/AppContext';

// const Dashboard: React.FC = () => {
//   const { dashboardStats, entryLogs } = useApp();

//   const formatTime = (timestamp: string) => {
//     return new Date(timestamp).toLocaleString();
//   };

//   const stats = [
//     {
//       title: 'Active Residents',
//       value: dashboardStats.totalResidents,
//       icon: Users,
//       color: 'bg-blue-500',
//       textColor: 'text-blue-600'
//     },
//     {
//       title: 'Active Visitors',
//       value: dashboardStats.activeVisitors,
//       icon: UserPlus,
//       color: 'bg-green-500',
//       textColor: 'text-green-600'
//     },
//     {
//       title: "Today's Entries",
//       value: dashboardStats.todayEntries,
//       icon: Activity,
//       color: 'bg-purple-500',
//       textColor: 'text-purple-600'
//     },
//     {
//       title: 'Total Entries',
//       value: entryLogs.length,
//       icon: CheckCircle,
//       color: 'bg-orange-500',
//       textColor: 'text-orange-600'
//     }
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;
//           return (
//             <div key={index} className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex items-center">
//                 <div className={`${stat.color} rounded-lg p-3`}>
//                   <Icon className="h-6 w-6 text-white" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//                   <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Activity */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
//             <Activity className="h-5 w-5 text-gray-400" />
//           </div>
          
//           <div className="space-y-3">
//             {dashboardStats.recentActivity.length > 0 ? (
//               dashboardStats.recentActivity.map((entry) => (
//                 <div key={entry.id} className="flex items-center justify-between py-2 border-b border-gray-100">
//                   <div className="flex items-center">
//                     <div className={`w-2 h-2 rounded-full mr-3 ${
//                       entry.success ? 'bg-green-400' : 'bg-red-400'
//                     }`} />
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">{entry.personName}</p>
//                       <p className="text-xs text-gray-500 capitalize">{entry.personType}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-gray-500">
//                       {formatTime(entry.timestamp)}
//                     </p>
//                     {entry.success ? (
//                       <CheckCircle className="h-4 w-4 text-green-500 ml-auto mt-1" />
//                     ) : (
//                       <AlertCircle className="h-4 w-4 text-red-500 ml-auto mt-1" />
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center py-4">No recent activity</p>
//             )}
//           </div>
//         </div>

//         {/* System Status */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
//             <CheckCircle className="h-5 w-5 text-green-500" />
//           </div>
          
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-gray-600">Entry System</span>
//               <div className="flex items-center">
//                 <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
//                 <span className="text-sm text-green-600">Online</span>
//               </div>
//             </div>
            
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-gray-600">Database</span>
//               <div className="flex items-center">
//                 <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
//                 <span className="text-sm text-green-600">Connected</span>
//               </div>
//             </div>
            
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-gray-600">Last Backup</span>
//               <div className="flex items-center">
//                 <Clock className="h-4 w-4 text-gray-400 mr-2" />
//                 <span className="text-sm text-gray-600">2 hours ago</span>
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <span className="text-sm text-gray-600">Security Level</span>
//               <div className="flex items-center">
//                 <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
//                 <span className="text-sm text-blue-600">High</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <button className="flex items-center justify-center p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
//             <Users className="h-5 w-5 mr-2" />
//             Add New Resident
//           </button>
//           <button className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
//             <UserPlus className="h-5 w-5 mr-2" />
//             Register Visitor
//           </button>
//           <button className="flex items-center justify-center p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
//             <ClipboardList className="h-5 w-5 mr-2" />
//             View Entry Logs
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import { 
  Users, 
  UserPlus, 
  Activity, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ClipboardList 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Dashboard: React.FC = () => {
  const { dashboardStats, entryLogs } = useApp();

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  // function to return the right icon based on personType
  const getProfileIcon = (personType: string) => {
    switch (personType.toLowerCase()) {
      case 'resident':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'visitor':
        return <UserPlus className="h-4 w-4 text-green-500" />;
      default:
        return <Users className="h-4 w-4 text-gray-400" />;
    }
  };

  const stats = [
    {
      title: 'Active Residents',
      value: dashboardStats.totalResidents,
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Visitors',
      value: dashboardStats.activeVisitors,
      icon: UserPlus,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: "Today's Entries",
      value: dashboardStats.todayEntries,
      icon: Activity,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Total Entries',
      value: entryLogs.length,
      icon: CheckCircle,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-3">
            {dashboardStats.recentActivity.length > 0 ? (
              dashboardStats.recentActivity.map((entry) => (
                <div 
                  key={entry.id} 
                  className="flex items-center justify-between py-2 border-b border-gray-100"
                >
                  <div className="flex items-center">
                    <div 
                      className={`w-2 h-2 rounded-full mr-3 ${
                        entry.success ? 'bg-green-400' : 'bg-red-400'
                      }`} 
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{entry.personName}</p>
                      <p className="text-xs text-gray-500 capitalize">{entry.personType}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {getProfileIcon(entry.personType)}
                      <p className="text-xs text-gray-500">
                        {formatTime(entry.timestamp)}
                      </p>
                    </div>
                    {entry.success ? (
                      <CheckCircle className="h-4 w-4 text-green-500 ml-auto mt-1" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500 ml-auto mt-1" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            )}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Entry System</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-sm text-green-600">Online</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-sm text-green-600">Connected</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Backup</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">2 hours ago</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Security Level</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-sm text-blue-600">High</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <Users className="h-5 w-5 mr-2" />
            Add New Resident
          </button>
          <button className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <UserPlus className="h-5 w-5 mr-2" />
            Register Visitor
          </button>
          <button className="flex items-center justify-center p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            <ClipboardList className="h-5 w-5 mr-2" />
            View Entry Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
