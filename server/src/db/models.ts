import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  online: { type: Boolean, default: false, required: true },
  friends: [
    {
      friend_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      chat_id: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    },
  ],
  password: { type: String, required: true },
  passwordResetToken: String,
  passwordResetTokenExpiration: String,
  socket_id: { type: String, default: "" },
});

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  // to notify receiver, there is a new message
  unread: { type: Number, default: 0, required: true },

  // to notify sender, their message is seen or not
  delivery: {
    type: String,
    enum: ["delivered", "read", "none"],
    default: "none",
    required: true,
  },
  messages: [
    {
      content: { type: String, required: true },
      timestamp: { type: Number, default: 0 },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
});

export const User = mongoose.model("User", userSchema);
export const Chat = mongoose.model("Chat", chatSchema);
