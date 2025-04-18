import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Modal, Button } from "react-bootstrap";
import "../css/home.css";

const ApproveLeaveRequests = () => {
  // Dữ liệu mẫu từ us13_approve_leave_requests.js
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 1,
      teacherName: "Nguyễn Văn A",
      startDate: "2024-04-10",
      endDate: "2024-04-12",
      reason: "Nghỉ ốm",
      status: "Pending",
    },
    {
      id: 2,
      teacherName: "Trần Thị B",
      startDate: "2024-05-01",
      endDate: "2024-05-05",
      reason: "Việc gia đình",
      status: "Pending",
    },
  ]);
  const [processedRequests, setProcessedRequests] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectRequestId, setRejectRequestId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectError, setRejectError] = useState("");

  // Render danh sách pending requests
  const renderPendingRequests = (list) => {
    if (list.length === 0) {
      return (
        <tr>
          <td colSpan="6">Không có đơn nào chờ xử lý</td>
        </tr>
      );
    }
    return list.map((req) => (
      <tr key={req.id}>
        <td>{req.teacherName}</td>
        <td>{req.startDate}</td>
        <td>{req.endDate}</td>
        <td>{req.reason}</td>
        <td>{req.status}</td>
        <td>
          <Button
            variant="success"
            size="sm"
            onClick={() => approveRequest(req.id)}
          >
            Duyệt
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="ml-2"
            onClick={() => openRejectModal(req.id)}
          >
            Từ Chối
          </Button>
        </td>
      </tr>
    ));
  };

  // Render danh sách processed requests
  const renderProcessedRequests = () => {
    if (processedRequests.length === 0) {
      return (
        <tr>
          <td colSpan="4">Chưa có lịch sử xử lý</td>
        </tr>
      );
    }
    return processedRequests.map((item, index) => (
      <tr key={index}>
        <td>{item.teacherName}</td>
        <td>{item.dateRange}</td>
        <td>{item.result}</td>
        <td>{item.rejectReason || ""}</td>
      </tr>
    ));
  };

  // Duyệt đơn
  const approveRequest = (requestId) => {
    const req = pendingRequests.find((r) => r.id === requestId);
    if (!req) return;

    const newProcessed = {
      teacherName: req.teacherName,
      dateRange: `${req.startDate} - ${req.endDate}`,
      result: "Đã duyệt",
      rejectReason: "",
    };
    setProcessedRequests([...processedRequests, newProcessed]);
    setPendingRequests(pendingRequests.filter((r) => r.id !== requestId));
  };

  // Mở modal từ chối
  const openRejectModal = (requestId) => {
    setRejectRequestId(requestId);
    setRejectReason("");
    setRejectError("");
    setShowRejectModal(true);
  };

  // Xác nhận từ chối
  const confirmReject = () => {
    if (!rejectReason.trim()) {
      setRejectError("Lý do từ chối không được bỏ trống");
      return;
    }

    const req = pendingRequests.find((r) => r.id === rejectRequestId);
    if (!req) return;

    const newProcessed = {
      teacherName: req.teacherName,
      dateRange: `${req.startDate} - ${req.endDate}`,
      result: "Đã từ chối",
      rejectReason: rejectReason,
    };
    setProcessedRequests([...processedRequests, newProcessed]);
    setPendingRequests(pendingRequests.filter((r) => r.id !== rejectRequestId));
    setShowRejectModal(false);
  };

  // Lọc pending requests theo từ khóa tìm kiếm
  const filteredPendingRequests = pendingRequests.filter(
    (r) =>
      r.teacherName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      r.reason.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div>
      <Sidebar />
      <div className="content">
        <div className="dashboard-header">
          <h3>Duyệt Đơn Nghỉ Phép</h3>
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
        <div className="dashboard-content">
          <div className="table-container mb-4">
            <h5>Đơn Nghỉ Phép Chờ Xử Lý</h5>
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>Giáo Viên</th>
                  <th>Ngày Bắt Đầu</th>
                  <th>Ngày Kết Thúc</th>
                  <th>Lý Do</th>
                  <th>Trạng Thái</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>{renderPendingRequests(filteredPendingRequests)}</tbody>
            </table>
          </div>
          <div className="table-container">
            <h5>Lịch Sử Duyệt Nghỉ Phép</h5>
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>Giáo Viên</th>
                  <th>Thời Gian Nghỉ</th>
                  <th>Kết Quả</th>
                  <th>Lý Do Từ Chối</th>
                </tr>
              </thead>
              <tbody>{renderProcessedRequests()}</tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Từ Chối */}
      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Từ Chối Đơn Nghỉ Phép</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="rejectReason">Lý Do Từ Chối (Bắt Buộc)</label>
            <textarea
              id="rejectReason"
              className="form-control"
              rows="3"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              required
            />
          </div>
          {rejectError && <p className="text-danger">{rejectError}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={confirmReject}>
            Xác Nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ApproveLeaveRequests;
