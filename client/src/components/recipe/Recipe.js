import React from 'react'
import { useLocation } from 'react-router-dom'

function Recipe() {

  const {state} = useLocation();
  console.log(state)

  return (
    <div>Recipe</div>
  )
}

export default Recipe