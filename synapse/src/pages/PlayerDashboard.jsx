import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PlayerDashboard.css";

function PlayerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    const role = localStorage.getItem("userRole");

    // Protect Route
    if (!storedUser || role !== "player") {
      navigate("/signup");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  return (
    <div className="player-dashboard">
      <div className="dashboard-header">
        <h2>Welcome {user?.username} 🏆</h2>
        <p>Sport: {user?.sport}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Technique Score</h3>
          <p>85</p>
        </div>

        <div className="stat-card">
          <h3>Contact Rate</h3>
          <p>78%</p>
        </div>

        <div className="stat-card">
          <h3>Trajectory</h3>
          <p>Good</p>
        </div>
      </div>

      <div className="upload-section">
        <h3>Upload Match Video</h3>
        <input type="file" />
        <button className="upload-btn">Upload</button>

        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>

      <div className="graph-section">
        <h3>Performance Progress</h3>
        {/* Chart.js Graph Here */}
      </div>
    </div>
  );
}

export default PlayerDashboard;