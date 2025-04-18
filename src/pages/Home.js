import React from "react";
import Sidebar from "../components/Sidebar";
import "../css/home.css";

const Home = () => {
  return (
    <div>
      <Sidebar />
      <div className="content">
        <div className="dashboard-header">
          <h3>Dashboard Tổng Quan</h3>
          <input type="text" className="search-box" placeholder="Tìm kiếm..." />
          <div className="icons">
            <i className="fa fa-bell"></i>
            <i className="fa fa-envelope"></i>
            <i className="fa fa-user-circle"></i>
          </div>
        </div>
        <div className="stats-container">
          <div
            className="stat-card yellow"
            onClick={() => (window.location.href = "/admin-messenger-dropdown")}
          >
            <i className="fa fa-envelope"></i>
            <h4>4</h4>
            <p>Tin nhắn</p>
          </div>
          <div className="stat-card green">
            <i className="fa fa-user"></i>
            <h4>30</h4>
            <p>Giáo viên</p>
          </div>
          <div
            className="stat-card black"
            onClick={() =>
              (window.location.href = "/manage-employment-contracts")
            }
          >
            <i className="fa fa-file-alt"></i>
            <h4>2</h4>
            <p>Hợp đồng</p>
          </div>
          <div
            className="stat-card red"
            onClick={() => (window.location.href = "/approve-leave-requests")}
          >
            <i className="fa fa-user-clock"></i>
            <h4>3</h4>
            <p>Đơn Nghỉ Phép</p>
          </div>
          <div
            className="stat-card blue"
            onClick={() => (window.location.href = "/create-teacher-account")}
          >
            <i className="fa fa-user-plus"></i> {/* Thay đổi icon */}
            <h4>4</h4>
            <p>Tạo tài khoản</p>
          </div>
        </div>
        <div className="dashboard-content">
          <div className="table-container">
            <h5>Danh sách giáo viên</h5>
            <table>
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Bộ môn</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nguyễn Văn A</td>
                  <td>Toán</td>
                  <td>Đang làm việc</td>
                  <td>
                    <button className="view-btn">Xem</button>
                  </td>{" "}
                  {/* Không có icon, khớp với ảnh */}
                </tr>
                <tr>
                  <td>Trần Thị B</td>
                  <td>Văn</td>
                  <td>Nghỉ phép</td>
                  <td>
                    <button className="view-btn">Xem</button>
                  </td>{" "}
                  {/* Không có icon, khớp với ảnh */}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-container">
            <h5>Bảng chấm công</h5>
            <table>
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Ngày</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nguyễn Văn A</td>
                  <td>10/03/2024</td>
                  <td>
                    <span className="status success">Đúng giờ</span>
                  </td>
                </tr>
                <tr>
                  <td>Trần Thị B</td>
                  <td>10/03/2024</td>
                  <td>
                    <span className="status warning">Trễ</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
