import './Header.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../imagesOfFoodRecipeApp/logo.png'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  let navigate = useNavigate();

  const navigateToRecipes = () => {
    navigate('/recipes');
  };

  return (
    <header className="header">
      <div className="left-section">
        <FaBars className="icon menu-icon" onClick={toggleMenu} />
        <img src={logo} alt=" Logo" className="logo-img" />
        <div className="name">
          <span className="fs-3 px-2 text-danger-emphasis">SavorSpot</span>
        </div>
      </div>

      {menuOpen && (
        <nav className="nav-small">
          <FaTimes className="icon close-icon" onClick={toggleMenu} />
          <a href="/" className="nav-link">Home</a>
          <a href="/recipes" className="nav-link">Recipes</a>
          <a href="/about" className="nav-link">About</a>
        </nav>
      )}

      <div className="center-section">
        <nav className="nav-large">
          <a href="/" className="nav-link px-3">Home</a>
          <a href="/recipes" className="nav-link px-3" onClick={navigateToRecipes}>Recipes</a>
          <a href="/about" className="nav-link px-3">About</a>
        </nav>
      </div>

      <div className="right-section">
        <input type="text" placeholder="Search recipes..." className="search-input" />
        <a href="https://github.com/kottakotarohith/Food-Recipes-App" target="_blank" rel="noopener noreferrer">
          <FaGithub className="icon github-icon" />
        </a>
      </div>
    </header>
  );
};

export default Header;
