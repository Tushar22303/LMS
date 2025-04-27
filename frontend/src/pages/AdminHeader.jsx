// src/components/common/AdminHeader.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "../styles/AdminHeader.css";

const AdminHeader = () => {
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setAdmin(storedName);
    }
  }, []);

  return (
    <div className="admin-header">
      <h2 className="admin-title">Welcome, {admin} 👋</h2>
      <div className="admin-profile">
        <Link to="/">
          <FaHome className="profile-icon" />
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
