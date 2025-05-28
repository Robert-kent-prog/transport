import React from 'react';
import NavbarComponent from './components/Navbar';
import Footer from './components/Footer';
import Router from './routes';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <NavbarComponent />
      <main className="content-wrap">
        <Router />
      </main>
      <Footer />
    </div>
  );
};

export default App;