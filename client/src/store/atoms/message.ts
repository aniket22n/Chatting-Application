import { atom } from "recoil";
import { chatMessagesType } from "../../Types/zod";

export const message_input = atom({
  key: "ThisIsKeyFOrMessage",
  default: "",
});

export const messages = atom<chatMessagesType[]>({
  key: "ThisIsKeyForMessges",
  default: [],
});
