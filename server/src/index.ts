import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookeParser from "cookie-parser";

import { dbConnect } from "./db/connection";
import userRouter from "./controllers/user";
import searchRouter from "./controllers/search";
import addFriendRoute from "./controllers/addFriend";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./Types/socket";
import { User } from "./db/models";

// ************ instance of express and mounts *******************

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookeParser());
app.use(userRouter);
app.use(searchRouter);
app.use(addFriendRoute);

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

// ******************** socket operations ****************************

io.on("connection", async (socket) => {
  const user_id = socket.handshake.query["user_id"];
  const socket_id = socket.id;

  const this_user = await User.findByIdAndUpdate(user_id, {
    socket_id,
    online: true,
  });
  if (user_id) {
    io.emit("online", user_id.toString(), true);
  }

  socket.on("disconnect", async () => {
    const this_user = await User.findByIdAndUpdate(user_id, {
      socket_id: 0,
      online: false,
    });
    if (user_id) {
      io.emit("online", user_id.toString(), false);
    }
  });
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
