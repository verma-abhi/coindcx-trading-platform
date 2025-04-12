import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import TradePage from './pages/TradePage';
import OrdersPage from './pages/OrdersPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Header from './components/header';
import Footer from './components/Footer'; // Import Footer component
import { useAuth } from './context/AuthContext'; // Make sure Auth context is properly imported
import './App.css';

function App() {
  const { credentials } = useAuth(); // ✅ Get login credentials

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {credentials ? (
            <>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/trade" element={<TradePage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </main>
      <Footer /> {/* Footer placed outside the routing logic */}
    </div>
  );
}

export default App;
