import { RecipeModel } from "../models/Recipes.js";
import express from "express";
import { mongoose } from "mongoose";
import { userModel } from "../models/Users.js";
import { verifyToken } from "./userRoutes.js";

const router = express.Router();

router.get("/", async (req, res) => {
  
  try {
    
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});
router.post("/",verifyToken, async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.json({ response });
  } catch (error) {
    res.send(error);
  }
});
router.put("/",verifyToken, async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeId);
    const user = await userModel.findById(req.body.userId);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
    console.log(user.savedRecipes);
  } catch (error) {
    res.send(error);
  }
});
router.get("/savedRecipes/ids/:id" , async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    
    
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});
router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({savedRecipes})
  } catch (err) {
    res.json(err);
  }
});
export { router as recipesRouter };
