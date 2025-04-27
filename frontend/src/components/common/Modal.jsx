import React from "react";
import "../../styles/Modal.css";

const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h3>{title}</h3>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
