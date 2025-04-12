import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import for React 18
import { BrowserRouter as Router } from 'react-router-dom'; // Router for routing
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Ensure you're using AuthContext if needed

// Create the root using createRoot() instead of render()
const root = ReactDOM.createRoot(document.getElementById('root')); // Get root element using createRoot

root.render(
  <AuthProvider>
    <Router>  {/* Wrap the App with Router */}
      <App />
    </Router>
  </AuthProvider>
);
