import React from 'react';
import './App.css';
import { createBrowserRouter , RouterProvider} from 'react-router-dom'

import RootLayout from './RootLayout';
import Home from './components/home/Home';
import Recipes from './components/recipes/Recipes';

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
          path:"/recipes",
          element:<Recipes/>
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
