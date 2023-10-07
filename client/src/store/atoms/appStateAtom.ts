import { atom } from "recoil";

import { friendsType } from "../../Types/zod";

type AppState = {
  isDrawerOpen: boolean;
  selectedChat: friendsType | null;
  selectedSideBar: "one-one" | "group";
};

export const appState = atom<AppState>({
  key: "appState",
  default: {
    isDrawerOpen: true,
    selectedChat: null,
    selectedSideBar: "one-one",
  },
});
