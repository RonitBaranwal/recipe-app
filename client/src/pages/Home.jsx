import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId";
import { useCookies } from "react-cookie";
export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");

        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userId}`
        );
        console.log(response.data);
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipe();
    if (cookies.access_token) fetchSavedRecipes();
  }, []);
  const saveRecipe = async (recipeId) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
        {
          recipeId,
          userId,
        },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };
  const isRecipeSaved = (id) => {
    return savedRecipes.includes(id);
  };
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              {
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "saved" : "save"}
                </button>
              }
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
