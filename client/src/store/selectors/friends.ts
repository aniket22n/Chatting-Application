import { selector } from "recoil";
import { user } from "../atoms/user";
import { friendsType } from "../../Types/zod";

export const friends = selector({
  key: "ThisIsFriendsSelectorKey",
  get: ({ get }) => {
    const filter = get(user);
    if (filter) {
      const array: friendsType[] = filter?.friends;
      return array;
    }
  },
});
