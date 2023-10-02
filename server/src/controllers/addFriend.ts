import express from "express";

import { Chat, User } from "../db/models";
import { auth } from "../middlewares/authenticate";
import { addUserSchemaZod, friendsType } from "../Types/zod";

const router = express.Router();

// ********************** addUser route ************************

router.put("/addUser", auth, async (req, res) => {
  const connect_to = addUserSchemaZod.safeParse(req.body);
  if (!connect_to.success) {
    return res.json({ message: connect_to.error });
  }

  // ****** Generate chat id **************
  const newChat = new Chat({
    participants: [connect_to.data.id, req.headers["id"]],
  });
  const chat = await newChat.save();

  // ****** friend id added to friends array
  await User.updateOne(
    { _id: req.headers["id"] },
    {
      $push: {
        friends: { friend_id: connect_to.data.id, chat_id: chat._id },
      },
    }
  );

  if (req.headers["id"]?.toString() !== connect_to.data.id.toString()) {
    // ***** your id added to friend's friends array
    await User.updateOne(
      { _id: connect_to.data.id },
      {
        $push: {
          friends: { friend_id: req.headers["id"], chat_id: chat._id },
        },
      }
    );
  }

  const friend = await User.findOne({ _id: connect_to.data.id });

  if (friend) {
    const response: friendsType = {
      username: friend.username,
      id: friend._id,
      image: friend.image,
      online: friend.online,
      unread: friend.unread,
      chat_id: chat._id,
    };
    return res.status(200).json({
      message: `${friend.username} is added to chat list`,
      addUserResponse: response,
    });
  }
  return res.status(500).json({ message: "Server error" });
});

export default router;
