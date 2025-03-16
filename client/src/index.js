// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import { BrowserRouter } from 'react-router-dom'; // For routing
import App from './App'; // Main application component
import './App.css'; // Global styles
import { AuthProvider } from './contexts/AuthContext'; // Authentication context provider
import { MapProvider } from './contexts/MapContext'; // Map context provider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Wrap the app with the BrowserRouter for routing */}
    <BrowserRouter>
      {/* Provide authentication context to the entire app */}
      <AuthProvider>
        {/* Provide map context to the entire app */}
        <MapProvider>
          <App />
        </MapProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);