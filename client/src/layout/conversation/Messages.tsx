import { useTheme } from "@mui/material/styles";
import SimpleBar from "simplebar-react";
import { Stack, Box } from "@mui/material";

import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { messages } from "../../store/atoms/message";
import { user } from "../../store/atoms/user";

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";

  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

const Messages = () => {
  const message = useRecoilValue(messages);
  const userState = useRecoilValue(user);
  const theme = useTheme();

  // default scrollbar should point at bottom
  const messagesEndRef: any = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [message]);

  return (
    <Stack direction={"column-reverse"} sx={{ overflow: 1 }}>
      <SimpleBar
        style={{
          maxHeight: "calc(100vh - 250px)",
          width: "thin",
        }}
      >
        {message.map((el, index) => {
          return (
            <Stack
              key={index}
              direction={"row"}
              justifyContent={el.sender == userState?.id ? "end" : "start"}
              spacing={1}
              sx={{ pt: 2, pl: 2, pr: 2 }}
            >
              {userState && el.sender != userState.id && (
                <Stack direction={"row"} alignItems={"end"} spacing={1}>
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
              {userState && el.sender == userState.id && (
                <Stack alignItems={"end"}>
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
export default Messages;
