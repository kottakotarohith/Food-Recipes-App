import React, { useEffect, useState } from 'react';
import './recipes.css';
import almondPoundCake from '../../imagesOfFoodRecipeApp/almond-pound-cake.avif';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Recipes() {
  let [recipesList, setRecipesList] = useState([]);
  const navigate = useNavigate();

  const openRecipe = (recipe) => {
    // console.log(recipeTitle);
    const formattedTitle = recipe.title.replace(/ /g, '_'); // Replace spaces with underscores
    navigate(`/recipe/${formattedTitle}`,{state:recipe} );
  };

  const getRecipes = async () => {
    let res = await axios.get('http://localhost:4000/user-api/recipes');
    console.log(res);
    setRecipesList(res.data.payload);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className='container'>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-5'>
        {recipesList.map((recipe) => (
          <div className='col' key={recipe._id}>
            <div className='card'  onClick={() => openRecipe(recipe)} >
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
                <div className='recipe_tags '>
                  {Array.isArray(recipe.tags) ? (
                    recipe.tags.map((tag) => (
                      <span key={recipe._id} className='recipe_tag btn'>
                        {tag}
                      </span>
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
