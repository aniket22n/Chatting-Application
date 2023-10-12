import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  loginSchemaZod,
  registerSchemaZod,
  loginResponseType,
  friendsType,
} from "../Types/zod";
import { Chat, User } from "../db/models";
import { auth } from "../middlewares/authenticate";
require("dotenv").config("../../.env");
import { JWT_SECRET } from "../config";

const router = express.Router();

// ***************************** Register route  ************************************
router.post("/register", async (req, res) => {
  const isDataValid = registerSchemaZod.safeParse(req.body);
  if (isDataValid.success) {
    const userData = isDataValid.data;
    const isUser = await User.findOne({ username: userData.username });
    if (isUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const saltRounds = 5;
    bcrypt.hash(
      userData.password,
      saltRounds,
      async (error, hashedPassword) => {
        const newUser = new User({
          ...userData,
          password: hashedPassword,
        });
        const savedUser = await newUser.save();
        console.log(newUser.username, " joined Goose");
        return res
          .status(200)
          .json({ message: "You have successfully registered!" });
      }
    );
  } else {
    return res.status(401).json({ message: "Incorrect credentials" });
  }
});

// ***************************** Login route  ************************************
router.post("/login", async (req, res) => {
  const isDataValid = loginSchemaZod.safeParse(req.body);
  if (!isDataValid.success) {
    return res.status(401).json({ message: "Incorrect username or password" });
  }

  const { username, password } = isDataValid.data;
  const isUser = await User.findOne({ username });
  if (!isUser) {
    return res.status(404).json({ message: "User not found" });
  }

  bcrypt.compare(password, isUser.password, async function (err, result) {
    if (result) {
      // set token as cookie
      const token = jwt.sign({ username, id: isUser._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 * 1000, //valid for 7 days (milliseconds)
        sameSite: "lax",
        secure: false,
      });

      const response = await getResponse(isUser.username);

      res
        .status(200)
        .json({ message: "Login successful!", response: response });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  });
});

// ***************************** logout route ************************************
router.get("/logout", auth, (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    maxAge: 0, //valid for 7 days (milliseconds)
    sameSite: "lax",
    secure: false,
  });
  return res.status(200).json({ message: "Successfully logged out!" });
});

// ***************************** isLoggedin route ************************************
router.get("/isLoggedin", auth, async (req, res) => {
  const username = req.headers["username"];
  if (typeof username === "string") {
    const response = await getResponse(username);

    res.status(200).json({ message: "loggedin", response: response });
  }
});

// ***************************** function to get response ************************************
async function getResponse(
  username: string
): Promise<loginResponseType | undefined> {
  const isUser = await User.findOne({ username });
  if (isUser) {
    const friends: friendsType[] = (
      await Promise.all(
        isUser.friends.map(async (id) => {
          // get user info
          const friend = await User.findOne({ _id: id.friend_id });

          // get unread messages count, last message and last message time
          const chat = await Chat.findById(id.chat_id);

          if (friend && chat) {
            let msg = "say hello...";
            let time = 0;
            let unread = 0;
            let delivery = chat.delivery;
            if (chat.messages.length !== 0) {
              const lastMessage = chat.messages[chat.messages.length - 1];
              msg = lastMessage.content;
              time = lastMessage.timestamp;
              if (!lastMessage.sender.equals(isUser._id)) {
                unread = chat.unread;
                delivery = "none";
              }
            }
            return {
              username: friend.username,
              image: friend.image,
              online: friend.online,
              id: friend._id,
              chat_id: id.chat_id,
              delivery: delivery,
              msg: msg,
              unread: unread,
              time: time,
            };
          }
        })
      )
    ).filter((friend) => friend !== undefined) as friendsType[];

    const response: loginResponseType = {
      id: isUser._id,
      username: isUser.username,
      email: isUser.email,
      image: isUser.image,
      friends: friends,
    };
    return response;
  }
}
export default router;
