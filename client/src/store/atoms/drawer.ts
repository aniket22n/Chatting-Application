import { atom } from "recoil";

export const openDrawer = atom<boolean>({
  key: "thisIsKeyForDrawer",
  default: window.innerWidth < 900 ? false : true,
});
