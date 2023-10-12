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
  default: {
    theme: localStorage.getItem("theme") === "light" ? Theme.Light : Theme.Dark,
    color:
      localStorage.getItem("color") === "yellow"
        ? Color.Yellow
        : localStorage.getItem("color") === "red"
        ? Color.Red
        : Color.Blue,
  },
});
