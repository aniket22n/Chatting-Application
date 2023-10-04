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

import { StyledBadge } from "../../components/StyledBadge";
import SearchComponent from "./SearchComponent";
import { friends } from "../../store/selectors/friends";
import { friendsType } from "../../Types/zod";
import { selectedChat } from "../../store/atoms/selectedChat";
import { openDrawer } from "../../store/atoms/drawer";
import { user } from "../../store/atoms/user";
import { messages } from "../../store/atoms/message";

// ***** message and time are hardcoded as of now *************
const ChatElement = ({ Input }: { Input: friendsType }) => {
  const [chat, setChat] = useRecoilState(selectedChat);
  const setDrawer = useSetRecoilState(openDrawer);
  const userState = useRecoilValue(user);
  const setMessages = useSetRecoilState(messages);
  const theme = useTheme();

  const handleClick = async () => {
    setChat(Input);
    setDrawer(window.innerWidth < 500 ? false : true);

    try {
      const response = await axios.get("http://localhost:3000/chatHistory", {
        params: { id: Input.chat_id },
        withCredentials: true,
      });

      if (response.status === 200) {
        setMessages(response.data.messages);
      }
    } catch (error: any) {
      console.error("Error fetching chat history:", error);
    }
  };

  return (
    <Button
      sx={{
        borderRadius: "20px",
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
      disableRipple
      onClick={handleClick}
    >
      <Card
        elevation={Input.id == chat?.id ? 10 : 4}
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
            {Input.online || userState?.id == Input.id ? (
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
            <Stack spacing={0.3}>
              <Typography variant="subtitle1">{Input.username}</Typography>
              <Typography variant="caption">
                "start chatting"
                {/* {Input.msg.substring(0, 25) +
                (Input.msg.length > 25 ? " ..." : "")} */}
              </Typography>
            </Stack>
          </Stack>
          <Stack spacing={2} alignItems={"center"}>
            <Typography sx={{ fontWeight: 600 }}>00</Typography>
            <Badge color="primary" badgeContent={Input.unread} />
          </Stack>
        </Stack>
      </Card>
    </Button>
  );
};

const OneOneChat = () => {
  const chatList = useRecoilValue(friends);
  const theme = useTheme();

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
                  return <ChatElement key={index} Input={el} />;
                })}
            </Stack>
          </SimpleBar>
        </Stack>
      </Stack>
    </Box>
  );
};

export default OneOneChat;
