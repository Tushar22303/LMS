import React, { useEffect, useState } from "react";
import { FaUsers, FaBook, FaBookOpen, FaUndo } from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import ToastNotifications from "../components/common/ToastNotifications";
import "../styles/AdminDashboard.css";
import AdminHeader from "./AdminHeader";
import axios from "axios";
import { BASE_URL } from "../App";

const AdminDashboard = () => {
  const [toast, setToast] = useState(null);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBooks: 0,
    totalIssued: 0,
    totalReturned: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(BASE_URL + "/admin/dashboard/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setToast({
        message: "Failed to load dashboard data",
        type: "error",
      });
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <ToastNotifications
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}

      <div className="admin-dashboard-container">
        {/* Sidebar */}
        <Sidebar role="admin" />

        {/* Main Dashboard Content */}
        <div className="admin-dashboard-content">
          {/* Header now imported */}
          <AdminHeader />

          {/* Dashboard Body */}
          <div className="dashboard-body">
            {/* Statistics Section */}
            <div className="stats-container">
              {/* Total Users */}
              <div className="stats-card">
                <FaUsers className="stats-icon" />
                <div className="stats-info">
                  <h4>Total Users</h4>
                  <p>{stats.totalUsers}</p>
                  <Link to="/admin/users" className="manage-link">
                    Manage Users →
                  </Link>
                </div>
              </div>

              {/* Total Books */}
              <div className="stats-card">
                <FaBook className="stats-icon" />
                <div className="stats-info">
                  <h4>Total Books</h4>
                  <p>{stats.totalBooks}</p>
                  <Link to="/admin/books" className="manage-link">
                    Manage Books →
                  </Link>
                </div>
              </div>

              {/* Total Issued Books */}
              <div className="stats-card">
                <FaBookOpen className="stats-icon" />
                <div className="stats-info">
                  <h4>Total Issued Books</h4>
                  <p>{stats.totalIssued}</p>
                  <Link to="/admin/issuebooks" className="manage-link">
                    View Issued →
                  </Link>
                </div>
              </div>

              {/* Total Returned Books */}
              <div className="stats-card">
                <FaUndo className="stats-icon" />
                <div className="stats-info">
                  <h4>Total Returned Books</h4>
                  <p>{stats.totalReturned}</p>
                  <Link to="/admin/returned-books" className="manage-link">
                    View Returned →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
