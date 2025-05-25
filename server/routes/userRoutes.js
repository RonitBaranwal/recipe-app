import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "./../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    
    const { username, password } = req.body;
    const user = await userModel.findOne({ username: username });
    if (user) {
        return res.json({ message: "The user with the username alreaddy exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ username,password: hashedPassword });
    await newUser.save();
    res.json({
        messgage:"The new user saved success!!"
    });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
        return res.json({ message: "The user doesn't exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.json({ message: "usename or password is not correct" });

    }
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
});

export { router as userRouter };

export const verifyToken = (req,res,next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, "secret", (err) => {
            if (err) return res.sendStatus(403);
            next();
        })
    }
    else {
        res.sendStatus(401);
    }
}