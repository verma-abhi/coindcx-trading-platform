import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import LivePrices from '../components/LivePrices';

function DashboardPage() {
  const [healthStatus, setHealthStatus] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/health')
      .then(res => res.json())
      .then(data => setHealthStatus(data.status))
      .catch(err => {
        console.error('Health check failed:', err);
        setHealthStatus('unhealthy');
      });
  }, []);

  return (
    <div className="dashboard-container">
      <h1>🚀 Welcome to Your Trading Dashboard</h1>
      <p className="subtitle">Track market activity, monitor app health, and jump into trading!</p>

      <div className={`health-check ${healthStatus}`}>
        <span>Backend Health:</span> {healthStatus ? healthStatus.toUpperCase() : 'Checking...'}
      </div>

      <LivePrices />
    </div>
  );
}

export default DashboardPage;
