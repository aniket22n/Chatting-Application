import { User } from "./db/models";

async function getFriendsSocketIds(id: string) {
  const this_user = await User.findById(id);
  const friends = [];

  if (this_user) {
    for (const friend of this_user.friends) {
      const getSocket = await User.findById(friend.friend_id).select(
        "socket_id"
      );
      const socket_id = getSocket?.socket_id;
      friends.push(socket_id);
    }
  }

  return friends;
}

const updateUserSocketInfo = async (
  user_id: string,
  socket_id: string,
  isOnline: boolean
) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      {
        socket_id,
        online: isOnline,
      },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.error("Error updating user socket info:", error);
    throw error;
  }
};

export { updateUserSocketInfo, getFriendsSocketIds };
