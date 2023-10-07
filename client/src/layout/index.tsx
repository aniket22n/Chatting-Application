import { useTheme } from "@mui/material/styles";
import { Box, CssBaseline, Drawer, Stack } from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { connectSocket, socket } from "./socket";
import TopBar from "./topBar/TopBar";
import OneOneChat from "./sideBar/OneOneChat";
import Chat from "./conversation/index";
import GroupChat from "./sideBar/GroupChat";
import { appState } from "../store/atoms/appStateAtom";
import { userState } from "../store/atoms/userAtom";
import { Main } from "../components/customDrawer";
import { getResponse } from "./isLoggedin";
import { chatHistory } from "../store/atoms/messageState";

const Layout = () => {
  const redirect = useNavigate();
  const theme = useTheme();

  const [appSetting, setAppSetting] = useRecoilState(appState);
  const [user, setUser] = useRecoilState(userState);
  const setMessages = useSetRecoilState(chatHistory);

  // *************** check if user loggedin **************
  useEffect(() => {
    getResponse(setUser, redirect);
  }, []);

  // ************************* socket operations *************************
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

      // Define the cleanup function to remove event listeners
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

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: theme.palette.background.default,
      }}
    >
      <Stack>
        {/****************  TopBar *********************/}
        <TopBar />

        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Drawer
            sx={{
              width: 360,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: 360,
                height: "calc(100vh - 80px)",
                marginTop: "80px",
              },
            }}
            variant="persistent"
            anchor="left"
            open={appSetting.isDrawerOpen}
          >
            {/******************* SideBar ******************/}
            {appSetting.selectedSideBar == "one-one" ? (
              <OneOneChat />
            ) : (
              <GroupChat />
            )}
          </Drawer>

          <Main
            open={appSetting.isDrawerOpen}
            sx={{
              width: appSetting.isDrawerOpen ? "calc(100vw - 360px)" : "100%",
            }}
          >
            <Chat />
          </Main>
        </Box>
      </Stack>
    </Box>
  );
};
export default Layout;
