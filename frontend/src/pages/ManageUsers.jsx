import React, { useEffect, useState } from "react";
import Sidebar from "../components/common/Sidebar";
import "../styles/ManageUsers.css";
import dummyAvatar from "../assets/Images/user-profile-image.avif"; // Add a dummy avatar image
import AdminHeader from "./AdminHeader";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Modal from "../components/common/Modal";
import axios from "axios";
import ToastNotifications from "../components/common/ToastNotifications";
import ClipLoader from "react-spinners/ClipLoader";
import { BASE_URL } from "../App";

const ManageUsers = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
  });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Fetch the Users
  useEffect(() => {
    fetchUser();
  }, []);

  // Fetch User API
  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/users");
      setUsers(res.data);
    } catch (error) {
      setToast({ message: "Failed to Fetch the User", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit Function
  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      gender: user.gender,
    });
    setShowModal(true);
  };

  // Handle Close Function
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setFormData({ name: "", email: "", gender: "" });
  };

  // Update User API
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        BASE_URL + `/users/${selectedUser._id}`,
        formData
      );

      if (res.status === 200) {
        setToast({ message: "User Updated Successfully", type: "success" });
        fetchUser();
        handleCloseModal();
      }
    } catch (error) {
      setToast({ message: "Failed to update user", type: "error" });
    }
  };

  // Delete the User API
  const handleDeleteUser = async (userID, userName) => {
    const confirmMessage = window.confirm(
      `Are you sure you want to delete user '${userName}'?`
    );

    if (!confirmMessage) return;

    try {
      await axios.delete(BASE_URL + `/users/${userID}`);
      setToast({ message: "User Deleted Successfully", type: "success" });
      fetchUser();
    } catch (error) {
      setToast({ message: "Failed to delete user", type: "error" });
    }
  };

  // Modal Forms
  const renderEditModal = () => {
    return (
      <form className="modal-edit-form" onSubmit={handleUpdate}>
        <div className="form-row">
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
          />
        </div>

        <div className="form-row">
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Email"
          />
        </div>

        <div className="form-row">
          <label>Gender:</label>
          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button type="submit" className="modal-submit-btn">
          Update
        </button>
      </form>
    );
  };

  return (
    <>
      <div className="manage-users-layout">
        <Sidebar role="admin" />

        {/* Show Toast Notification */}
        {toast && (
          <ToastNotifications
            message={toast.message}
            type={toast.type}
            duration={2000}
            onClose={() => setToast(null)} // Hide after duration
          />
        )}

        <div className="manage-users-main">
          <AdminHeader />

          <div className="users-header">
            <h2 className="users-title">👥 All Registered Users</h2>
          </div>

          {loading ? (
            <div
              className="spinner-wrapper"
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "50px",
              }}
            >
              <ClipLoader size={50} color="#4F46E5" />
            </div>
          ) : (
            <div className="users-container">
              {users.map((user, index) => (
                <div key={user.id} className="user-card">
                  <img src={dummyAvatar} alt="User" className="user-avatar" />
                  <div className="user-info">
                    <p>
                      <strong>User ID:</strong> U-
                      {String(index + 1).padStart(3, "0")}
                    </p>
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
                  <div className="user-actions">
                    <button
                      className="edit-user-btn"
                      onClick={() => handleEdit(user)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="delete-user-btn"
                      onClick={() => handleDeleteUser(user._id, user.name)}
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Modal show={showModal} onClose={handleCloseModal} title="Edit User">
          {renderEditModal()}
        </Modal>
      </div>
    </>
  );
};

export default ManageUsers;
