import express from "express";
import { User } from "../db/models";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config("../../.env");

const router = express.Router();

const registerZod = z.object({
  username: z.string().min(1).max(15),
  password: z.string().min(4).max(15),
  gender: z.string(),
});

const loginZod = z.object({
  username: z.string().min(1).max(15),
  password: z.string().min(4).max(15),
});

router.post("/register", async (req, res) => {
  const isDataValid = registerZod.safeParse(req.body);
  if (isDataValid.success) {
    const { username, password, gender } = isDataValid.data;
    const isUser = await User.findOne({ username });
    if (isUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const saltRounds = 5;
    bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
      const newUser = new User({
        username,
        password: hashedPassword,
        gender,
      });
      const savedUser = await newUser.save();
      console.log(username, "has joined chatBox");
      return res
        .status(200)
        .json({ message: "You have successfully registered!" });
    });
  } else {
    return res.status(401).json({ message: "Incorrect credentials" });
  }
});

router.post("/login", async (req, res) => {
  const isDataValid = loginZod.safeParse(req.body);
  if (!isDataValid.success) {
    return res.status(401).json({ message: "Incorrect username or password" });
  }

  const { username, password } = isDataValid.data;
  const isUser = await User.findOne({ username });
  if (!isUser) {
    return res.status(404).json({ message: "User not found" });
  }

  bcrypt.compare(password, isUser.password, function (err, result) {
    if (result) {
      // set token as cookie
      const token = jwt.sign({ username }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 * 1000, //valid for 7 days (milliseconds)
        sameSite: "lax",
        secure: false,
      });

      res.status(200).json({ message: "Login successful!" });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  });
});

export default router;
