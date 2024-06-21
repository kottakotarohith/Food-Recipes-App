import React, { useEffect, useState } from 'react';
import './SavedRecipes.css'
import almondPoundCake from '../../imagesOfFoodRecipeApp/almond-pound-cake.avif';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function SavedRecipes() {

  const navigate = useNavigate();
  let [recipesList, setRecipesList] = useState([]);

  const openRecipe = (recipe) => {
    // console.log(recipe);
    const formattedTitle = recipe.title.replace(/ /g, '_'); // Replace spaces with underscores
    navigate(`/recipe/${formattedTitle}`, { state: recipe });
  };
  const getRecipes = async () => {
    let res = await axios.get('http://localhost:4000/user-api/saved-recipes');
    console.log(res);
    setRecipesList(res.data.payload);
  };
  const navigateToRecipesPage = () => {
    navigate('/recipes');
  }


  useEffect(() => {
    getRecipes();
  }, []);


  return (
    <div className='container'>
      <div className=''>
        <h1 className='text-wrap text-center fw-bold saved-recipes-heading'>Saved Recipes</h1>
      </div>
      {
        recipesList.length > 0 ?
        <>
              {/* displaying saved recipes */}
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
        </>
        :
        <>
        <h1 className=' text-wrap text-center ' style={{paddingTop:'25px', paddingBottom:'10px'}}>No Saved Recipes</h1>
        <div className="link-container">
          <a onClick={navigateToRecipesPage} className='text-wrap text-center explore-link' style={{ color: '#8a2c0d', cursor: 'pointer' }}>explore more recipes</a>
        </div>
        </>
      }
      

    </div>
  )
}

export default SavedRecipes