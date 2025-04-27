import React from "react";
import PropTypes from "prop-types";
import "../../styles/Card.css"; 

const Card = ({ title, image, description, onClick }) => {
  return (
    <div className="card-container" onClick={onClick}>
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

// Define PropTypes for better validation
Card.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Card;
