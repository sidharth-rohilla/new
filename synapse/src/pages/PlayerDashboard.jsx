import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PlayerDashboard.css';

const PlayerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ NEW STATES FOR VIDEO
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    const role = localStorage.getItem("userRole");

    if (!storedUser || role !== "player") {
      navigate("/signup");
    } else {
      setUser({
        ...storedUser,
        analysis: {
          role: "Point Guard",
          referencePlayer: "Stephen Curry",
          scores: { pose: 92, edge: 88, performance: 95, injury: 15 },
          injuryLevelRisk: "Low"
        }
      });
    }
  }, [navigate]);

  const getRiskColor = (risk) => {
    if (risk === "Low") return "#10b981";
    if (risk === "Medium") return "#f59e0b";
    if (risk === "High") return "#ef4444";
    return "#3b82f6";
  };

  // ✅ VIDEO HANDLERS
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleVideoUpload = () => {
    if (!videoFile) return;

    setUploadStatus("Uploading...");

    setTimeout(() => {
      setUploadStatus("Upload Successful!");
    }, 1500);
  };

  if (!user) {
    return <div className="loading-screen">Verifying Access...</div>;
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">

        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-card">
            <div className="image-container">
              <img
                src={user.profilePic || "https://media.istockphoto.com/id/1225695062/photo/young-indian-businessman-stock-photo.webp?s=1024x1024&w=is&k=20&c=X53Ft4D-x-W0DqsI26IVeBjFTJbhgSKqrSBkavLKhI4="}
                alt="Profile"
                className="profile-img"
              />
              <div className="status-indicator"></div>
            </div>
            <h2 className="username">{user.name || user.username}</h2>
            <p className="sport-tag">{user.sport || "Athlete"}</p>
            <div className="profile-actions">
              <button className="edit-btn">Edit Profile</button>
              <button
                className="logout-btn"
                onClick={() => {
                  localStorage.clear();
                  navigate("/signup");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="analysis-main">

          <div className="analysis-header">
            <h1>Athlete <span className="blue-text">Analysis</span></h1>
            <p>Welcome back, {user.name}! Here are your AI performance metrics.</p>
          </div>

          <div className="analysis-grid">
            <div className="info-card highlight-card">
              <div className="info-item">
                <span className="label">Primary Role</span>
                <span className="value">{user.analysis.role}</span>
              </div>
              <div className="info-item">
                <span className="label">Reference Player</span>
                <span className="value">{user.analysis.referencePlayer}</span>
              </div>
            </div>

            <div className="info-card risk-card">
              <span className="label">Injury Risk Level</span>
              <div
                className="risk-badge"
                style={{ backgroundColor: getRiskColor(user.analysis.injuryLevelRisk) }}
              >
                {user.analysis.injuryLevelRisk} Risk
              </div>
              <p className="risk-desc">Biomechanical stress is currently minimal.</p>
            </div>
          </div>

          <div className="scores-section">
            <h3 className="section-title">Performance Scores</h3>
            <div className="scores-grid">
              <ScoreBar label="Pose Accuracy" value={user.analysis.scores.pose} />
              <ScoreBar label="Competitive Edge" value={user.analysis.scores.edge} />
              <ScoreBar label="Overall Performance" value={user.analysis.scores.performance} />
              <ScoreBar label="Injury Resistance" value={100 - user.analysis.scores.injury} isInjury />
            </div>
          </div>

          {/* ✅ VIDEO UPLOAD SECTION ADDED */}
          <div className="video-upload-section">
            <h3 className="section-title">Upload Performance Video</h3>
            <p className="upload-desc">
              Upload your latest match 
            </p>

            <div className="upload-box">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="file-input"
              />

              {videoPreview && (
                <video
                  src={videoPreview}
                  controls
                  className="video-preview"
                />
              )}

              <button
                className="upload-btn"
                onClick={handleVideoUpload}
              >
                Upload Video
              </button>

              {uploadStatus && (
                <p className="upload-status">{uploadStatus}</p>
              )}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

// ScoreBar Component
const ScoreBar = ({ label, value, isInjury }) => (
  <div className="score-card">
    <div className="score-header">
      <span>{label}</span>
      <span className="score-val">{value}%</span>
    </div>
    <div className="progress-bar">
      <div
        className={`fill ${isInjury ? 'injury' : ''}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

export default PlayerDashboard;