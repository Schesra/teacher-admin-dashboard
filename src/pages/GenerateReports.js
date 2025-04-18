import React from "react";
import Sidebar from "../components/Sidebar";
import "../css/home.css";

const GenerateReports = () => {
  return (
    <div>
      <Sidebar />
      <div className="content">
        <div className="dashboard-header">
          <h3>Tạo Báo Cáo</h3>
          <input type="text" className="search-box" placeholder="Tìm kiếm..." />
          <div className="icons">
            <i className="fa fa-bell"></i>
            <i className="fa fa-envelope"></i>
            <i className="fa fa-user-circle"></i>
          </div>
        </div>
        <div className="dashboard-content">
          <p>Generate Reports Page (Chưa hoàn thiện chi tiết)</p>
        </div>
      </div>
    </div>
  );
};

export default GenerateReports;
