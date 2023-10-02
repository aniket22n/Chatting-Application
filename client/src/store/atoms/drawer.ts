import { atom } from "recoil";

export const openDrawer = atom<boolean>({
  key: "thisIsKeyForDrawer",
  default: true,
});
