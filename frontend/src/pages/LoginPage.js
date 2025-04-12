// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

function LoginPage() {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey || !apiSecret) {
      alert('Please enter both API Key and Secret');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey, apiSecret }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.detail || 'Invalid credentials');
        return;
      }

      const data = await response.json();
      console.log('Login successful:', data);
      login({ apiKey, apiSecret });
      navigate('/dashboard');
    } catch (err) {
      alert('Error logging in! Invalid credentials.');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>🔐 Login using API Credentials</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your API Secret"
          value={apiSecret}
          onChange={(e) => setApiSecret(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;