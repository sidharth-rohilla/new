import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  // Logic to get the user's name (Replace with your actual auth logic)
  const user = { isLoggedIn: true, name: "Alex" }; 

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Sports AI Scouting Platform</h1>
          <p>
            Discover, analyze, and track athlete performance using AI-powered
            video analytics and smart scouting tools.
          </p>

          <div className="hero-buttons">
            {user.isLoggedIn ? (
              <h2 className="welcome-text">Welcome back, {user.name}!</h2>
            ) : (
              <Link to="/signup">
                <button className="primary-btn">Sign up as coach/player</button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Platform Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>AI Video Analysis</h3>
            <p>Advanced pose detection and performance tracking.</p>
          </div>
          <div className="feature-card">
            <h3>Talent Scouting</h3>
            <p>Smart analytics to discover rising athletes.</p>
          </div>
          <div className="feature-card">
            <h3>Performance Tracking</h3>
            <p>Monitor progress with interactive charts.</p>
          </div>
        </div>
      </div>

      <div className="footer">
        © copyright talent-grassroot
      </div>
    </div>
  );
}

export default Home;