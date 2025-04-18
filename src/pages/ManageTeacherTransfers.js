import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../css/home.css";

const initialTransfers = [
  {
    id: 1,
    teacherName: "Nguyễn Văn A",
    currentDepartment: "Toán",
    newDepartment: "Lý",
    transferDate: "2024-11-01",
    status: "Chờ duyệt",
  },
  {
    id: 2,
    teacherName: "Trần Thị B",
    currentDepartment: "Văn",
    newDepartment: "Sử",
    transferDate: "2024-11-05",
    status: "Chờ duyệt",
  },
];

const ManageTeacherTransfers = () => {
  const [transfers, setTransfers] = useState(initialTransfers);
  const [teacherName, setTeacherName] = useState("");
  const [currentDepartment, setCurrentDepartment] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [transferDate, setTransferDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!teacherName || !currentDepartment || !newDepartment || !transferDate) {
      setError("Vui lòng nhập đủ các trường bắt buộc.");
      return;
    }

    const newTransfer = {
      id: transfers.length ? transfers[transfers.length - 1].id + 1 : 1,
      teacherName,
      currentDepartment,
      newDepartment,
      transferDate,
      status: "Chờ duyệt",
    };
    setTransfers([...transfers, newTransfer]);
    setSuccess(`Yêu cầu chuyển công tác cho ${teacherName} đã được tạo.`);
    setTeacherName("");
    setCurrentDepartment("");
    setNewDepartment("");
    setTransferDate("");
  };

  const handleApprove = (id) => {
    setTransfers(
      transfers.map((t) => (t.id === id ? { ...t, status: "Đã duyệt" } : t))
    );
  };

  const handleReject = (id) => {
    setTransfers(
      transfers.map((t) => (t.id === id ? { ...t, status: "Đã từ chối" } : t))
    );
  };

  return (
    <div>
      <Sidebar />
      <div className="content">
        <div className="dashboard-header">
          <h3>Quản lý Chuyển Công Tác</h3>
          <input type="text" className="search-box" placeholder="Tìm kiếm..." />
          <div className="icons">
            <i className="fa fa-bell"></i>
            <i className="fa fa-envelope"></i>
            <i className="fa fa-user-circle"></i>
          </div>
        </div>
        <div className="dashboard-content">
          <div className="table-container">
            <h5>Tạo Yêu Cầu Chuyển Công Tác</h5>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="teacherName">Tên Giáo Viên *</label>
                <input
                  type="text"
                  className="form-control"
                  id="teacherName"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="currentDepartment">Bộ môn hiện tại *</label>
                <input
                  type="text"
                  className="form-control"
                  id="currentDepartment"
                  value={currentDepartment}
                  onChange={(e) => setCurrentDepartment(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newDepartment">Bộ môn mới *</label>
                <input
                  type="text"
                  className="form-control"
                  id="newDepartment"
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="transferDate">Ngày chuyển *</label>
                <input
                  type="date"
                  className="form-control"
                  id="transferDate"
                  value={transferDate}
                  onChange={(e) => setTransferDate(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Tạo Yêu Cầu
              </button>
            </form>
          </div>
          <div className="table-container">
            <h5>Danh sách Yêu Cầu Chuyển Công Tác</h5>
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Giáo Viên</th>
                  <th>Bộ môn hiện tại</th>
                  <th>Bộ môn mới</th>
                  <th>Ngày chuyển</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((transfer) => (
                  <tr key={transfer.id}>
                    <td>{transfer.id}</td>
                    <td>{transfer.teacherName}</td>
                    <td>{transfer.currentDepartment}</td>
                    <td>{transfer.newDepartment}</td>
                    <td>{transfer.transferDate}</td>
                    <td>{transfer.status}</td>
                    <td>
                      {transfer.status === "Chờ duyệt" && (
                        <>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleApprove(transfer.id)}
                          >
                            Duyệt
                          </button>
                          <button
                            className="btn btn-danger btn-sm ml-2"
                            onClick={() => handleReject(transfer.id)}
                          >
                            Từ chối
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTeacherTransfers;
