import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../Types/socket";

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

const connectSocket = (user_id: string) => {
  socket = io("http://localhost:3000", {
    query: { user_id: user_id },
  });
};

export { socket, connectSocket };
