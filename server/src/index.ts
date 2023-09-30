import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookeParser from "cookie-parser";

import { dbConnect } from "./db/connection";
import userRouter from "./controllers/user";
import searchRouter from "./controllers/search";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./Types/socket";

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

// *************** socket server on top of http *****************

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

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("hello", (msg) => {
    socket.broadcast.emit("msg", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
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
