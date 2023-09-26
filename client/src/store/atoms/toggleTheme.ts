import { atom } from "recoil";

export const toggleTheme = atom<"dark" | "light">({
  key: "toggleThemeKey",
  default: "dark",
});

export const toggleColor = atom<"#0162C4" | "#B78103" | "#FF4842">({
  key: "toggleColorKey",
  default: "#0162C4",
});
