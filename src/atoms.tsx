import { atom } from "recoil";

export const keywordState = atom<string>({
  key: "keyword",
  default: "",
});
