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
  const [selectedPlayer, setSelectedPlayer] = useState(null); // 🔥 MODAL STATE

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

      const sortedList = [...realPlayers, ...DUMMY_PLAYERS]
        .sort((a, b) => b.score - a.score);

      setPlayers(sortedList);
    }
  }, [navigate]);

  if (!coach) return <div className="loading-screen">Authenticating...</div>;

  const topThree = [players[1], players[0], players[2]];
  const remainingPlayers = players.slice(3, 11);

  return (
    <div className="coach-dashboard-container">

      {/* COACH PROFILE */}
      <section className="coach-hero-card">
        <div className="coach-hero-content">
          <div className="coach-avatar-large">
            <img
              src={
                coach.profilePic ||
                "https://media.istockphoto.com/id/1225695062/photo/young-indian-businessman-stock-photo.webp?s=1024x1024&w=is&k=20&c=X53Ft4D-x-W0DqsI26IVeBjFTJbhgSKqrSBkavLKhI4="
              }
              alt="Coach"
            />
          </div>
          <div className="coach-info">
            <h1>Coach {coach.username}</h1>
            <p>Expert in {coach.sport} • Scouting & Analysis</p>
          </div>
        </div>
        <button
          className="logout-minimal"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </section>

      <br /><hr /><br />

      <h2 className="section-label">Top Three Performers</h2>

      {/* PODIUM */}
      <section className="podium-section">
        {topThree.map((player, index) => {
          if (!player) return null;

          const rankLabel =
            index === 1 ? "1st" : index === 0 ? "2nd" : "3rd";
          const rankClass =
            index === 1 ? "gold" : index === 0 ? "silver" : "bronze";

          return (
            <div className={`podium-card ${rankClass}`} key={player.id}>
              {index === 1 && <div className="crown-icon">👑</div>}
              <div className="player-rank-tag">{rankLabel} Player</div>
              <h3>{player.username}</h3>
              <p>{player.sport} • {player.score}%</p>

              <div className="podium-actions">
                <button
                  className="btn-analysis"
                  onClick={() => setSelectedPlayer(player)}
                >
                  Analysis
                </button>
                <button className="btn-invite">Invite</button>
              </div>
            </div>
          );
        })}
      </section>

      <br /><hr /><br />

      <h2 className="section-label">Leaderboard</h2>

      {/* GRID */}
      <section className="leaderboard-grid">
        {remainingPlayers.map((player) => (
          <div className="grid-item-card" key={player.id}>
            <h4>{player.username}</h4>
            <p>{player.sport}</p>
            <div className="grid-score">{player.score}%</div>

            <button
              className="btn-analysis"
              onClick={() => setSelectedPlayer(player)}
            >
              Analysis
            </button>

            <button className="btn-invite">Invite</button>
          </div>
        ))}
      </section>

      {/* 🔥 ANALYSIS MODAL */}
      {selectedPlayer && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedPlayer(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedPlayer(null)}
            >
              ✖
            </button>

            <div className="modal-profile">
              <img
                src={
                  selectedPlayer.profilePic ||
                  "https://via.placeholder.com/150"
                }
                alt="Player"
              />
              <h2>{selectedPlayer.username}</h2>
              <p><strong>Sport:</strong> {selectedPlayer.sport}</p>
              <p><strong>Score:</strong> {selectedPlayer.score}%</p>
              <p><strong>Location:</strong> {selectedPlayer.location || "N/A"}</p>

              <div className="analysis-stats">
                <div className="stat-box">
                  <span>Speed</span>
                  <strong>{Math.floor(Math.random() * 30 + 70)}%</strong>
                </div>
                <div className="stat-box">
                  <span>Stamina</span>
                  <strong>{Math.floor(Math.random() * 30 + 70)}%</strong>
                </div>
                <div className="stat-box">
                  <span>Agility</span>
                  <strong>{Math.floor(Math.random() * 30 + 70)}%</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default CoachDashboard;