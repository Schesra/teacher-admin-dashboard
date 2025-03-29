import React from "react";
import { NavLink } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "../css/home.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <div className="user-profile">
        <img src="/img/Admin.jpg" alt="Admin Avatar" />
        <p>Aman Admin</p>
        <small>Quản trị viên</small>
      </div>
      <NavLink exact to="/" activeClassName="active">
        <i className="fa fa-home"></i> Trang chủ
      </NavLink>
      <NavLink to="/manage-teacher-profiles" activeClassName="active">
        <i className="fa fa-user"></i> Hồ sơ Giáo Viên
      </NavLink>
      <NavLink to="/view-teacher-attendance">
        <i className="fa fa-calendar-check"></i> Điểm Danh
      </NavLink>
      <NavLink to="/send-announcements">
        <i className="fa fa-bullhorn"></i> Thông Báo
      </NavLink>
      <NavLink to="/manage-teacher-transfers">
        <i className="fa fa-exchange-alt"></i> Chuyển Công Tác
      </NavLink>
      <NavLink to="/generate-reports">
        <i className="fa fa-chart-bar"></i> Báo Cáo
      </NavLink>
      <NavLink to="/teacher-login" className="logout">
        <i className="fa fa-sign-out-alt"></i> Đăng xuất
      </NavLink>
    </div>
  );
};

export default Sidebar;
