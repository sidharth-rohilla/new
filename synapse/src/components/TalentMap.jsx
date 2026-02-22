import React from "react";

import { Link } from "react-router-dom";

function TalentMap() {
  return (
    <div style={{ padding: "40px" }}>
      <h2>Talent Map</h2>

      <div style={styles.card}>
        <h3>Player: John Doe</h3>
        <p>Sport: Cricket</p>
        <p>Potential: High</p>

        <Link to="/profile">
          <button>View Profile</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "20px",
    width: "300px"
  }
};

export default TalentMap;