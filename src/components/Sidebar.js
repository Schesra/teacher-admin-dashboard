import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Thêm useNavigate
import "font-awesome/css/font-awesome.min.css";
import "../css/home.css";

const Sidebar = () => {
  const navigate = useNavigate(); // Hook để điều hướng

  const handleLogout = () => {
    // Xóa trạng thái đăng nhập (nếu có, ví dụ: xóa token trong localStorage)
    localStorage.removeItem("userToken"); // Ví dụ: xóa token (nếu bạn sử dụng)

    // Điều hướng về trang đăng nhập
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <div className="user-profile">
        <img src="//public/Admin.jpg" alt="Admin Avatar" />
        <p>Aman Admin</p>
        <small>Quản trị viên</small>
      </div>
      <NavLink to="/home" activeClassName="active">
        <i className="fa fa-home"></i> Trang chủ
      </NavLink>
      <NavLink to="/manage-teacher-profiles" activeClassName="active">
        <i className="fa fa-user"></i> Hồ sơ Giáo Viên
      </NavLink>
      <NavLink to="/view-teacher-attendance">
        <i className="fa fa-check-square"></i> Điểm Danh
      </NavLink>
      <NavLink to="/send-announcements">
        <i className="fa fa-bullhorn"></i> Thông Báo
      </NavLink>
      <NavLink to="/manage-teacher-transfers">
        <i className="fa fa-exchange"></i> Chuyển Công Tác
      </NavLink>
      <NavLink to="/generate-reports">
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
