import React from 'react';
import './App.css';
import { createBrowserRouter , RouterProvider} from 'react-router-dom'

import RootLayout from './RootLayout';
import Home from './components/home/Home';
import Recipes from './components/recipes/Recipes';
import Recipe from './components/recipe/Recipe';
import About from './components/about/About';
import Login from './components/login/Login';


function App() {

  let router = createBrowserRouter([
    
    {
      path: '',
      element: <RootLayout/>,
      children:[
        {
          path: "",
          element: <Home/>
        },
        {
          path:"/home",
          element:<Home/>
        },
        {
          path:"/about",
          element:<About/>
        },
        {
          path:"/recipes",
          element:<Recipes/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path : `/recipe/:recipeTitle`,
          element: <Recipe/>
        }
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
