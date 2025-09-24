// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import AdminDashboard from "./components/admin/AdminDashboard";
import ResidentDashboard from "./components/resident/ResidentDashboard";
import Visitors from "./components/resident/Visitors";
import ManageVisitors from "./components/admin/ManageVisitors";
import ManageResidents from "./components/admin/ManageResidents";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Dashboards */}
        <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/manage-visitors" element={<ManageVisitors/>} />
          <Route path="/admin/manage-residents" element={<ManageResidents/>} />
        <Route path="/resident" element={<ResidentDashboard />} />
          <Route path="/resident/visitors" element={<Visitors/>} />
          
      </Routes>
    </Router>
  );
}

export default App;
