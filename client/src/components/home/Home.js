import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import home_page_img from '../../imagesOfFoodRecipeApp/home_page_img.png'

function Home() {

  let navigate = useNavigate()
  const navigatetorecipes = ()=>{
      navigate('/recipes')
  }

  return (
    <div>
        <div className='home-page'>
        <div className='text-content '>
          <h1>SavourSpot — Your Ultimate Recipe Library</h1>
          <h4>A vibrant community kitchen where discovering and sharing recipes is simple and delightful. Cook, enjoy, and add your unique flavors.</h4>
          <div className='buttons'>
            <button className='contribute-btn'>How to Contribute?</button>
            <button className='explore-btn' onClick={navigatetorecipes}>Explore Recipes</button>
          </div>
        </div>
        <div className='image-content'>
          <img src={home_page_img} alt="home_page_img" />
        </div>
      </div>

      
    </div>
  )
}

export default Home
