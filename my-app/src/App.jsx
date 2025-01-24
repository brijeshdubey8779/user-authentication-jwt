import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import DoctorDashboard from "./components/Dashboard/DoctorDashboard";
import PatientInformation from "./components/PatientInfo/PatientInformation";
import ReportsPage from "./components/PatientInfo/ReportsPage";
import EditPatientDetails from "./components/PatientInfo/EditPatientDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/doctordashboard" element={<DoctorDashboard />} />
        {/* <Route path="patient-info" element={<PatientInformation />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="edit-patient" element={<EditPatientDetails />} />
        </Route> */}
        <Route path="/doctordashboard/patient-info" element={<PatientInformation />} />
        <Route path="/doctordashboard/reports" element={<ReportsPage />} />
        <Route path="/doctordashboard/edit-patient" element={<EditPatientDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
