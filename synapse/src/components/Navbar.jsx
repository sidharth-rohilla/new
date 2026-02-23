import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const location = useLocation();

  // We don't want the navbar to overlap the clean split of the login page
  // but if we do, we make it transparent.
  const isLoginPage = location.pathname === "/login";

  return (
    <nav className={`navbar ${isLoginPage ? "nav-transparent" : "nav-sticky"}`}>
      <div className="nav-container">
        <div className="navbar-logo">
          <Link to="/">
            <span className="logo-sports">Sports</span>
            <span className="logo-talent">Talent</span>
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/player" className="nav-item">Player</Link>
          <Link to="/coach" className="nav-item">Coach</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;