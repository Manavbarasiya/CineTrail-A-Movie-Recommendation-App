import React from 'react';
import './Shimmer.css';

const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {[...Array(30)].map((_, index) => ( // Adjust number for how many shimmer cards to show
        <div key={index} className="shimmer-card">
          <div className="shimmer-thumbnail"></div>
          <div className="shimmer-details">
            <div className="shimmer-title"></div>
            <div className="shimmer-subtitle"></div>
            <div className="shimmer-subtitle"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
