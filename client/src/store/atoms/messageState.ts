import { atom } from "recoil";
import { chatMessagesType } from "../../Types/zod";

export const chatHistory = atom<chatMessagesType[]>({
  key: "messageState",
  default: [],
});
