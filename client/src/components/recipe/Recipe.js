import React, { useState, useEffect } from 'react';
import './Recipe.css';
import { useLocation } from 'react-router-dom';
import almondPoundCake from '../../imagesOfFoodRecipeApp/almond-pound-cake.avif';
import { CiClock2 } from "react-icons/ci";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from 'axios';

function Recipe() {
  const location = useLocation();
  const { state } = location;

  const { about, ingredients, instructions, publishedDate, title, tags, time, toppings, _id, recipeNotes, bookmarked: initialBookmarked } = state;

  const [servingSize, setServingSize] = useState(1);
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  useEffect(() => {
    // Check local storage for bookmarked status on component mount
    const storedBookmarked = localStorage.getItem(`bookmarked_${title}`);
    if (storedBookmarked !== null) {
      setBookmarked(JSON.parse(storedBookmarked));
    }
  }, [title]);

  const increaseServingSize = () => {
    if (servingSize < 10) {
      setServingSize(servingSize + 1);
    } else {
      setServingSize(10);
    }
  };

  const decreaseServingSize = () => {
    if (servingSize !== 1) {
      setServingSize(servingSize - 1);
    } else {
      setServingSize(1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getBackToRecipesPage = () => {
    window.history.back();
  };

  const updateBookmarkedStatus = async () => {
    try {
      let res = await axios.put(`http://localhost:4000/user-api/bookmarkStatus/${title}`);
      if (res.status === 200) {
        const updatedBookmarked = !bookmarked;
        setBookmarked(updatedBookmarked);
        localStorage.setItem(`bookmarked_${title}`, JSON.stringify(updatedBookmarked));
      }
    } catch (error) {
      console.error('Error updating bookmark status:', error);
    }
  };

  return (
    <div>
      <div>
        <IoMdArrowRoundBack onClick={getBackToRecipesPage} className='getbackicon mx-3 fs-1' />
      </div>
      <div className='container'>
        <div className='img-container'>
          <img src={almondPoundCake} alt={title} style={{ height: "250px", objectFit: "cover" }} />
        </div>

        <div className='recipe-title'>
          <h1>{title}</h1>
        </div>

        <div className='recipe-details'>
          <p className='lead'>{formatDate(publishedDate)}</p>
          <CiClock2 className='icon clockicon' />
          <p className='lead'>{time} min</p>
          <span className='separator'>|</span>
          {
            !bookmarked ?
              <FaRegBookmark className='icon' onClick={updateBookmarkedStatus} />
              :
              <FaBookmark className='icon' onClick={updateBookmarkedStatus} />
          }
        </div>

        <div className='instructions-ingredients d-grid '>
          <div className='instructions '>
            <h3>Instructions</h3>
            <div>
              {instructions.length === 1 ?
                (
                  <>
                    <p className='fw-bold'>{instructions[0].description}</p>
                    <ul className='details-ul '>
                      {instructions[0].details.map((detail, index) => (
                        <li key={index}><p className='text-dark'>{detail}</p></li>
                      ))}
                    </ul>
                  </>
                )
                :
                (
                  <>
                    <ol>
                      {instructions.map((instruction, index) => (
                        <li key={index}>
                          <p className='fw-bold'>{index + 1}. {instruction.description}</p>
                          <ul className='details-ul '>
                            {instruction.details.map((detail, idx) => (
                              <li key={idx}><p className='text-dark'>{detail}</p></li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ol>
                  </>
                )
              }
            </div>

            {recipeNotes.length === 0 ?
              (
                <>
                  {toppings.length !== 0 &&
                    (
                      <>
                        <div className='toppings'>
                          <h3>Toppings :</h3>
                          <ul className='details-ul'>
                            {toppings.map((topping, index) => (
                              <li key={index}><p className='text-dark'>{topping}</p></li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )
                  }
                </>
              )
              :
              (
                <>
                  <p className='fw-bold'>Recipe Notes : </p>
                  <ul className='details-ul '>
                    {recipeNotes.map((note, index) => (
                      <li key={index}><p className='text-dark'>{note}</p></li>
                    ))}
                  </ul>
                </>
              )
            }

          </div>

          <div className='ingredients'>
            <h3>Ingredients</h3>
            <div>
              <p>Serving size:</p>
              <div className=' serving-size-qty  '>
                <p className='fw-bold'>{servingSize}</p>
                <button className='btn ' onClick={increaseServingSize}>+</button>
                <button className='btn ' onClick={decreaseServingSize}>-</button>
              </div>
              {/* display of ingredients */}
              <div className='ingredients-list'>
                {ingredients.map((ingredient, index) => {
                  const quantity = servingSize * ingredient.quantity;
                  return (
                    <p key={index}>
                      {quantity !== 0 ? `${quantity} ${ingredient.name}` : ingredient.name}
                    </p>
                  );
                })}
              </div>

              {/* display of toppings if recipe notes are not null */}
              {recipeNotes.length !== 0 &&
                (
                  <>
                    {toppings.length !== 0 &&
                      (
                        <>
                          <div className='toppings'>
                            <h3>Toppings :</h3>
                            <ul className='details-ul'>
                              {toppings.map((topping, index) => (
                                <li key={index}><p className='text-dark'>{topping}</p></li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )
                    }
                  </>
                )
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
