import { atom } from "recoil";

export enum Theme {
  Dark = "dark",
  Light = "light",
}

export enum Color {
  Blue = "#0162C4",
  Yellow = "#B78103",
  Red = "#FF4842",
}

export type ToggleThemeState = {
  theme: Theme;
  color: Color;
};

export const themeState = atom<ToggleThemeState>({
  key: "toggleThemeKey",
  default: { theme: Theme.Dark, color: Color.Blue },
});
