// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";

// Admin Components
import AdminDashboard from "./components/admin/AdminDashboard";
import ManageVisitors from "./components/admin/ManageVisitors";
import ManageResidents from "./components/admin/ManageResidents";

// Resident Components
import ResidentDashboard from "./components/resident/ResidentDashboard";
import Visitors from "./components/resident/Visitors";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/manage-visitors" element={<ManageVisitors />} />
        <Route path="/admin/manage-residents" element={<ManageResidents />} />

        {/* Resident Routes */}
        <Route path="/resident" element={<ResidentDashboard />} />
        <Route path="/resident/visitors" element={<Visitors />} />
      </Routes>
    </Router>
  );
}

export default App;
