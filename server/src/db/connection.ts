import mongoose from "mongoose";
import { MONGO_URL } from "../config";

export const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Successfully connected database ");
  } catch (error) {
    console.log("Error connecting database");
  }
};
