import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/common/Sidebar";
import AdminHeader from "./AdminHeader";
import ToastNotifications from "../components/common/ToastNotifications";
import "../styles/AdminBookRequests.css";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { BASE_URL } from "../App";

const AdminBookRequests = () => {
  const [requests, setRequests] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/admin/book-request");
      setRequests(res.data);
    } catch (err) {
      setToast({ message: "Failed to load requests", type: "error" });
    }
  };

  const updateRequestStatus = async (id, status) => {
    try {
      const res = await axios.put(BASE_URL + `/admin/book-request/${id}`, {
        status,
      });
      setToast({ message: res.data.message, type: "success" });
      fetchRequests(); // refresh list
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Failed to update status",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="admin-dashboard-container">
        {toast && (
          <ToastNotifications
            message={toast.message}
            type={toast.type}
            duration={3000}
            onClose={() => setToast(null)}
          />
        )}
        <Sidebar role="admin" />
        <div className="admin-dashboard-content">
          <AdminHeader />
          <h2 className="request-heading">Book Requests</h2>

          <div className="requests-table-wrapper">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>User Email</th>
                  <th>Book ID</th>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Status</th>
                  {/* <th>Requested On</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.length > 0 ? (
                  requests.map((req) => (
                    <tr key={req._id}>
                      <td>{req.name}</td>
                      <td>{req.email}</td>
                      <td>{req.book_id}</td>
                      <td>{req.title}</td>
                      <td>{req.subject}</td>
                      <td className={`status ${req.status}`}>{req.status}</td>
                      {/* <td>{req.request_date}</td> */}
                      <td>
                        {req.status === "pending" ? (
                          <>
                            <button
                              className="approve-btn"
                              onClick={() =>
                                updateRequestStatus(req._id, "approved")
                              }
                            >
                              <TiTick />
                            </button>
                            <button
                              className="reject-btn"
                              onClick={() =>
                                updateRequestStatus(req._id, "rejected")
                              }
                            >
                              <ImCross />
                            </button>
                          </>
                        ) : (
                          <span className="status-done">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No requests found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminBookRequests;
