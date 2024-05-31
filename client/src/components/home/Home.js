import React from 'react'
import './Home.css'
import home_page_img from '../../imagesOfFoodRecipeApp/home_page_img.png'

function Home() {
  return (
    <div>
       <img src={home_page_img} alt="home_page_img" style={{width:"95vw"}} />
    </div>
  )
}

export default Home