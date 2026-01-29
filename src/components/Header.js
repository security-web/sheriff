import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.classList.add('menu-open');
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.classList.remove('menu-open');
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    // Cleanup function
    return () => {
      document.body.classList.remove('menu-open');
      document.body.style.top = '';
    };
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [location]);

  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={handleHomeClick}>
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L4 8V14C4 21.5 9 27.5 16 30C23 27.5 28 21.5 28 14V8L16 2Z" stroke="#c6c6c6ff" strokeWidth="2" fill="none"/>
            <path d="M12 16L15 19L20 13" stroke="#ffffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" onClick={handleHomeClick}>მთავარი</Link>
          <Link to="/company" onClick={closeMenu}>კომპანია</Link>
          <Link to="/products" onClick={closeMenu}>პროდუქცია</Link>
          <a href="#discounts" onClick={closeMenu}>ფასდაკლებები</a>
          <Link to="/partners" onClick={closeMenu}>პარტნიორები</Link>
          <Link to="/contact" onClick={closeMenu}>კონტაქტი</Link>
        </nav>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
    </header>
  )
}

export default Header