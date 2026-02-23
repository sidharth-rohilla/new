import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/coachDashboard.css";

const DUMMY_PLAYERS = [
  { id: "d1", username: "Marcus Johnson", sport: "Basketball", score: 98.4, location: "Chicago, IL" },
  { id: "d2", username: "Elena Rodriguez", sport: "Soccer", score: 95.2, location: "Madrid, ES" },
  { id: "d3", username: "David Chen", sport: "Swimming", score: 92.8, location: "Toronto, CA" },
  { id: "d4", username: "Sarah Miller", sport: "Volleyball", score: 89.5, location: "Miami, FL" },
  { id: "d5", username: "James Wilson", sport: "Tennis", score: 88.2, location: "London, UK" },
  { id: "d6", username: "Anna Scott", sport: "Running", score: 87.5, location: "Berlin, DE" },
  { id: "d7", username: "Leo Messi", sport: "Soccer", score: 86.9, location: "Rosario, AR" },
  { id: "d8", username: "Chloe Kim", sport: "Snowboard", score: 85.1, location: "Long Beach, CA" },
  { id: "d9", username: "Tom Brady", sport: "Football", score: 84.5, location: "Tampa, FL" },
  { id: "d10", username: "Serena W.", sport: "Tennis", score: 83.2, location: "Saginaw, MI" },
  { id: "d11", username: "Kevin Durant", sport: "Basketball", score: 82.0, location: "Washington, DC" },
];

function CoachDashboard() {
  const navigate = useNavigate();
  const [coach, setCoach] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    const role = localStorage.getItem("userRole");

    if (!storedUser || role !== "coach") {
      navigate("/signup");
    } else {
      setCoach(storedUser);
      const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
      const realPlayers = allUsers
        .filter(user => user.role === "player")
        .map(p => ({ ...p, score: p.score || 70 }));

      const sortedList = [...realPlayers, ...DUMMY_PLAYERS].sort((a, b) => b.score - a.score);
      setPlayers(sortedList);
    }
  }, [navigate]);

  if (!coach) return <div className="loading-screen">Authenticating...</div>;

  // Logic to get 2nd, 1st, 3rd in that specific order for the flex row
  const topThree = [players[1], players[0], players[2]];
  const remainingPlayers = players.slice(3, 11);

  return (
    <div className="coach-dashboard-container">
      
      {/* 1. COACH PROFILE CARD */}
      <section className="coach-hero-card">
        <div className="coach-hero-content">
          <div className="coach-avatar-large">
             <img src={coach.profilePic || "https://via.placeholder.com/150"} alt="Coach" />
          </div>
          <div className="coach-info">
            <h1>Coach {coach.username}</h1>
            <p>Expert in {coach.sport} • Scouting & Analysis</p>
          </div>
        </div>
        <button className="logout-minimal" onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</button>
      </section>

      <h2 className="section-label">Analysis of Players</h2>

      {/* 2. TOP 3 PODIUM SECTION */}
      <section className="podium-section">
        {topThree.map((player, index) => {
          if (!player) return null;
          // index 0 is actually 2nd place, index 1 is 1st place, index 2 is 3rd place based on our array mapping
          const rankLabel = index === 1 ? "1st" : index === 0 ? "2nd" : "3rd";
          const rankClass = index === 1 ? "gold" : index === 0 ? "silver" : "bronze";

          return (
            <div className={`podium-card ${rankClass}`} key={player.id}>
              {index === 1 && <div className="crown-icon">👑</div>}
              <div className="player-rank-tag">{rankLabel} Player</div>
              <h3>{player.username}</h3>
              <p>{player.sport} • {player.score}%</p>
              
              <div className="podium-actions">
                <button className="btn-analysis">Analysis</button>
                <button className="btn-invite">Invite</button>
              </div>
            </div>
          );
        })}
      </section>

      <h2 className="section-label">Leaderboard</h2>

      {/* 3. LEADERBOARD GRID SECTION */}
      <section className="leaderboard-grid">
        {remainingPlayers.map((player) => (
          <div className="grid-item-card" key={player.id}>
            <div className="grid-avatar"></div>
            <h4>{player.username}</h4>
            <p>{player.sport}</p>
            <div className="grid-score">{player.score}%</div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default CoachDashboard;