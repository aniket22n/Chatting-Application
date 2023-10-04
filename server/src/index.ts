import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookeParser from "cookie-parser";

import { dbConnect } from "./db/connection";
import userRouter from "./controllers/user";
import searchRouter from "./controllers/search";
import addFriendRoute from "./controllers/addFriend";
import messageRoute from "./controllers/messages";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./Types/socket";
import { Chat, User } from "./db/models";
import { getFriendsSocketIds, updateUserSocketInfo } from "./socketUtils";
import { chatMessageType } from "./Types/zod";
// ************ instance of express and mounts *******************

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT"],
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
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "http://localhost:5173",
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

      const chat = await Chat.findByIdAndUpdate(chat_id, {
        $push: { messages: newMessage },
      });

      const getReceiver = await User.findById(receiver).select("socket_id");
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
        } else {
          User.findByIdAndUpdate(receiver, {
            unread: getReceiver.unread + 1,
          });
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
