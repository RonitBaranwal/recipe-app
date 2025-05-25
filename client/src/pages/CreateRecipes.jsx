import axios from 'axios';
import React, { useState } from 'react'
import { useGetUserId } from '../hooks/useGetUserId';
import {useNavigate} from 'react-router-dom'
export const CreateRecipes = () => {
  
  const userID = useGetUserId();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    cookingTime: 0,
    userOwner:userID,
  });
  
  const navigate=useNavigate()

  const handleChange = (name, value) => {
    setRecipe(prev => ({
        ...prev,
        [name]: value
    }));
  }
  const handleIngredientChange = (e, idx) => {
    e.preventDefault();
    const value = e.target.value;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
    console.log(recipe.ingredients)
  }
  const submitBtnHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipes", recipe);
      alert("recipe created");
      navigate('/');
    } catch (err) {
      console.log(error);
    }
  }
  const addIngredient = (e) => {
    e.preventDefault();
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] })
    console.log(recipe)
  }
  return (
    <div className='create-recipe'>
      <h2>Create Recipe</h2>
      <form
        onSubmit={(e) => {
          submitBtnHandler(e);
        }}
      >
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          onChange={(e) => {
            handleChange("name", e.target.value);
          }}
        />
        <label htmlFor='description'>Description</label>
        <textarea
          name='description'
          id='description'
          onChange={(e) => {
            handleChange("description", e.target.value);
          }}
        ></textarea>
        <label htmlFor='ingredients'>Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input
            key={idx}
            type='text'
            name='ingredients'
            value={ingredient}
            onChange={(e) => handleIngredientChange(e, idx)}
          />
        ))}

        <button type='button' onClick={(e) => addIngredient(e)}>
          Add Ingredients
        </button>
        <label htmlFor='instructions'>Instructions</label>
        <textarea
          name='instructions'
          id='instructions'
          onChange={(e) => {
            handleChange("instructions", e.target.value);
          }}
        ></textarea>
        <label htmlFor='imageUrl'>Iamge URL</label>
        <input
          type='text'
          id='imageUrl'
          name='imageUrl'
          onChange={(e) => {
            handleChange("imageUrl", e.target.value);
          }}
        />
        <label htmlFor='cookingTime'>Cooking Time (minutes)</label>
        <input
          type='number'
          id='cookingTime'
          name='cookingTime'
          onChange={(e) => {
            handleChange("cookingTime", e.target.value);
          }}
        />
        <button type='submit'>Create Recipe</button>
      </form>
    </div>
  );
}
