import { z } from "zod";
import mongoose from "mongoose";

//****************** register ******************

export const registerSchemaZod = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(15, { message: "Username can be at most 15 characters long" }),
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Invalid email format" }),
  image: z.string(), //  Base64 format
  online: z.boolean().default(false),
  friends: z.array(
    z.object({
      friend_id: z.custom<mongoose.Types.ObjectId>(),
      chat_id: z.custom<mongoose.Types.ObjectId>(),
    })
  ),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" })
    .max(15, { message: "Password can be at most 15 characters long" }),
});

export type registerType = z.infer<typeof registerSchemaZod>;

//****************** login ******************

export const loginSchemaZod = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .max(15, { message: "Username can be at most 15 characters long" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" })
    .max(15, { message: "Password can be at most 15 characters long" }),
});

export type loginType = z.infer<typeof loginSchemaZod>;

export const friends = z.object({
  id: z.custom<mongoose.Types.ObjectId>(),
  username: z
    .string()
    .min(1, "Username is required")
    .max(15, { message: "Username can be at most 15 characters long" }),
  image: z.string(), //  Base64 format
  online: z.boolean().default(false),
  unread: z.number().default(0),
  chat_id: z.custom<mongoose.Types.ObjectId>(),
  msg: z.string(),
  time: z.number(),
});
export type friendsType = z.infer<typeof friends>;

export const loginResponseZod = z.object({
  id: z.custom<mongoose.Types.ObjectId>(),
  username: z
    .string()
    .min(1, "Username is required")
    .max(15, { message: "Username can be at most 15 characters long" }),
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Invalid email format" }),
  image: z.string(), //  Base64 format
  friends: z.array(friends),
});
export type loginResponseType = z.infer<typeof loginResponseZod>;

//****************** message ******************
export const chatParticipantSchema = z.object({
  user: z.custom<mongoose.Types.ObjectId>(), // Mongoose ObjectId
});

export const chatMessageSchema = z.object({
  content: z.string().min(1, { message: "Message content is required" }),
  timestamp: z.number().default(0),
  sender: z.custom<mongoose.Types.ObjectId>(), // Mongoose ObjectId
  receiver: z.custom<mongoose.Types.ObjectId>(), // Mongoose ObjectId
});

export type chatMessageType = z.infer<typeof chatMessageSchema>;

export const chatSchemaZod = z.object({
  participants: z
    .array(chatParticipantSchema)
    .min(2, { message: "At least 2 participants are required" }),
  unread: z.number().default(0),
  messages: z.array(chatMessageSchema),
});

export const messageRequestSchema = z.object({
  id: z.custom<mongoose.Types.ObjectId>(),
});

//****************** search username ******************

export const searchSchemaZod = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(15, { message: "Username can be at most 15 characters long" }),
});

export type searchType = z.infer<typeof searchSchemaZod>;

export const searchResponseSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(15, { message: "Username can be at most 15 characters long" }),
  id: z.custom<mongoose.Types.ObjectId>(),
  image: z.string(), //  Base64 format
});

export type searchResponseType = z.infer<typeof searchResponseSchema>;

//****************** Add user ******************

export const addUserSchemaZod = z.object({
  id: z.custom<mongoose.Types.ObjectId>(),
});

// ******************* delete chat *******************

export const DeleteChat = z.object({
  chat_id: z.custom<mongoose.Types.ObjectId>(),
});
