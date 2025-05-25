import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId";
import { useCookies } from "react-cookie";
export const SavedRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies,_]=useCookies(["access_token"])
  
  const userId = useGetUserId();
  useEffect(() => {
    
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userId}`
        , {
        headers:{authorization:cookies.access_token}
      });
        console.log(response.data);
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchSavedRecipes();
  }, []);
  
  
  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              
            </div>
            <div className='instructions'>
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt='recipe.name' />
            <p>Cooking Time: {recipe.cookingTime} (in minutes)</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
