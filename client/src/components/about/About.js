import React from 'react'
import './About.css'
import about_1 from '../../imagesOfFoodRecipeApp/about_1.png'

function About() {
  return (
    <div>
        <div className='about-intro' style={{marginBottom:'50px'}}>
          <div className='about-intro-inside'>
          <p style={{color:'#da7706'}}>introducing SavorSpot:</p>
          <h1 className='fw-bold' style={{maxWidth:'50vw'}}>A Curated Collection of Community-Crafted Recipes</h1>
          <p className=' lead' style={{paddingTop:'10px'}} >Explore a growing repository of culinary delights, meticulously organized and shared through GitHub contributions.</p>
          </div>
        </div>

        <div className='about-1' >
        <div className='text-content' >
          <h1>Hello to all who love cooking!</h1>
          <p>SavourSpot is more than just a recipe website; it's a place where cooking enthusiasts can come together to share their favorite recipes without any annoying ads or fees — completely free.</p>
          <br/>
          <p>Born from the belief that cooking should be distraction-free and without commercial intrusions, SavourSpot thrives on the simplicity of sharing recipes. No ads, no paywalls — just direct access to a treasure trove of dishes curated and cherished by an ever-growing community of food lovers.</p>
        </div>
        <div className='image-content'>
            <img src={about_1} alt="home_page_img" />
          </div>
        </div>


    </div>
  )
}

export default About