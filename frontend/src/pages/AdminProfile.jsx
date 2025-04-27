import React, { useEffect, useState } from "react";
import Sidebar from "../components/common/Sidebar";
import AdminHeader from "./AdminHeader";
import "../styles/Profile.css";
import axios from "axios";
import defaultProfile from "../assets/Images/profile_image.avif";
import ToastNotifications from "../components/common/ToastNotifications";
import { BASE_URL } from "../App";

const AdminProfile = () => {
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);

  // Fetch the Admin Profile
  useEffect(() => {
    fetchAdminProfile();
  });

  const fetchAdminProfile = async () => {
    try {
      const email = localStorage.getItem("email");
      if (!email) return;

      const response = await axios.get(BASE_URL + `/admin/profile/${email}`);

      setUser(response.data);
    } catch (error) {
      setToast({ message: "Error Fetching Admin Profile", type: "error" });
    }
  };

  const handleLogout = () => {
    setToast({ message: "logged out successfully", type: "success" });
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      <div className="profile-layout">
        <Sidebar role="admin" />

        {/* Toast Notification */}
        {toast && (
          <ToastNotifications
            message={toast.message}
            type={toast.type}
            duration={2000}
            onClose={() => setToast(null)}
          />
        )}

        <div className="profile-main">
          <AdminHeader />

          {!user ? (
            <p style={{ padding: "1rem" }}>Loading profile...</p>
          ) : (
            <div className="profile-card">
              <img
                src={defaultProfile}
                alt="Profile"
                className="profile-image"
              />
              <div className="profile-info">
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Gender:</strong> {user.gender}
                </p>
              </div>
              <div className="profile-actions">
                <button className="logout-btn" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
