import './Header.css';
import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { FaGithub, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  let navigate = useNavigate();

  const navigateToRecipes = ()=>{
    navigate('/recipes')
  }


  return (
    <header className="header">
      <div className="left-section">
        {/* <img src="/path/to/logo.png" alt="OpenStove Logo" className="logo-img" /> */}
        <span>RecipeHaven</span>
      </div>
      <div className="center-section">
        <nav className="nav-large ">
          <a href="/" className="nav-link">Home</a>
          <a href="/recipes" className="nav-link" onClick={navigateToRecipes}>Recipes</a>
          <a href="/about" className="nav-link">About</a>
        </nav>
      </div>
      <div className="right-section">
        <input type="text" placeholder="Search recipes..." className="search-input" />
        <a href="https://github.com/kottakotarohith/Food-Recipes-App" target="_blank" rel="noopener noreferrer">
          <FaGithub className="icon github-icon" />
        </a>
        <FaBars className="icon menu-icon" onClick={toggleMenu} />
      </div>
      {menuOpen && (
        <nav className="nav-small">
          <FaTimes className="icon close-icon" onClick={toggleMenu} />
          <a href="/" className="nav-link">Home</a>
          <a href="/recipes" className="nav-link">Recipes</a>
          <a href="/about" className="nav-link">About</a>
        </nav>
      )}
    </header>
  );
};

export default Header;
