import './Header.css';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { IoMdLogIn } from "react-icons/io";
import logo from '../../imagesOfFoodRecipeApp/logo.png';
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  let navigate = useNavigate();

  const navigateToRecipes = () => {
    navigate('/recipes');
  };
  const navigatetologin= ()=>{
    navigate('/login');
  }

  const handleSearchSubmit = async (event) => {
    event.preventDefault()
    const search = event.target.search.value.trim();
    if(search!==""){
      try {
        const response = await axios.get(`http://localhost:4000/user-api/search?search=${search}`);
        if (response.data.payload && response.data.payload.length > 0) { // Check the correct structure of the response
          navigate(`/recipes?search=${search}`, {state:{ searchedRecipes: response.data.payload , searchText:search}});
        } else {
          console.log('No recipes found');
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  }

  return (
    <header className="header">
      <div className="left-section">
        <FaBars className="icon menu-icon" onClick={toggleMenu} />
        <img src={logo} alt=" Logo" className="logo-img" />
        <div className="name">
          <span className="fs-3 px-2 text-danger-emphasis">SavourSpot </span>
          {/* <p className='px-2 text-danger-emphasis fs-5'>-Your Ultimate Recipe Hub!</p> */}
        </div>
      </div>

      {menuOpen && (
        <nav className="nav-small">
          <FaTimes className="icon close-icon" onClick={toggleMenu} />
          <NavLink to="/" className="nav-link" onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/recipes" className="nav-link" onClick={toggleMenu}>Recipes</NavLink>
          <NavLink to="/about" className="nav-link" onClick={toggleMenu}>About</NavLink>
        </nav>
      )}

      <div className="center-section">
        <nav className="nav-large">
          <NavLink to="/" className="nav-link px-3">Home</NavLink>
          <NavLink to="/recipes" className="nav-link px-3" onClick={navigateToRecipes}>Recipes</NavLink>
          <NavLink to="/about" className="nav-link px-3">About</NavLink>
        </nav>
      </div>

      <div className="right-section">
        <form onSubmit={handleSearchSubmit} className="search-container">
          <input
            type="text"
            name="search"
            placeholder="Search recipes..."
            className="search-input"
          />
          <IoSearchOutline className="search-icon" onClick={() => document.querySelector('button[type="submit"]').click()} />
          <button type="submit" style={{ display: 'none' }} />
        </form>
        <a href="https://github.com/kottakotarohith/Food-Recipes-App" target="_blank" rel="noopener noreferrer">
          <FaGithub className="icon github-icon" />
        </a>
        <div className="login-container" onClick={navigatetologin} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <IoMdLogIn className='login-icon icon' />
          <span className="login-text">Login</span>
        </div>

      </div>
    </header>
  );
};

export default Header;
