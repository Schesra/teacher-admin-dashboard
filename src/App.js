import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateTeacherAccount from "./pages/CreateTeacherAccount";
import ManageTeacherProfiles from "./pages/ManageTeacherProfiles";
import ViewTeacherAttendance from "./pages/ViewTeacherAttendance";
import ApproveLeaveRequests from "./pages/ApproveLeaveRequests";
import GenerateReports from "./pages/GenerateReports";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/create-teacher-account"
          element={<CreateTeacherAccount />}
        />
        <Route
          path="/manage-teacher-profiles"
          element={<ManageTeacherProfiles />}
        />
        <Route
          path="/view-teacher-attendance"
          element={<ViewTeacherAttendance />}
        />
        <Route
          path="/approve-leave-requests"
          element={<ApproveLeaveRequests />}
        />
        <Route path="/generate-reports" element={<GenerateReports />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
