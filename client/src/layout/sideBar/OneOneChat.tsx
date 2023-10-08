import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Badge,
  Card,
  Box,
  Divider,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Types } from "mongoose";

import { StyledBadge } from "../../components/StyledBadge";
import SearchComponent from "./SearchComponent";
import { friends } from "../../store/selectors/friends";
import { friendsType } from "../../Types/zod";
import { appState } from "../../store/atoms/appStateAtom";
import { userState } from "../../store/atoms/userAtom";
import { chatHistory } from "../../store/atoms/messageState";
import { socket } from "../socket";

const OneOneChat = () => {
  const chatList = useRecoilValue(friends);
  const [appSetting, setAppSetting] = useRecoilState(appState);
  const [user, setUser] = useRecoilState(userState);
  const setChatHistory = useSetRecoilState(chatHistory);
  const theme = useTheme();

  const handleClick = async (Input: {
    id: Types.ObjectId;
    username: string;
    image: string;
    online: boolean;
    unread: number;
    chat_id: Types.ObjectId;
    msg: string;
    time: number;
  }) => {
    // request message history
    const response = await axios.get("http://localhost:3000/chatHistory", {
      params: { id: Input.chat_id },
      withCredentials: true,
    });
    if (response.status === 200) {
      setChatHistory(response.data.response);
    }

    // set unread messages to 0
    if (Input.unread > 0) {
      socket.emit("read", Input.chat_id);

      if (user.info) {
        const updatedFriends = user.info.friends.map((friend) => {
          if (friend.id === Input.id) {
            // Create a new object with the updated online status
            return { ...friend, unread: 0 };
          }
          return friend;
        });
        setUser({
          isLoggedin: user.isLoggedin,
          info: { ...user.info, friends: updatedFriends },
        });
      }
    }

    // select chat
    setAppSetting({
      selectedChat: Input,
      isDrawerOpen: window.innerWidth < 500 ? false : true,
      selectedSideBar: appSetting.selectedSideBar,
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 80px)",
        bgcolor: theme.palette.background.paper,
        boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Stack alignItems={"center"} spacing={2} p={2.5}>
        {/*****************  Header *******************/}
        <SearchComponent />

        <Divider
          sx={{ width: "340px", bgcolor: theme.palette.text.secondary }}
        />

        {/******************* ChatList ****************/}
        <Stack
          sx={{
            flexGrow: 1,
            height: "100%",
            width: "100%",
          }}
        >
          <Typography variant="subtitle2" sx={{ color: "#676767" }}>
            All Chats
          </Typography>
          <SimpleBar
            style={{
              maxHeight: "calc(100vh - 255px )",
            }}
          >
            <Stack spacing={1.5} p={1} pr={2}>
              {/* ChatElement */}
              {chatList &&
                chatList.map((el: friendsType, index: number) => {
                  return (
                    <Button
                      key={index}
                      sx={{
                        borderRadius: "20px",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                      disableRipple
                      onClick={() => handleClick(el)}
                    >
                      <ChatElement Input={el} />
                    </Button>
                  );
                })}
            </Stack>
          </SimpleBar>
        </Stack>
      </Stack>
    </Box>
  );
};

// ***** message and time are hardcoded as of now *************
const ChatElement = ({ Input }: { Input: friendsType }) => {
  const appSetting = useRecoilValue(appState);
  const user = useRecoilValue(userState);
  const theme = useTheme();

  return (
    <Card
      elevation={Input.id == appSetting.selectedChat?.id ? 10 : 4}
      sx={{
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#fff"
            : theme.palette.background.default,
        borderRadius: "20px",
        p: 2,
      }}
    >
      <Stack
        direction={"row"}
        spacing={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          {Input.online || user.info?.id == Input.id ? (
            // StyledBadge from Components
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={Input.image} />
            </StyledBadge>
          ) : (
            <Avatar src={Input.image} />
          )}
          <Stack spacing={0.3} alignItems={"flex-start"}>
            <Typography
              variant="subtitle1"
              sx={{ textTransform: "capitalize" }}
            >
              {Input.username}
            </Typography>
            <Typography
              sx={{
                textTransform: "none",
                color: theme.palette.text.secondary,
                fontSize: "14px",
              }}
            >
              {Input.msg.substring(0, 12) +
                (Input.msg.length > 12 ? "..." : "")}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          spacing={2}
          alignItems={"center"}
          display={Input.time ? "box" : "none"}
        >
          <Typography variant="caption">{formatTime(Input.time)}</Typography>
          <Badge color="primary" badgeContent={Input.unread} />
        </Stack>
      </Stack>
    </Card>
  );
};

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";

  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

export default OneOneChat;
