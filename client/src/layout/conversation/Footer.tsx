import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import { Smiley, TelegramLogo } from "phosphor-react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";

import { socket } from "../socket";
import { userState } from "../../store/atoms/userAtom";
import { appState } from "../../store/atoms/appStateAtom";
import { chatHistory } from "../../store/atoms/messageState";
import { chatMessageType } from "../../Types/zod";

const StyledInput = styled(TextField)(({}) => ({
  "& .MuiInputBase-input": {
    padding: "14px",
  },
}));

const Footer = () => {
  const theme = useTheme();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useRecoilState(chatHistory);
  const appSettings = useRecoilValue(appState);
  const user = useRecoilValue(userState);

  const handleSendMessage = () => {
    const time = Date.now();

    if (user.info && appSettings.selectedChat) {
      if (input.trim()) {
        const newMessage: chatMessageType = {
          content: input.trim(),
          timestamp: time,
          sender: user.info.id,
          receiver: appSettings.selectedChat.id,
        };

        setMessages([...messages, newMessage]);
        setInput("");

        socket.emit(
          "message",
          user.info.id,
          appSettings.selectedChat.id,
          time,
          input.trim(),
          appSettings.selectedChat.chat_id
        );
      }
    }
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
