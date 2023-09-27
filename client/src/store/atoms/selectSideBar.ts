import { atom } from "recoil";

export const selectSideBar = atom<"one-one" | "group">({
  key: "thisIsKeyForSelectSideBar",
  default: "one-one",
});
