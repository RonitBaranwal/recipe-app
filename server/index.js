import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {userRouter} from './routes/userRoutes.js'
import { recipesRouter } from './routes/recipesRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

// mongodb+srv://ronitkbaranwal:<db_password>@recipes.laibwcl.mongodb.net/?retryWrites=true&w=majority&appName=recipes

mongoose.connect(
    `mongodb+srv://ronitkbaranwal:${process.env.PASSWORD}@recipes.laibwcl.mongodb.net/recipes?retryWrites=true&w=majority&appName=recipes`
    
);
app.listen(3001, () => console.log("SERVER STARTED! at 3001"));