import { atom } from "recoil";

// This atom to select register image based on gender
export const atomImage = atom({
  key: "thisIsKeyForImage",
  default: "female",
});
