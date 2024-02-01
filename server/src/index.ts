import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookeParser from "cookie-parser";

import { dbConnect } from "./db/connection";
import userRouter from "./controllers/user";
import searchRouter from "./controllers/search";
import addFriendRoute from "./controllers/updateUser";
import messageRoute from "./controllers/messages";
import { ClientToServerEvents, ServerToClientEvents } from "./Types/socket";
import { Chat, User } from "./db/models";
import { getFriendsSocketIds, updateUserSocketInfo } from "./socketUtils";
import { chatMessageType } from "./Types/zod";
require("dotenv").config("../.env");

// ************ instance of express and mounts *******************

const app = express();
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(cookeParser());
app.use(userRouter);
app.use(searchRouter);
app.use(addFriendRoute);
app.use(messageRoute);

// *************** mount socket server on top of http *****************

const server = http.createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: process.env.ORIGIN,
    credentials: true,
  },
});

// ******************** socket operations *************************

let connectedSockets: string[] = [];

io.on("connection", async (socket) => {
  const user_id = socket.handshake.query["user_id"];

  if (typeof user_id == "string") {
    const socket_id = socket.id;

    //************************* online true ***********************
    connectedSockets.push(socket_id);
    updateUserSocketInfo(user_id, socket_id, true);

    const socketIds = await getFriendsSocketIds(user_id);
    socketIds.forEach((socket_id) => {
      if (socket_id && connectedSockets.includes(socket_id)) {
        io.to(socket_id).emit("online", user_id, true);
      }
    });

    // ********************** message *****************************

    socket.on("message", async (sender, receiver, time, message, chat_id) => {
      const newMessage: chatMessageType = {
        content: message,
        timestamp: time,
        sender: sender,
        receiver: receiver,
      };

      // store newMessage in chatHistory and increment unread by 1
      const chat = await Chat.findByIdAndUpdate(chat_id, {
        $push: { messages: newMessage },
        $inc: { unread: 1 },
        $set: { delivery: "delivered" },
      });

      if (sender != receiver) {
        const getReceiver = await User.findById(receiver).select("socket_id");

        // emit message to receiver, if receiver online
        if (getReceiver) {
          if (connectedSockets.includes(getReceiver.socket_id)) {
            io.to(getReceiver.socket_id).emit(
              "message",
              sender,
              receiver,
              time,
              message,
              chat_id
            );
          }
        }
      }
    });

    // *********** update unread if message is read by receiver *****************
    socket.on("read", async (chat_id) => {
      const updatedChat = await Chat.findByIdAndUpdate(
        chat_id,
        { $set: { unread: 0, delivery: "read" } },
        { new: true }
      );
      // ********* notify sender that receiver read message ****************
      if (updatedChat && updatedChat.messages.length > 0) {
        const sender_id =
          updatedChat.messages[updatedChat.messages.length - 1].sender;
        const sender = await User.findById(sender_id).select("socket_id");
        if (sender) {
          if (connectedSockets.includes(sender.socket_id)) {
            io.to(sender.socket_id).emit(
              "delivery",
              updatedChat.messages[updatedChat.messages.length - 1].receiver
            );
          }
        }
      }
    });

    socket.on("disconnect", async () => {
      //************************* online false **********************
      connectedSockets = connectedSockets.filter((id) => id != socket_id);
      updateUserSocketInfo(user_id, socket_id, false);

      const socketIds = await getFriendsSocketIds(user_id);
      socketIds.forEach((socket_id) => {
        if (socket_id && connectedSockets.includes(socket_id)) {
          io.to(socket_id).emit("online", user_id, false);
        }
      });
    });
  }
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Invalid route. Page not found." });
});

dbConnect()
  .then(() => {
    try {
      server.listen(3000, () => {
        console.log("Socket.io server is running on http://localhost:3000");
      });
    } catch (error) {
      console.log("Can't connect to server");
    }
  })
  .catch((error) => {
    console.log("Invalid DB connection");
  });
