import express from "express";

import { User } from "../db/models";
import { auth } from "../middlewares/authenticate";
import { searchSchemaZod, searchResponseType } from "../Types/zod";

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

  return res.status(200).json({ message: "User found", response: response });
});

export default router;
