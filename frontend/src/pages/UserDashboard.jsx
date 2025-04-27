import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import "../styles/UserDashboard.css";
import {
  FaBookOpen,
  FaBook,
  FaHistory,
  FaUserCircle,
  FaHome,
} from "react-icons/fa";
import AdminHeader from "./AdminHeader";

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      {/* Sidebar */}
      <Sidebar role="user" />

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Header with Profile Button */}
        <AdminHeader />
        <div>
          <Link to="/user-dashboard/profile" className="profile-icon">
            <FaUserCircle size={30} />
          </Link>
          <Link to="/" className="profile-icon">
            <FaHome size={30} />
          </Link>
        </div>
        <p>Manage your books and track your reading progress here.</p>
        {/* Cards Section */}
        <div className="stats-container">
          {/* My Books */}
          <div className="stat-box">
            <FaBookOpen className="stat-icon" />
            <h3>My Books</h3>
            <p>View and manage your borrowed books.</p>
            <Link to="/user-dashboard/my-books" className="manage-link">
              Go to My Books →
            </Link>
          </div>

          {/* View Total Books */}
          <div className="stat-box">
            <FaBook className="stat-icon" />
            <h3>Total Library Books</h3>
            <p>Explore all books available in the library.</p>
            <Link to="/user-dashboard/view-books" className="manage-link">
              Browse Library →
            </Link>
          </div>

          {/* Issued Books History */}
          <div className="stat-box">
            <FaHistory className="stat-icon" />
            <h3>My Requested Books</h3>
            <p>Check your requested books</p>
            <Link to="/user-dashboard/my-requests" className="manage-link">
              My Request Books →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
