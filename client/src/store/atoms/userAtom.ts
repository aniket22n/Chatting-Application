import { atom } from "recoil";
import { loginResponseType } from "../../Types/zod";

export type UserState = {
  isLoggedin: boolean;
  info: loginResponseType | null;
};

export const userState = atom<UserState>({
  key: "userState",
  default: { isLoggedin: false, info: null },
});
