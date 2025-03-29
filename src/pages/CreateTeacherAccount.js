import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../css/us_create_teacher_account.css";

const CreateTeacherAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!teacherName || !username || !password) {
      setError("Vui lòng nhập đủ các trường bắt buộc.");
      return;
    }

    if (accounts.find((acc) => acc.username === username)) {
      setError("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.");
      return;
    }

    const newAccount = {
      accountId: accounts.length
        ? accounts[accounts.length - 1].accountId + 1
        : 1,
      teacherName,
      username,
      createdAt: new Date().toLocaleString(),
    };
    setAccounts([...accounts, newAccount]);
    setSuccess(
      `Đã tạo tài khoản cho giáo viên ${teacherName}. Tên đăng nhập: ${username}. Mật khẩu tạm: ${password}`
    );
    setTeacherName("");
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <Sidebar />
      <div className="content">
        <div className="dashboard-header">
          <h3>Tạo Tài Khoản Giáo Viên</h3>
          <input
            type="text"
            className="search-box"
            placeholder="Tìm kiếm..."
            style={{ visibility: "hidden" }}
          />
          <div className="icons">
            <i className="fa fa-bell"></i>
            <i className="fa fa-envelope"></i>
            <i className="fa fa-user-circle"></i>
          </div>
        </div>
        <div className="dashboard-content account-container">
          <div className="card p-4 shadow-sm">
            <h5>Tạo tài khoản mới</h5>
            <hr />
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
                  placeholder="VD: Nguyễn Văn A"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Tên đăng nhập *</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="VD: teacherA"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mật khẩu tạm *</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu tạm"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Tạo Tài Khoản
              </button>
            </form>
          </div>
          <div className="table-container">
            <h5>Danh sách Tài Khoản Giáo Viên</h5>
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Giáo Viên</th>
                  <th>Tên đăng nhập</th>
                  <th>Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((acc) => (
                  <tr key={acc.accountId}>
                    <td>{acc.accountId}</td>
                    <td>{acc.teacherName}</td>
                    <td>{acc.username}</td>
                    <td>{acc.createdAt}</td>
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

export default CreateTeacherAccount;
