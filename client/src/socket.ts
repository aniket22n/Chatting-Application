import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "./Types/socket";
import { api } from "./path";

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

const connectSocket = (user_id: string) => {
  socket = io(api.baseURL, {
    query: { user_id: user_id },
  });
};

export { socket, connectSocket };
