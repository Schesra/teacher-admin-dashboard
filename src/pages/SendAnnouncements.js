import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../css/home.css";

const SendAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !content) {
      setError("Vui lòng nhập tiêu đề và nội dung thông báo.");
      return;
    }

    const newAnnouncement = {
      id: announcements.length
        ? announcements[announcements.length - 1].id + 1
        : 1,
      title,
      content,
      createdAt: new Date().toLocaleString(),
    };
    setAnnouncements([...announcements, newAnnouncement]);
    setSuccess("Thông báo đã được gửi thành công!");
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <Sidebar />
      <div className="content">
        <div className="dashboard-header">
          <h3>Gửi Thông Báo</h3>
          <input type="text" className="search-box" placeholder="Tìm kiếm..." />
          <div className="icons">
            <i className="fa fa-bell"></i>
            <i className="fa fa-envelope"></i>
            <i className="fa fa-user-circle"></i>
          </div>
        </div>
        <div className="dashboard-content">
          <div className="table-container">
            <h5>Tạo Thông Báo Mới</h5>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Tiêu đề *</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Nhập tiêu đề thông báo"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Nội dung *</label>
                <textarea
                  className="form-control"
                  id="content"
                  rows="5"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Nhập nội dung thông báo"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Gửi Thông Báo
              </button>
            </form>
          </div>
          <div className="table-container">
            <h5>Lịch sử Thông Báo</h5>
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Tiêu đề</th>
                  <th>Nội dung</th>
                  <th>Ngày gửi</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((ann) => (
                  <tr key={ann.id}>
                    <td>{ann.id}</td>
                    <td>{ann.title}</td>
                    <td>{ann.content}</td>
                    <td>{ann.createdAt}</td>
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

export default SendAnnouncements;
