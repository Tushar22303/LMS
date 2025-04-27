import React from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaBook,
  FaHistory,
  FaUserCircle,
  FaCogs,
} from "react-icons/fa";
import { CiSquareQuestion } from "react-icons/ci";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import "../../styles/Sidebar.css"; // Import Sidebar CSS
import adminProfileImage from "../../assets/Images/profile_image.avif";
import userProfileImage from "../../assets/Images/user-profile-image.avif";

const Sidebar = ({ role }) => {
  // Sidebar menu items based on user role
  const menuItems =
    role === "admin"
      ? [
          { path: "/admin", label: "Dashboard", icon: <RxDashboard /> },
          { path: "/admin/users", label: "Manage Users", icon: <FaUsers /> },
          {
            path: "/admin/books",
            label: "Manage Books",
            icon: <MdOutlineLibraryBooks />,
          },
          {
            path: "/admin/issuebooks",
            label: "Issue Books",
            icon: <FaBook />,
          },
          {
            path: "/admin/history",
            label: "View History",
            icon: <FaHistory />,
          },
          {
            path: "/admin/request-books",
            label: "Book Request",
            icon: <CiSquareQuestion />,
          },
          { path: "/admin/profile", label: "Profile", icon: <FaUserCircle /> },
        ]
      : [
          {
            path: "/user-dashboard",
            label: "Dashboard",
            icon: <RxDashboard />,
          },
          {
            path: "/user-dashboard/my-books",
            label: "My Books",
            icon: <FaBook />,
          },
          {
            path: "/user-dashboard/view-books",
            label: "View Books",
            icon: <MdOutlineLibraryBooks />,
          },
          {
            path: "/user-dashboard/my-requests",
            label: "My Requests",
            icon: <FaCogs />,
          },
          {
            path: "/user-dashboard/profile",
            label: "Profile",
            icon: <FaUserCircle />,
          },
        ];
  //
  return (
    <div className="sidebar">
      {/* Profile Section */}
      <div className="sidebar-profile">
        {role === "admin" ? (
          <img
            src={adminProfileImage}
            alt="Admin Profile"
            className="profile-img"
          />
        ) : (
          <img
            src={userProfileImage}
            alt="User Profile"
            className="profile-img"
          />
        )}
        <h3>{role === "admin" ? "Admin" : "User"}</h3>
      </div>

      {/* Sidebar Title */}
      <h2 className="sidebar-title">
        {role === "admin" ? "Admin Panel" : "User Panel"}
      </h2>

      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>
              <span className="icon">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
