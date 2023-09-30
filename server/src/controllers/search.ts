import express from "express";

import { User } from "../db/models";
import { auth } from "../middlewares/authenticate";
import {
  searchSchemaZod,
  searchResponseType,
  addUserSchemaZod,
  friendsType,
} from "../Types/zod";

const router = express.Router();

// ********************** search route ************************

router.post("/search", auth, async (req, res) => {
  const isValid = searchSchemaZod.safeParse(req.body);
  if (!isValid.success) {
    return res.json({ message: isValid.error });
  }
  const username = isValid.data.username;

  const isUser = await User.findOne({ username });
  if (!isUser) {
    return res.status(404).json({ message: "User dosen't exists" });
  }

  const response: searchResponseType = {
    username: isUser.username,
    id: isUser._id,
    image: isUser.image,
  };

  return res
    .status(200)
    .json({ message: "User found", searchResponse: response });
});

// ********************** addUser route ************************

router.put("/addUser", auth, async (req, res) => {
  const user = addUserSchemaZod.safeParse(req.body);
  if (!user.success) {
    return res.json({ message: user.error });
  }

  const modified = await User.updateOne(
    { _id: req.headers["id"] },
    {
      $push: {
        friends: user.data.id,
      },
    }
  );

  const friend = await User.findOne({ _id: user.data.id });

  if (friend) {
    const response: friendsType = {
      username: friend.username,
      id: friend._id,
      image: friend.image,
      online: friend.online,
      unread: friend.unread,
    };
    return res.status(200).json({
      message: `${friend.username} is added to chat list`,
      addUserResponse: response,
    });
  }
  return res.status(500).json({ message: "Server error" });
});

export default router;
