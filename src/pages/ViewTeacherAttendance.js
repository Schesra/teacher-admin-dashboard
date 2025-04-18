import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../css/home.css";

const ViewTeacherAttendance = () => {
  // Dữ liệu mẫu từ us12_view_teacher_attendance.js
  const [attendanceData, setAttendanceData] = useState([
    {
      date: "2024-03-10",
      teacherName: "Nguyễn Văn A",
      department: "Toán",
      status: "Đúng giờ",
      time: "07:58",
    },
    {
      date: "2024-03-10",
      teacherName: "Trần Thị B",
      department: "Văn",
      status: "Đi muộn",
      time: "08:10",
    },
    {
      date: "2024-03-10",
      teacherName: "Phạm Văn C",
      department: "Anh",
      status: "Nghỉ",
      time: "--",
    },
    {
      date: "2024-03-09",
      teacherName: "Nguyễn Văn A",
      department: "Toán",
      status: "Đúng giờ",
      time: "07:55",
    },
    {
      date: "2024-03-09",
      teacherName: "Trần Thị B",
      department: "Văn",
      status: "Đúng giờ",
      time: "07:59",
    },
  ]);
  const [filteredData, setFilteredData] = useState(attendanceData);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterTeacher, setFilterTeacher] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [stats, setStats] = useState({ present: 0, late: 0, absent: 0 });

  // Lấy danh sách giáo viên và bộ môn duy nhất
  const teachers = [...new Set(attendanceData.map((item) => item.teacherName))];
  const departments = [
    ...new Set(attendanceData.map((item) => item.department)),
  ];

  // Cập nhật thống kê
  const updateStats = (data) => {
    const present = data.filter((item) => item.status === "Đúng giờ").length;
    const late = data.filter((item) => item.status === "Đi muộn").length;
    const absent = data.filter((item) => item.status === "Nghỉ").length;
    setStats({ present, late, absent });
  };

  // Áp dụng bộ lọc
  const applyFilters = () => {
    let filtered = attendanceData;

    if (filterTeacher) {
      filtered = filtered.filter((item) => item.teacherName === filterTeacher);
    }
    if (filterDepartment) {
      filtered = filtered.filter(
        (item) => item.department === filterDepartment
      );
    }
    if (filterDate) {
      filtered = filtered.filter((item) => item.date === filterDate);
    }
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.teacherName.toLowerCase().includes(keyword) ||
          item.department.toLowerCase().includes(keyword) ||
          item.status.toLowerCase().includes(keyword) ||
          item.date.includes(keyword)
      );
    }

    setFilteredData(filtered);
    updateStats(filtered);
  };

  // Render bảng chấm công
  const renderAttendanceTable = () => {
    if (filteredData.length === 0) {
      return (
        <tr>
          <td colSpan="5">Không có dữ liệu</td>
        </tr>
      );
    }
    return filteredData.map((item, index) => (
      <tr key={index}>
        <td>{item.date}</td>
        <td>{item.teacherName}</td>
        <td>{item.department}</td>
        <td>{item.status}</td>
        <td>{item.time}</td>
      </tr>
    ));
  };

  // Cập nhật khi có thay đổi bộ lọc
  useEffect(() => {
    applyFilters();
  }, [
    filterTeacher,
    filterDepartment,
    filterDate,
    searchKeyword,
    attendanceData,
  ]);

  return (
    <div>
      <Sidebar />
      <div className="content">
        <div className="dashboard-header">
          <h3>Xem Chấm Công Giáo Viên</h3>
          <input
            type="text"
            className="search-box"
            placeholder="Tìm kiếm..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <div className="icons">
            <i className="fa fa-bell"></i>
            <i className="fa fa-envelope"></i>
            <i className="fa fa-user-circle"></i>
          </div>
        </div>
        <div className="stats-container" style={{ marginBottom: "20px" }}>
          <div className="stat-card green">
            <i className="fa fa-check-circle"></i>
            <h4>{stats.present}</h4>
            <p>Đủ Công</p>
          </div>
          <div className="stat-card yellow">
            <i className="fa fa-clock"></i>
            <h4>{stats.late}</h4>
            <p>Đi Muộn</p>
          </div>
          <div className="stat-card black">
            <i className="fa fa-user-times"></i>
            <h4>{stats.absent}</h4>
            <p>Nghỉ</p>
          </div>
        </div>
        <div className="table-container">
          <h5>Tùy Chọn Lọc</h5>
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="filterTeacher">Giáo Viên:</label>
              <select
                id="filterTeacher"
                className="form-control"
                value={filterTeacher}
                onChange={(e) => setFilterTeacher(e.target.value)}
              >
                <option value="">-- Tất Cả --</option>
                {teachers.map((t, index) => (
                  <option key={index} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="filterDepartment">Bộ Môn/Phòng Ban:</label>
              <select
                id="filterDepartment"
                className="form-control"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="">-- Tất Cả --</option>
                {departments.map((d, index) => (
                  <option key={index} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="filterDate">Ngày:</label>
              <input
                type="date"
                id="filterDate"
                className="form-control"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="table-container">
          <h5>Dữ Liệu Chấm Công</h5>
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>Ngày</th>
                <th>Tên Giáo Viên</th>
                <th>Bộ Môn</th>
                <th>Trạng Thái</th>
                <th>Thời Gian Điểm Danh</th>
              </tr>
            </thead>
            <tbody>{renderAttendanceTable()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewTeacherAttendance;
