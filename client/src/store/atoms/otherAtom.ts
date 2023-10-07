import { atom } from "recoil";

export const currentChat = atom({
  key: "header",
  default: {
    online: false,
    chat_id: "",
  },
});
