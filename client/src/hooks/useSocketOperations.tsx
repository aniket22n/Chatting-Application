import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";

import { connectSocket, socket } from "../socket";
import { appState } from "../store/atoms/appStateAtom";
import { userState } from "../store/atoms/userAtom";
import { chatHistory } from "../store/atoms/messageState";

const useSocketOperations = () => {
  const [appSetting, setAppSetting] = useRecoilState(appState);
  const [user, setUser] = useRecoilState(userState);
  const setMessages = useSetRecoilState(chatHistory);

  useEffect(() => {
    let cleanupFunction: (() => void) | undefined; // Specify the type

    if (user.isLoggedin && user.info) {
      if (!socket && user.info) {
        connectSocket(user.info.id.toString());
      }

      // ************************* Update online status *************************
      socket.on("online", (id, online) => {
        if (user.info) {
          const updatedFriends = user.info?.friends.map((friend) => {
            if (friend.id.toString() === id) {
              return { ...friend, online: online };
            }
            return friend;
          });
          setUser({
            ...user,
            info: { ...user.info, friends: updatedFriends },
          });
          if (appSetting.selectedChat?.id.toString() == id) {
            setAppSetting({
              ...appSetting,
              selectedChat: { ...appSetting.selectedChat, online: online },
            });
          }
        }
      });

      // ************************* receive messages *****************************
      socket.on("message", (sender, receiver, time, message, chat_id) => {
        const isChatSelected = chat_id === appSetting.selectedChat?.chat_id;

        // add message to message History
        if (isChatSelected) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              content: message,
              timestamp: time,
              sender,
              receiver,
            },
          ]);
        }
        // message received notification
        if (user.info) {
          const updatedFriends = user.info?.friends.map((friend) => {
            if (friend.id === sender) {
              return {
                ...friend,
                unread: isChatSelected ? 0 : friend.unread + 1,
                msg: message,
                time: time,
              };
            }
            return friend;
          });
          setUser({
            ...user,
            info: { ...user.info, friends: updatedFriends },
          });
        }
      });

      // Defined the cleanup function to remove event listeners
      cleanupFunction = () => {
        socket.off("online"); // Remove the "online" event listener
        socket.off("message"); // Remove the "message" event listener
      };
    }

    // Return the cleanup function to ensure proper cleanup
    return () => {
      if (cleanupFunction) {
        cleanupFunction();
      }
    };
  }, [
    user.isLoggedin,
    user.info,
    socket,
    appSetting.selectedChat,
    setMessages,
  ]);

  return null;
};
export default useSocketOperations;
