import React from 'react';

const Star = ({ filled }) => {
  if (filled) {
    return <i className="fas fa-star" />; // Filled star icon
  }
  return <i className="far fa-star" />; // Empty star icon
};

export default Star;