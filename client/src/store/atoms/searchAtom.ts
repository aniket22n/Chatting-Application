import { atom } from "recoil";
import { searchResponseType } from "../../Types/zod";

type SearchState = {
  input: string;
  response: searchResponseType | null;
};

export const searchState = atom<SearchState>({
  key: "searchUserKey",
  default: {
    input: "",
    response: null,
  },
});
