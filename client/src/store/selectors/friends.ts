import { selector } from "recoil";
import { userState } from "../atoms/userAtom";
import { friendsType } from "../../Types/zod";

export const friends = selector<friendsType[]>({
  key: "ThisIsFriendsSelectorKey",
  get: ({ get }) => {
    const user = get(userState);
    if (user.info) return user.info.friends;
    return [];
  },
});
