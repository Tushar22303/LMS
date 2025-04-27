import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ToastNotifications from "../components/common/ToastNotifications";
import Sidebar from "../components/common/Sidebar";
import AdminHeader from "./AdminHeader";
import "../styles/MyRequests.css";
import { BASE_URL } from "../App";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [toast, setToast] = useState(null);
  const prevStatuses = useRef({});

  const email = localStorage.getItem("email");

  // Fetch the book request based on email
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(BASE_URL + `/user/book-request/${email}`);
        const updatedRequests = res.data;

        updatedRequests.forEach((req) => {
          const prevStatus = prevStatuses.current[req._id];
          if (prevStatus && prevStatus !== req.status) {
            if (req.status === "approved") {
              setToast({
                message: `✅ Your request for "${req.title}" was approved!`,
                type: "success",
              });
            } else if (req.status === "rejected") {
              setToast({
                message: `❌ Your request for "${req.title}" was rejected.`,
                type: "error",
              });
            }
          }
          prevStatuses.current[req._id] = req.status;
        });

        setRequests(updatedRequests);
      } catch (error) {
        console.error("Error fetching book requests:", error);
      }
    };

    fetchRequests();
    const interval = setInterval(fetchRequests, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [email]);

  return (
    <>
      <div className="myrequests-container">
        <Sidebar />
        <div className="myrequests-main">
          <AdminHeader />

          {toast && (
            <ToastNotifications
              message={toast.message}
              type={toast.type}
              duration={3000}
              onClose={() => setToast(null)}
            />
          )}

          <div className="myrequests-header">
            <h2>📚 My Book Requests</h2>
          </div>

          <div className="requests-table-wrapper">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Book ID</th>
                  <th>Book</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Requested On</th>
                </tr>
              </thead>
              <tbody>
                {requests.length > 0 ? (
                  requests.map((req) => (
                    <tr key={req._id}>
                      <td>{req.book_id}</td>
                      <td>{req.title}</td>
                      <td>{req.subject}</td>
                      <td className={`status ${req.status}`}>{req.status}</td>
                      <td>{req.request_date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-requests">
                      No requests yet.
                    </td>
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

export default MyRequests;
