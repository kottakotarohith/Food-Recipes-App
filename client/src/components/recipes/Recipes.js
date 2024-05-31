import React from 'react'
import './recipes.css'
import almondPoundCake from '../../imagesOfFoodRecipeApp/almond-pound-cake.avif'

function Recipes() {


  return (

    <div>
        <div className='container'>
          <div className="card" style={{width:"18rem"}}>
            <div className='img-container'>
              <img src={almondPoundCake} className="card-img-top recipeImg" alt=" recipe image holder" style={{minWidth:"200px"}}/>
            </div>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
    </div>

  )
}

export default Recipes