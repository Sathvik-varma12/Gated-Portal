import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import AdminDashboard from "./components/admin/AdminDashboard";
import ResidentDashboard from "./components/resident/ResidentDashboard";
import ManageVisitors from "./components/resident/ManageVisitors";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Dashboards */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/resident" element={<ResidentDashboard />} />
          <Route path="/manage-visitors" element={<ManageVisitors />} />
      </Routes>
    </Router>
  );
}

export default App;
