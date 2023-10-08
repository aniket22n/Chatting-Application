import { selector } from "recoil";
import { userState } from "../atoms/userAtom";
import { friendsType } from "../../Types/zod";

export const friends = selector<friendsType[]>({
  key: "ThisIsFriendsSelectorKey",
  get: ({ get }) => {
    let user = get(userState);
    if (user.info) {
      // sort array of friends based on time property
      const sortedFriends = [...user.info.friends].sort(
        (e1, e2) => e2.time - e1.time
      );
      return sortedFriends;
    }

    return [];
  },
});
