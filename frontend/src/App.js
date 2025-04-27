import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Contact from "./pages/Contact";
import UserDashboard from "./pages/UserDashboard";
import { AuthContext } from "./context/AuthContext";
import ManageBooks from "./pages/ManageBooks";
import ManageUsers from "./pages/ManageUsers";
import IssueBooks from "./pages/IssueBooks";
import ViewHistory from "./pages/ViewHistory";
import MyIssueBooks from "./pages/MyIssueBooks";
import AdminProfile from "./pages/AdminProfile";
import UserProfile from "./pages/UserProfile";
import ViewAllBooks from "./pages/ViewAllBooks";
import AdminBookRequests from "./pages/AdminBookRequest";
import MyRequests from "./pages/MyRequests";

// BASE URL OF BACKEND
export const BASE_URL = "http://127.0.0.1:5000";

// ProtectedRoute Component
const ProtectedRoute = ({ role, children, requiredRole }) => {
  const { isAuthenticated, role: userRole } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin" requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/books"
          element={
            <ProtectedRoute role="admin" requiredRole="admin">
              <ManageBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin" requiredRole="admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/issuebooks"
          element={
            <ProtectedRoute role="admin" requiredRole="admin">
              <IssueBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/history"
          element={
            <ProtectedRoute role="admin" requiredRole="admin">
              <ViewHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/request-books"
          element={
            <ProtectedRoute role="admin" requiredRole="admin">
              <AdminBookRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute role="admin" requiredRole="admin">
              <AdminProfile />
            </ProtectedRoute>
          }
        />

        {/* User Protected Routes */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="user" requiredRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard/my-books"
          element={
            <ProtectedRoute role="user" requiredRole="user">
              <MyIssueBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard/profile"
          element={
            <ProtectedRoute role="user" requiredRole="user">
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard/view-books"
          element={
            <ProtectedRoute role="user" requiredRole="user">
              <ViewAllBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard/my-requests"
          element={
            <ProtectedRoute role="user" requiredRole="user">
              <MyRequests />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
