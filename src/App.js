import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateTeacherAccount from "./pages/CreateTeacherAccount";
import ManageTeacherProfiles from "./pages/ManageTeacherProfiles";
import Login from "./pages/Login"; // Import Login
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />{" "}
        {/* Trang mặc định là Login */}
        <Route path="/home" element={<Home />} />
        <Route
          path="/create-teacher-account"
          element={<CreateTeacherAccount />}
        />
        <Route
          path="/manage-teacher-profiles"
          element={<ManageTeacherProfiles />}
        />
        <Route path="/login" element={<Login />} />{" "}
        {/* Route cho trang Login */}
      </Routes>
    </Router>
  );
}

export default App;
