import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Landing from './components/Landing';
import Logos from './components/Logos';
import Footer from './components/Footer';
import Products from './components/Products';
import Login from './components/Login';
import Admin from './components/Admin';
import Company from './components/Company';
import Contact from './components/Contact';
import './styles/App.css';

// Protected Route Component
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Routes with Header and Footer */}
          <Route path="/" element={
            <>
              <Header />
              <Landing />
              <Logos />
              <Footer />
            </>
          } />
          
          <Route path="/products" element={
            <>
              <Header />
              <Products />
              <Footer />
            </>
          } />

          <Route path="/company" element={
            <>
              <Header />
              <Company />
              <Footer />
            </>
          } />

          <Route path="/contact" element={
            <>
              <Header />
              <Contact />
              <Footer />
            </>
          } />

          {/* Login Route - No Header/Footer */}
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Route - No Header/Footer */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;