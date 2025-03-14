// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'; // For routing
import App from './App';
import './App.css'; // Global styles
import { AuthProvider } from './contexts/AuthContext'; // Authentication context provider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Wrap the app with the BrowserRouter for routing */}
    <BrowserRouter>
      {/* Provide authentication context to the entire app */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);