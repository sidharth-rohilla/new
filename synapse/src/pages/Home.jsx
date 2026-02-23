import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import homeMp4 from "../assets/home.mp4"
function Home() {
  // Logic to get the user's name
  const user = { isLoggedIn: false, name: "Alex" }; 

  return (
    <div className="home-page">
      {/* Hero Section Split */}
      <section className="hero-split">
        <div className="hero-content">
          <span className="badge">AI-Powered Scouting</span>
          <h1>Sports AI <br /> <span className="text-gradient">Scouting Platform</span></h1>
          <p>
            Discover, analyze, and track athlete performance using AI-powered
            video analytics and smart scouting tools.
          </p>

          <div className="hero-buttons">
            {user.isLoggedIn ? (
              <h2 className="welcome-text">Welcome back, {user.name}!</h2>
            ) : (
              <div className="btn-group">
                <Link to="/signup">
                  <button className="primary-btn">Sign up as coach/player</button>
                </Link>
                <button className="secondary-btn">Watch Demo</button>
              </div>
            )}
          </div>
        </div>

        <div className="hero-video-container">
          <div className="video-wrapper">
            {/* High-quality Basketball or Soccer clip */}
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="hero-video"
            >
              <source src={homeMp4} type="video/mp4" />
            </video>

            {/* AI Scanning Overlay Elements */}
            <div className="scan-line"></div>
            <div className="data-point point-1"><span>Speed: 22km/h</span></div>
            <div className="data-point point-2"><span>Vertical: 32"</span></div>
            <div className="data-point point-3"><span>Accuracy: 94%</span></div>
            
            <div className="ai-status-box">
              <div className="pulse-red"></div>
              <span>LIVE AI TRACKING</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Platform Features</h2>
          <p>Everything you need to find the next sports star</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">📊</div>
            <h3>AI Video Analysis</h3>
            <p>Advanced pose detection and performance tracking in real-time.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🔍</div>
            <h3>Talent Scouting</h3>
            <p>Smart analytics to discover rising athletes across the globe.</p>
          </div>
          <div className="feature-card">
            <div className="icon">📈</div>
            <h3>Performance Tracking</h3>
            <p>Monitor progress with interactive charts and automated reports.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;