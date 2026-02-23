import React, { useState } from "react"; // Added useState
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const location = useLocation();
  
  // 1. Add state to handle the mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoginPage = location.pathname === "/login";

  // 2. Helper to close menu when a link is clicked
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`navbar ${isLoginPage ? "nav-transparent" : "nav-sticky"}`}>
      <div className="nav-container">
        <div className="navbar-logo">
          <Link to="/" onClick={closeMenu}>
            <span className="logo-sports">Brigde</span>
            <span className="logo-talent">Talent</span>
          </Link>
        </div>

        {/* 3. Added the Menu Icon here */}
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
        </div>

        {/* 4. Added "active" class to nav-links when menu is open */}
        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-item" onClick={closeMenu}>Home</Link>
          <Link to="/player" className="nav-item" onClick={closeMenu}>Player</Link>
          <Link to="/coach" className="nav-item" onClick={closeMenu}>Coach</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;