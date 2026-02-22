import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/coachDashboard.css";

function CoachDashboard() {
  const navigate = useNavigate();
  const [coach, setCoach] = useState(null);
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    const role = localStorage.getItem("userRole");

    // Protect route
    if (!storedUser || role !== "coach") {
      navigate("/signup");
    } else {
      setCoach(storedUser);

      // Get all registered users (for demo we simulate array)
      const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

      // Filter only players
      const playerList = allUsers.filter(user => user.role === "player");

      setPlayers(playerList);
    }
  }, [navigate]);

  return (
    <div className="coach-dashboard">

      <div className="coach-header">
        <h2>Welcome Coach {coach?.username} 🎯</h2>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Total Players</h3>
          <p>{players.length}</p>
        </div>

        <div className="analytics-card">
          <h3>High Potential</h3>
          <p>--</p>
        </div>

        <div className="analytics-card">
          <h3>Watchlist</h3>
          <p>--</p>
        </div>
      </div>

      <div className="talent-section">
        <h3>Talent Map</h3>

        <div className="talent-grid">
          {players.length > 0 ? (
            players.map((player, index) => (
              <div className="player-card" key={index}>
                <h4>{player.username}</h4>
                <p>Sport: {player.sport}</p>
                <p>Age: {player.age}</p>
                <p>Location: {player.location}</p>

                <div className="card-buttons">
                  <button className="profile-btn">View Profile</button>
                  <button className="watch-btn">Add to Watchlist</button>
                  <button className="invite-btn">Invite to Trials</button>
                </div>
              </div>
            ))
          ) : (
            <p>No Players Registered Yet</p>
          )}
        </div>
      </div>

    </div>
  );
}

export default CoachDashboard;