import React, { useState } from 'react';
import './Recipe.css';
import { useLocation, useSearchParams } from 'react-router-dom';
import almondPoundCake from '../../imagesOfFoodRecipeApp/almond-pound-cake.avif';
import { CiClock2 } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";

function Recipe() {
  const location = useLocation();
  const { state } = location;
  const { about, ingredients, instructions, publishedDate, title, tags, time, toppings, _id } = state;
  // console.log(instructions[0])

  const [servingSize, setServingSize] = useState(1);
  const increaseServingSize = ()=>{
    if(servingSize<10){
      setServingSize(servingSize+1);
    }else{
      setServingSize(10);
    }
  }
  const decreaseServingSize = ()=>{
    if(servingSize!=0){
      setServingSize(servingSize-1);
    }else{
      setServingSize(0);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className='container'>
      <div className='img-container'>
        <img src={almondPoundCake} alt={title} style={{ height: "250px", objectFit: "cover" }}  />
      </div>

      <div className='recipe-title'>
        <h1>{title}</h1>
      </div>

      <div className='recipe-details'>
        <p className='lead'>{formatDate(publishedDate)}</p>
        <CiClock2 className='icon clockicon' />
        <p className='lead'>{time} min</p>
        <span className='separator'>|</span>
        <CiBookmark className='icon' />
      </div>


      <div className='instructions-ingredients d-grid '>

        <div className='instructions ' >
        <h3>Instructions</h3>
         <div>
          {instructions.length === 1 ?
            (
              <>
                <p className='fw-bold'>{instructions[0].description}</p>
                <ul className='details-ul '>
                  {instructions[0].details.map((detail)=>(
                    <li><p className='text-dark'>{detail}</p></li>
                  ))}
                </ul>
              </>
            )
            :
            (
                <>
                  <ol>
                    {instructions.map((instruction, index) => (
                      <li>
                        <p className='fw-bold'>{index + 1}. {instruction.description}</p>
                        <ul className='details-ul '>
                          {instruction.details.map((detail)=>(
                            <li><p className='text-dark'>{detail}</p></li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                </>
            )
          }
         </div>

        {toppings.length!=0 ?
          (
            <>
              <div className='toppings'>
                <h3>Toppings :</h3>
                <ul className='details-ul'>
                  {toppings.map((topping)=>(
                    <li><p className='text-dark'>{topping}</p></li>
                    ))}
                    </ul>
              </div>
            </>
          )
          :
          <>
          </>
        }

        </div>

        <div className='ingredients'>
          <h3>Ingredients</h3>
          <div>

            <p>Serving size:</p>
            <div className=' serving-size-qty  '>
              <p className='fw-bold'>{servingSize}</p>
              <button className='btn ' onClick={()=>{increaseServingSize()}}>+</button>
              <button className='btn ' onClick={()=>{decreaseServingSize()}}>-</button>
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

          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
