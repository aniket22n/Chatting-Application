import { atom } from "recoil";
import { chatMessageType } from "../../Types/zod";

export const chatHistory = atom<chatMessageType[]>({
  key: "messageState",
  default: [],
});
