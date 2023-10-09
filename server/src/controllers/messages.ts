import express from "express";

import { auth } from "../middlewares/authenticate";
import { DeleteChat, messageRequestSchema } from "../Types/zod";
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
      .json({ message: "Message history", response: response });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/deleteChatHistroy", auth, async (req, res) => {
  const chat_id = DeleteChat.safeParse(req.query["chat_id"]);
  if (
    !chat_id.success ||
    !mongoose.Types.ObjectId.isValid(chat_id.data.chat_id)
  ) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const chat = await Chat.findByIdAndUpdate(chat_id.data.chat_id, {
      $set: { messages: [], unread: 0, delivery: "none" },
    });
    return res.status(200).json({ message: "Success!" });
  } catch (error: any) {
    return res.status(500).json({ message: "Server error" });
  }
});
export default router;
