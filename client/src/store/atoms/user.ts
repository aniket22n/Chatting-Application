import { atom } from "recoil";
import { loginResponseType } from "../../Types/zod";

export const user = atom<loginResponseType | null>({
  key: "ThisIsUserKey",
  default: null,
});

export const isLoggedin = atom({
  key: "isLoggedInKey",
  default: false,
});
