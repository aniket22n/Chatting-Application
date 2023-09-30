import { useTheme } from "@mui/material/styles";
import SimpleBar from "simplebar-react";
import { Stack, Box } from "@mui/material";

import { messages } from "./testingMessages";
import { useEffect, useRef } from "react";

const Messages = () => {
  const theme = useTheme();
  const userId = 4;

  // default scrollbar should point at bottom
  const messagesEndRef: any = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <Stack direction={"column-reverse"} sx={{ overflow: 1 }}>
      <SimpleBar
        style={{
          maxHeight: "calc(100vh - 3*80px)",
          width: "thin",
        }}
      >
        {messages.map((el, index) => {
          return (
            <Stack
              key={index}
              direction={"row"}
              justifyContent={el.sender == userId ? "end" : "start"}
              spacing={1}
              sx={{ pt: 2, pl: 2, pr: 2 }}
            >
              {el.sender != userId && (
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
                  <Box sx={{ fontSize: "14px" }}>{el.time}</Box>
                </Stack>
              )}
              {el.sender == userId && (
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
                  <Box sx={{ fontSize: "14px" }}>{el.time}</Box>
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
