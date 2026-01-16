import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/notFound.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">The page you're looking for doesn't exist or has been moved.</p>
        <button className="home-btn" onClick={() => navigate('/')}>
          Return Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
