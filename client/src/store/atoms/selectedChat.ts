import { atom } from "recoil";
import { friendsType } from "../../Types/zod";

export const selectedChat = atom<friendsType | null>({
  key: "thisIskeyForSelectedFriend",
  default: null,
});
