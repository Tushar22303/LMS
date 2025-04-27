import React, { useState, useEffect } from "react";
import "../../styles/ToastNotification.css"; // Custom styling (optional)
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const ToastNotifications = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  // Automatically hide toast after 'duration' milliseconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose(); // Call the onClose function if provided
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Choose icon based on type
  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="icon success" />;
      case "error":
        return <FaTimesCircle className="icon error" />;
      case "warning":
        return <FaExclamationTriangle className="icon warning" />;
      default:
        return <FaInfoCircle className="icon info" />;
    }
  };

  if (!visible) return null; // Don't render if hidden

  return (
    <div className={`toast-notification ${type}`}>
      {getIcon()}
      <span className="message">{message}</span>
      <button className="close-btn" onClick={() => setVisible(false)}>
        ✖
      </button>
    </div>
  );
};

export default ToastNotifications;
