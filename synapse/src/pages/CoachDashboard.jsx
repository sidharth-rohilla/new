import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CoachDashboard.css";

const DUMMY_PLAYERS = [
  { id: "d1", username: "Marcus Johnson", sport: "Basketball", role: "Point Guard", score: 98.4, status: "Top Talent", location: "Chicago, IL", trend: "+2.5%" },
  { id: "d2", username: "Elena Rodriguez", sport: "Soccer", role: "Forward", score: 95.2, status: "Scouted", location: "Madrid, ES", trend: "+1.2%" },
  { id: "d3", username: "David Chen", sport: "Swimming", role: "Freestyle", score: 92.8, status: "Available", location: "Toronto, CA", trend: "+4.1%" },
  { id: "d4", username: "Sarah Miller", sport: "Volleyball", role: "Setter", score: 89.5, status: "Watchlist", location: "Miami, FL", trend: "-0.5%" },
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
        .map(p => ({
          ...p,
          score: p.score || Math.floor(Math.random() * (85 - 60 + 1)) + 60,
          status: "New Entry",
          trend: "+0.0%"
        }));

      const sortedList = [...realPlayers, ...DUMMY_PLAYERS]
        .sort((a, b) => b.score - a.score);

      setPlayers(sortedList);
    }
  }, [navigate]);

  if (!coach)
    return <div className="loading-screen">Authenticating Coach Portal...</div>;

  return (
    <div className="coach-dashboard-wrapper">

      {/* HEADER */}
      <header className="dashboard-header">
        <div className="coach-profile-section">
          <img
            src={
              coach.profilePic ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150"
            }
            alt="Coach Profile"
            className="coach-photo"
          />
          <div className="coach-meta">
            <h1>
              Coach {coach.username}
              <span className="verified-badge">✓</span>
            </h1>
            <p>{coach.sport} scouting dashboard • Senior Scout</p>
          </div>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </header>

      {/* ===== TOP 3 PERFORMERS (Redesigned) ===== */}
      <section className="top-three-section">
        <h2 className="section-title">
          Elite Performers <span className="blue-dot"></span>
        </h2>

        <div className="top-three-grid">
          {players.slice(0, 3).map((player, index) => (
            <div className="modern-player-card" key={player.id || index}>

              {/* Cover */}
              <div className="card-cover">
                <span className="rank-badge">#{index + 1}</span>
              </div>

              {/* Profile Image */}
              <div className="profile-img-wrapper">
                <img
                  src={
                    player.profilePic ||
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200"
                  }
                  alt="player"
                />
              </div>

              {/* Body */}
              <div className="card-body">
                <h3>{player.username}</h3>
                <p className="player-role">
                  {player.sport} • {player.location || "Global"}
                </p>

                <div className="score-text">
                  AI Score: <span>{player.score}%</span>
                </div>

                <button className="connect-btn">
                  Analyze Performance
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ===== LEADERBOARD (UNCHANGED) ===== */}
      <section className="leaderboard-container">
        <h3 className="section-title">Full Talent Leaderboard</h3>
        <div className="table-wrapper">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Athlete Name</th>
                <th>Sport</th>
                <th>AI Score</th>
                <th>Status</th>
                <th className="text-center">Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={player.id || index}>
                  <td><span className="table-rank">#{index + 1}</span></td>
                  <td className="name-cell">{player.username}</td>
                  <td>{player.sport}</td>
                  <td><span className="score-blue-bold">{player.score}%</span></td>
                  <td>
                    <span className={`status-pill ${player.status.toLowerCase().replace(" ", "-")}`}>
                      {player.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <div className="action-buttons-group">
                      <button className="row-btn analyze">Analyze</button>
                      <button className="row-btn invite">Invite</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}

export default CoachDashboard;