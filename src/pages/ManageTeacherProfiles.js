import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Modal, Button } from "react-bootstrap";
import "../css/home.css";

const initialTeachers = [
  {
    id: 1,
    fullName: "Nguyễn Văn A",
    dateOfBirth: "1990-01-01",
    phone: "0123-456-789",
    email: "teacherA@example.com",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    emergencyContact: "Nguyễn Văn B - 0987-111-222",
    startDate: "2020-09-01",
    qualifications: "Thạc sĩ Toán",
  },
  {
    id: 2,
    fullName: "Trần Thị B",
    dateOfBirth: "1988-05-15",
    phone: "0989-000-111",
    email: "teacherB@example.com",
    address: "45 Đường XYZ, Quận 2, TP.HCM",
    emergencyContact: "Trần Văn C - 0999-222-333",
    startDate: "2019-05-20",
    qualifications: "Cử nhân Văn",
  },
];

const ManageTeacherProfiles = () => {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const handleOpenModal = (teacher = null) => {
    setSelectedTeacher(teacher);
    setFormData(teacher || {});
    setShowModal(true);
    setError("");
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSave = () => {
    const requiredFields = [
      "fullName",
      "dateOfBirth",
      "phone",
      "email",
      "address",
      "emergencyContact",
      "startDate",
    ];
    if (requiredFields.some((field) => !formData[field])) {
      setError("Vui lòng nhập đủ các trường bắt buộc.");
      return;
    }

    if (selectedTeacher) {
      setTeachers(
        teachers.map((t) =>
          t.id === selectedTeacher.id ? { ...t, ...formData } : t
        )
      );
    } else {
      const newId = teachers.length ? teachers[teachers.length - 1].id + 1 : 1;
      setTeachers([...teachers, { id: newId, ...formData }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setTeachers(teachers.filter((t) => t.id !== id));
  };

  const handleViewDetail = (teacher) => {
    setSelectedTeacher(teacher);
    setShowDetailModal(true);
  };

  return (
    <div>
      <Sidebar />
      <div className="content">
        <div className="dashboard-header">
          <h3>Quản lý Hồ sơ Giáo Viên</h3>
          <input
            type="text"
            className="search-box"
            placeholder="Tìm kiếm giáo viên..."
          />
          <div className="icons">
            <i className="fa fa-bell"></i>
            <i className="fa fa-envelope"></i>
            <i className="fa fa-user-circle"></i>
          </div>
        </div>
        <div className="dashboard-content">
          <Button className="mb-3" onClick={() => handleOpenModal()}>
            <i className="fa fa-plus"></i> Thêm Giáo Viên
          </Button>
          <div className="table-container">
            <h5>Danh sách Giáo Viên</h5>
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>Họ và Tên</th>
                  <th>Ngày sinh</th>
                  <th>Số điện thoại</th>
                  <th>Ngày bắt đầu</th>
                  <th>Bằng cấp</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>
                      <a href="#" onClick={() => handleViewDetail(teacher)}>
                        {teacher.fullName}
                      </a>
                    </td>
                    <td>{teacher.dateOfBirth}</td>
                    <td>{teacher.phone}</td>
                    <td>{teacher.startDate}</td>
                    <td>{teacher.qualifications || ""}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleOpenModal(teacher)}
                      >
                        <i className="fa fa-edit"></i> Sửa
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="ml-2"
                        onClick={() => handleDelete(teacher.id)}
                      >
                        <i className="fa fa-trash"></i> Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Add/Edit */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedTeacher ? "Sửa Giáo Viên" : "Thêm Giáo Viên"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="text-danger">{error}</p>}
          <div className="form-group">
            <label>Họ và Tên *</label>
            <input
              className="form-control"
              value={formData.fullName || ""}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Ngày sinh *</label>
            <input
              type="date"
              className="form-control"
              value={formData.dateOfBirth || ""}
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Số điện thoại *</label>
            <input
              className="form-control"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              className="form-control"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Địa chỉ *</label>
            <input
              className="form-control"
              value={formData.address || ""}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Người liên hệ khẩn cấp *</label>
            <input
              className="form-control"
              value={formData.emergencyContact || ""}
              onChange={(e) =>
                setFormData({ ...formData, emergencyContact: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Ngày bắt đầu *</label>
            <input
              type="date"
              className="form-control"
              value={formData.startDate || ""}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Bằng cấp</label>
            <input
              className="form-control"
              value={formData.qualifications || ""}
              onChange={(e) =>
                setFormData({ ...formData, qualifications: e.target.value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Detail */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin chi tiết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTeacher && (
            <>
              <p>
                <strong>Họ và Tên:</strong> {selectedTeacher.fullName}
              </p>
              <p>
                <strong>Ngày sinh:</strong> {selectedTeacher.dateOfBirth}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {selectedTeacher.phone}
              </p>
              <p>
                <strong>Email:</strong> {selectedTeacher.email}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {selectedTeacher.address}
              </p>
              <p>
                <strong>Người liên hệ khẩn cấp:</strong>{" "}
                {selectedTeacher.emergencyContact}
              </p>
              <p>
                <strong>Ngày bắt đầu:</strong> {selectedTeacher.startDate}
              </p>
              <p>
                <strong>Bằng cấp:</strong>{" "}
                {selectedTeacher.qualifications || ""}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageTeacherProfiles;
