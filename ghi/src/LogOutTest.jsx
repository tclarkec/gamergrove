import React from 'react';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function LogOutTest() {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <div className="card text-bg-light mb-3">
        <div className="card-body">
          <div>
            You have been logged out!
          </div>
          <button onClick={() => { navigate("/"); }}> Back to Homepage </button>
        </div>
      </div>
    </div>
  );
}

export default LogOutTest;
