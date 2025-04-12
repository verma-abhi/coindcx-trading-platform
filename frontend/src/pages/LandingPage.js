import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="landing-container">
      <div className="landing-hero">
        <h1>Welcome to CoinDCX Trading Terminal</h1>
        <p>Trade your favorite cryptocurrencies with lightning-fast execution and a beautiful UI.</p>
        <button onClick={handleGetStarted}>Get Started</button>
      </div>
      <div className="landing-features">
        <div className="feature-card">
          <h3>Live Prices</h3>
          <p>Track real-time crypto prices for BTC, ETH, XRP and more.</p>
        </div>
        <div className="feature-card">
          <h3>Trade Seamlessly</h3>
          <p>Place market or limit orders with full control and speed.</p>
        </div>
        <div className="feature-card">
          <h3>Manage Orders</h3>
          <p>View open & closed orders, cancel with one click.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
