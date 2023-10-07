import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

require("dotenv").config("../../.env");

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies["token"] == undefined) {
    return res
      .status(401)
      .json({ message: "Unauthorized, please login or signup" });
  }

  const token: string = req.cookies["token"];

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized, please login or signup" });
    }
    if (!decoded || typeof decoded === "string") {
      return res
        .status(401)
        .json({ message: "Unauthorized, please login or signup" });
    }

    req.headers["username"] = decoded.username;
    req.headers["id"] = decoded.id;
    next();
  });
};
