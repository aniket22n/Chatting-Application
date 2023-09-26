import { atom } from "recoil";

interface MessageData {
  send: string;
  receive: string[];
}

export const atomMessage = atom<MessageData>({
  key: "thisIsKeyForMessage",
  default: {
    send: "",
    receive: [],
  },
});
