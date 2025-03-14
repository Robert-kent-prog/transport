// src/App.js

import React from 'react';
import NavbarComponent from './components/Navbar';
import Footer from './components/Footer';
import Router from './routes';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <NavbarComponent />
      <Router />
      <Footer />
    </div>
  );
};

export default App;