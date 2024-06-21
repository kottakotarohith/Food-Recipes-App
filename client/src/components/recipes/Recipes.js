import React, { useEffect, useState } from 'react';
import './recipes.css';
import almondPoundCake from '../../imagesOfFoodRecipeApp/almond-pound-cake.avif';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useLocation} from 'react-router-dom'
import recipes_top from '../../imagesOfFoodRecipeApp/recipes_top.png'
import { FaBookmark } from "react-icons/fa";
import {  IoMdAddCircle } from "react-icons/io";


function Recipes() {
  
  const location = useLocation();
  let [recipesList, setRecipesList] = useState([]);
  const navigate = useNavigate();

  const openRecipe = (recipe) => {
    // console.log(recipe);
    const formattedTitle = recipe.title.replace(/ /g, '_'); // Replace spaces with underscores
    navigate(`/recipe/${formattedTitle}`, { state: recipe });
  };

  const getRecipes = async () => {
    let res = await axios.get('http://localhost:4000/user-api/recipes');
    console.log(res);
    setRecipesList(res.data.payload);
  };

  useEffect(() => {
    if (location.state && location.state.searchedRecipes) {
      setRecipesList(location.state.searchedRecipes);
    } else {
        getRecipes();
    }
  }, [location]);

  const navigateToSavedRecipes = ()=>{
    navigate('/recipes/saved-recipes');
  }

  return (
    <div className='container'>

      <div >
          {location.state && location.state.searchedRecipes ?
            <>
              <h1 className='text-wrap text-center searchedText'>Results for : {location.state.searchText} </h1>
            </>
            :
            <>
            <img src={recipes_top}  alt='recipe-top-image' style={{maxWidth:'100vw' , maxHeight:'60vh'}}/>
            <div className='d-flex justify-content-end'>
              <button className="addRecipe-btn"  >Add Recipe   <IoMdAddCircle /></button>
              <button className="saved-btn" onClick={navigateToSavedRecipes}>Saved Recipes   <FaBookmark /></button>
            </div>
            </>
          }
      </div>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-2'>
        {recipesList.map((recipe) => (
          <div className='col' key={recipe._id}>
            <div className='card' onClick={() => openRecipe(recipe)} >
              <div className='img-container'>
                <img
                  src={almondPoundCake}
                  className='card-img-top recipeImg'
                  alt='recipe image holder'
                />
              </div>
              <div className='card-body'>
                <h5 className='card-title'>{recipe.title}</h5>
                <p className='card-text'>{recipe.about}</p>
                <div className='recipe_tags'>
                  {Array.isArray(recipe.tags) ? (
                    recipe.tags.map((tag) => (
                      <div key={tag} className='recipe_tag btn'>
                        {tag}
                      </div>
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
  );
}

export default Recipes;
