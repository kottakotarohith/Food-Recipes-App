import React, { useEffect, useState } from 'react'
import './recipes.css'
import almondPoundCake from '../../imagesOfFoodRecipeApp/almond-pound-cake.avif'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Recipes() {

  let [recipesList , setRecipesList ] = useState([])
  const navigate = useNavigate()

  const openRecipe = ()=>{
    navigate('/recipe')
  }


  const getRecipes = async()=>{
    let res = await axios.get('http://localhost:4000/user-api/recipes')
    console.log(res)
    setRecipesList(res.data)
  }

  useEffect( ()=>{
    getRecipes()
  },[])

  return (

    <div className='container'>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
          {recipesList.map((recipe) => (
            <div className="col" key={recipe._id}>
              <div className="card" style={{width:"18rem"} } >
             <div className='img-container'>
               <img src={almondPoundCake} className="card-img-top recipeImg" alt=" recipe image holder" style={{minWidth:"200px"}}/>
             </div>
             <div className="card-body">
               <h5 className="card-title">{recipe.title}</h5>
               <p className="card-text">{recipe.about}</p>
               <div className='recipe_tags'>
                  {Array.isArray(recipe.tags) ? (
                    recipe.tags.map((tag)=> (
                      <span key={ recipe._id} className='recipe_tag btn'>{tag}</span>
                    ))
                  ) : (
                    <span>No tags available</span>
                  )}
                </div>
             </div>
           </div>
            </div>
          ))}
      </div>
    </div>

  )
}

export default Recipes