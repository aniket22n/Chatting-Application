import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import { Smiley, TelegramLogo } from "phosphor-react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { socket } from "../socket";
import { user } from "../../store/atoms/user";
import { selectedChat } from "../../store/atoms/selectedChat";
import { useState } from "react";
import { messages } from "../../store/atoms/message";
import { chatMessagesType } from "../../Types/zod";

const StyledInput = styled(TextField)(({}) => ({
  "& .MuiInputBase-input": {
    padding: "14px",
  },
}));

const Footer = () => {
  const theme = useTheme();
  const [input, setInput] = useState("");
  const [userState, setUserState] = useRecoilState(user);
  const selected = useRecoilValue(selectedChat);
  const setMessages = useSetRecoilState(messages);

  const handleSendMessage = () => {
    const time = Date.now();

    if (userState && selected) {
      if (input) {
        const newMessage: chatMessagesType = {
          content: input,
          timestamp: time,
          sender: userState.id,
          receiver: selected.id,
        };

        socket.emit(
          "message",
          userState.id,
          selected.id,
          time,
          input,
          selected.chat_id
        );
        setMessages((pre) => [...pre, newMessage]);
      }

      socket.on("message", (sender, receiver, time, message, chat_id) => {
        if (chat_id === selected.chat_id) {
          setMessages((pre) => [
            ...pre,
            { content: message, timestamp: time, sender, receiver },
          ]);
        }
      });
    }

    if (userState) {
      socket.on("message", (sender, receiver, time, message, chat_id) => {
        if (selected?.chat_id !== chat_id) {
          const updatedFriends = userState.friends.map((friend) => {
            if (friend.id === receiver) {
              // Create a new object with the updated online status
              return { ...friend, unread: friend.unread + 1 };
            }
            return friend;
          });
          setUserState({ ...userState, friends: updatedFriends });
        }
      });
    }
    setInput("");
  };

  return (
    <Box
      sx={{
        marginLeft: "5px",
        p: 2,
        width: "100vw - 10px",
        height: "80px",
        bgcolor: theme.palette.background.default,
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <StyledInput
          id="message-input"
          placeholder="write a message..."
          fullWidth
          value={input}
          variant="filled"
          autoComplete="off"
          InputProps={{
            disableUnderline: true,
            // Attachment Icon feature
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Smiley />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ boxShadow: "2px 2px 5px rgba(0,0,0,0.15)" }}
          onChange={(e) => setInput(e.target.value)}
        />

        <Box
          sx={{ height: 48, width: 48, borderRadius: 1.5 }}
          bgcolor={theme.palette.primary.main}
        >
          <Stack
            sx={{ height: "100%", width: "100%" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <IconButton onClick={handleSendMessage}>
              <TelegramLogo color="#fff" />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
export default Footer;
