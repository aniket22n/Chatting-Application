import mongoose from "mongoose";

export interface ServerToClientEvents {
  online: (id: string, online: boolean) => void;
  message: (
    sender: mongoose.Types.ObjectId,
    receiver: mongoose.Types.ObjectId,
    time: number,
    message: string,
    chat_id: mongoose.Types.ObjectId
  ) => void;
}

export interface ClientToServerEvents {
  connect: (id: string) => void;
  message: (
    sender: mongoose.Types.ObjectId,
    receiver: mongoose.Types.ObjectId,
    time: number,
    message: string,
    chat_id: mongoose.Types.ObjectId
  ) => void;
  read: (chatId: mongoose.Types.ObjectId) => void;
}
