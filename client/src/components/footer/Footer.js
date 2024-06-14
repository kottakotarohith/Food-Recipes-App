import React from 'react'
import './Footer.css'
import logo from '../../imagesOfFoodRecipeApp/logo.png'

function Footer() {
  return (
    <div>
        <div className='footer '>
            <img src={logo}  alt='logo'  style={{height:"90px"}}/>
            <p className='fs-5 text-dark-emphasis'>
              Explore.Share.Cook.
              <br/>
              Dive into a community-curated collection of recipes.
            </p>
            
            <p>© 2024 Food Recipe App. #inspired.</p>
        </div>
    </div>
  )
}

export default Footer