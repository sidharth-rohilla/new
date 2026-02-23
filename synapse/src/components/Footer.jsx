import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section 1: Brand & Description */}
        <div className="footer-section brand-info">
          <div className="logo">
            <span className="logo-sports">Bridge</span>
            <span className="logo-talent">Talent</span>
          </div>
          <p className="footer-description">
            The ultimate scouting platform connecting elite athletes with world-class coaches. 
            Empowering the next generation of sports stars.
          </p>
          <div className="social-icons">
            <a href="#" className="social-link">f</a>
            <a href="#" className="social-link">t</a>
            <a href="#" className="social-link">in</a>
            <a href="#" className="social-link">ig</a>
          </div>
        </div>

        {/* Section 2: Quick Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-links">
            <li><a href="/home">Home</a></li>
            <li><a href="/player">Player</a></li>
            <li><a href="/coach">Coach</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Section 3: Resources */}
        <div className="footer-section">
          <h4 className="footer-heading">Resources</h4>
          <ul className="footer-links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Scouting Tips</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Section 4: Newsletter */}
        <div className="footer-section newsletter">
          <h4 className="footer-heading">Stay Updated</h4>
          <p>Get the latest scouting reports and news.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Join</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} sportsTalent. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;