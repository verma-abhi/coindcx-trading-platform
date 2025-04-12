import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      {/* <div className="footer-container">
        <div className="footer-logo">
          <h2>CoinDCX Trader</h2>
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" className="social-icon">FB</a>
          <a href="https://twitter.com" className="social-icon">TW</a>
          <a href="https://linkedin.com" className="social-icon">LI</a>
        </div>
      </div> */}
      <div className="footer-bottom">
        <p>&copy; 2025 CoinDCX Trader. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
