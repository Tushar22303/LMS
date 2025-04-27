import React, { useEffect, useState } from "react";
import Sidebar from "../components/common/Sidebar";
import AdminHeader from "./AdminHeader";
import "../styles/Profile.css";
import Modal from "../components/common/Modal";
import axios from "axios";
import profileImage from "../assets/Images/user-profile-image.avif";
import ToastNotifications from "../components/common/ToastNotifications";
import { BASE_URL } from "../App";

const UserProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: " ",
    gender: "",
  });
  const [selectedUser, setSelectedUser] = useState(null);

  // load the user data
  useEffect(() => {
    fetchUserData();
  }, []);

  // fetch the user data
  const fetchUserData = async () => {
    try {
      const email = localStorage.getItem("email");
      if (!email) return;

      const response = await axios.get(BASE_URL + `/users/profile/${email}`);
      setUser(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        gender: response.data.gender,
      });
    } catch (error) {
      setToast({ message: "Error Fetching User Data", type: "error" });
    }
  };

  // Edit the Details
  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      gender: user.gender,
    });
    setShowModal(true);
  };

  // Update API
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        BASE_URL + `/users/${selectedUser._id}`,
        formData
      );
      if (response.status === 200) {
        setToast({ message: "User updated successfully", type: "success" });
        fetchUserData();
        setShowModal(false);
      }
    } catch (error) {
      setToast({ message: "Failed to update the user profile", type: "error" });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setToast({ message: "Logged Out", type: "success" });
    window.location.href = "/login";
  };

  return (
    <>
      <div className="profile-layout">
        <Sidebar role="user" />

        {/* Show Toast Notification */}
        {toast && (
          <ToastNotifications
            message={toast.message}
            type={toast.type}
            duration={2000}
            onClose={() => setToast(null)} // Hide after duration
          />
        )}
        <div className="profile-main">
          <AdminHeader />

          {!user ? (
            <p className="loading">Loading profile...</p>
          ) : (
            <>
              <div className="profile-card">
                <img
                  src={profileImage}
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
                  <button
                    className="update-btn"
                    onClick={() => handleEdit(user)}
                  >
                    ✏️ Update Profile
                  </button>
                  <button className="logout-btn" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Update Modal */}
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            title="Update Profile"
          >
            <form className="profile-modal-form" onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <button type="submit" className="modal-submit-btn">
                Update
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
