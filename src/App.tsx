// import { useState } from 'react';
// import { AppProvider } from './context/AppContext';
// import Layout from './components/shared/Layout';
// import Dashboard from './components/Dashboard';
// import ResidentsManager from './components/admin/ResidentsManager';
// import VisitorsManager from './components/admin/VisitorsManager';
// import EntryLogs from './components/admin/EntryLogs';
// import AccessControl from './components/resident/AccessControl';

// function App() {
//   const [currentView, setCurrentView] = useState('dashboard');

//   const renderCurrentView = () => {
//     switch (currentView) {
//       case 'dashboard':
//         return <Dashboard />;
//       case 'residents':
//         return <ResidentsManager />;
//       case 'visitors':
//         return <VisitorsManager />;
//       case 'entry-logs':
//         return <EntryLogs />;
//       case 'access-control':
//         return <AccessControl />;
//       default:
//         return <Dashboard />;
//     }
//   };

//   return (
//     <AppProvider>
//       <Layout currentView={currentView} onViewChange={setCurrentView}>
//         {renderCurrentView()}
//       </Layout>
//     </AppProvider>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import AdminDashboard from "./components/admin/AdminDashboard";
import ResidentDashboard from "./components/resident/ResidentDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Dashboards */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/resident" element={<ResidentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
