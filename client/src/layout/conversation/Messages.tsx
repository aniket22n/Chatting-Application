import { useTheme } from "@mui/material/styles";
import SimpleBar from "simplebar-react";
import { Stack, Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

import { chatHistory } from "../../store/atoms/messageState";
import { userState } from "../../store/atoms/userAtom";

const Messages = () => {
  const messages = useRecoilValue(chatHistory);
  const user = useRecoilValue(userState);
  const theme = useTheme();

  // default scrollbar should point at bottom
  const messagesEndRef: any = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <Stack
      direction={"column-reverse"}
      sx={{ overflow: 1, width: "100%", height: "100%" }}
    >
      <SimpleBar
        style={{
          maxHeight: "calc(100vh - 250px)",
          maxWidth: "100%",
        }}
      >
        {messages.map((el, index) => {
          return (
            <Stack
              maxWidth="100%"
              key={index}
              direction={"row"}
              justifyContent={el.sender == user.info?.id ? "end" : "start"}
              spacing={1}
              sx={{ pt: 2, pl: 2, pr: 2 }}
            >
              {userState && el.sender != user.info?.id && (
                <Stack
                  direction={"row"}
                  alignItems={"end"}
                  spacing={1}
                  maxWidth="100%"
                >
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: theme.palette.grey[500],
                      color: "#000",
                      borderRadius: "0px 20px 20px 20px",
                    }}
                  >
                    {el.content}
                  </Box>
                  <Box sx={{ fontSize: "14px" }}>
                    {formatTime(el.timestamp)}
                  </Box>
                </Stack>
              )}
              {userState && el.sender == user.info?.id && (
                <Stack alignItems={"end"} maxWidth="100%">
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: "#0162C4",
                      color: "#fff",
                      borderRadius: "20px 0px 20px 20px",
                    }}
                  >
                    {el.content}
                  </Box>
                  <Box sx={{ fontSize: "14px" }}>
                    {formatTime(el.timestamp)}
                  </Box>
                </Stack>
              )}
            </Stack>
          );
        })}
        <div ref={messagesEndRef} />
      </SimpleBar>
    </Stack>
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

export default Messages;
