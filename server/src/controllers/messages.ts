import express from "express";

import { auth } from "../middlewares/authenticate";
import { messageRequestSchema } from "../Types/zod";
import { Chat } from "../db/models";
import mongoose from "mongoose";

const router = express.Router();

router.get("/chatHistory", auth, async (req, res) => {
  const msg = messageRequestSchema.safeParse(req.query);

  if (!msg.success || !mongoose.Types.ObjectId.isValid(msg.data.id)) {
    return res.status(400).json({ message: "Wrong input" });
  }
  const id = msg.data.id;

  try {
    const chat = await Chat.findById(id).select("messages");

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const response = chat.messages;
    return res
      .status(200)
      .json({ message: "Message history", messages: response });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
