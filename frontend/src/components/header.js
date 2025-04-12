import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <h1 className="logo">CoinDCX Trader</h1>
      </div>
      <nav className="nav-links">
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
        <Link className="nav-link" to="/trade">Trade</Link>
        <Link className="nav-link" to="/orders">Orders</Link>
      </nav>
      <button className="logout-btn" onClick={() => {
        localStorage.clear();
        window.location.href = "/";
      }}>
        Logout
      </button>
    </header>
  );
}

export default Header;
