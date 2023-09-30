import { atom } from "recoil";
import { loginResponseType } from "../../zod/zod";

export const user = atom<loginResponseType | null>({
  key: "ThisIsUserKey",
  default: null,
});
