import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Sports Talent</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/player">Player</Link>
        <Link to="/coach">Coach</Link>
      </div>
    </nav>
  );
}

export default Navbar;