import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Thay Switch bằng Routes
import Home from "./pages/Home";
import CreateTeacherAccount from "./pages/CreateTeacherAccount";
import ManageTeacherProfiles from "./pages/ManageTeacherProfiles";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />{" "}
        {/* Thay component bằng element */}
        <Route
          path="/create-teacher-account"
          element={<CreateTeacherAccount />}
        />
        <Route
          path="/manage-teacher-profiles"
          element={<ManageTeacherProfiles />}
        />
        {/* Thêm các route khác nếu cần */}
      </Routes>
    </Router>
  );
}

export default App;
