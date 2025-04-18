import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "../css/home.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <div className="user-profile">
        <img src="/public/Admin.jpg" alt="Admin Avatar" />
        <p>Aman Admin</p>
        <small>Quản trị viên</small>
      </div>
      <NavLink to="/home" activeClassName="active">
        <i className="fa fa-home"></i> Trang chủ
      </NavLink>
      <NavLink to="/manage-teacher-profiles" activeClassName="active">
        <i className="fa fa-user"></i> Hồ sơ Giáo Viên
      </NavLink>
      <NavLink to="/view-teacher-attendance" activeClassName="active">
        <i className="fa fa-check-square"></i> Điểm Danh
      </NavLink>
      <NavLink to="/send-announcements" activeClassName="active">
        <i className="fa fa-bullhorn"></i> Thông Báo
      </NavLink>
      <NavLink to="/manage-teacher-transfers" activeClassName="active">
        <i className="fa fa-exchange"></i> Chuyển Công Tác
      </NavLink>
      <NavLink to="/generate-reports" activeClassName="active">
        <i className="fa fa-bar-chart"></i> Báo Cáo
      </NavLink>
      <div
        onClick={handleLogout}
        className="logout"
        style={{ cursor: "pointer" }}
      >
        <i className="fa fa-sign-out"></i> Đăng xuất
      </div>
    </div>
  );
};

export default Sidebar;
