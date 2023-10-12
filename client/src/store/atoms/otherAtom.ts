import { atom } from "recoil";

export const currentChat = atom({
  key: "header",
  default: {
    online: false,
    chat_id: "",
  },
});

export const blur = atom({
  key: "blur",
  default: false,
});

export const loadingState = atom({
  key: "isLoading",
  default: false,
});
