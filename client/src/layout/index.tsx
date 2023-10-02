import { useTheme } from "@mui/material/styles";
import { Box, CssBaseline, Drawer, Stack, Typography } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import TopBar from "./topBar/TopBar";
import OneOneChat from "./sideBar/OneOneChat";
import Chat from "./conversation/index";
import GroupChat from "./sideBar/GroupChat";
import { selectSideBar } from "../store/atoms/selectSideBar";
import { openDrawer } from "../store/atoms/drawer";
import { isLoggedin, user } from "../store/atoms/user";
import { Main } from "../components/customDrawer";
import { selectedChat } from "../store/atoms/selectedChat";
import { getResponse } from "./isLoggedin";
import { connectSocket, socket } from "./socket";

const Layout = () => {
  const redirect = useNavigate();
  const theme = useTheme();
  const sideBar = useRecoilValue(selectSideBar);
  const open = useRecoilValue(openDrawer);
  const chat = useRecoilValue(selectedChat);
  const [userState, setUserState] = useRecoilState(user);
  const [login, setLogin] = useRecoilState(isLoggedin);

  // *************** check if user loggedin **************
  useEffect(() => {
    getResponse(setLogin, setUserState, redirect);
  }, []);

  useEffect(() => {
    if (login && userState) {
      if (!socket) {
        connectSocket(userState.id.toString());
      }
      // ************************* socket operations *************************

      socket.on("online", (id, online) => {
        // Map over the userState.friends array and create a new array with updated friends
        const updatedFriends = userState.friends.map((friend) => {
          // Check if the friend's ID matches the ID received in the event
          if (friend.id.toString() === id) {
            // Create a new object with the updated online status
            return { ...friend, online: online };
          }
          // Return the friend object as is (unchanged)
          return friend;
        });

        // Update the userState with the updated friends array
        setUserState({ ...userState, friends: updatedFriends });

        // Log the updated userState (for debugging purposes)
        console.log(userState);
      });
    }
  }, [login, socket]);

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
              width: 400,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: 400,
                height: "calc(100vh - 80px)",
                marginTop: "80px",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            {/******************* SideBar ******************/}
            {sideBar == "one-one" ? <OneOneChat /> : <GroupChat />}
          </Drawer>

          <Main
            open={open}
            sx={{ width: open ? "calc(100vw - 400px)" : "100%" }}
          >
            {/****************** Conversation **************/}

            {chat ? (
              <Chat />
            ) : (
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ height: "calc(100vh - 80px)", width: "100%" }}
              >
                <Typography variant="h2">Select chat</Typography>
              </Stack>
            )}
          </Main>
        </Box>
      </Stack>
    </Box>
  );
};
export default Layout;
