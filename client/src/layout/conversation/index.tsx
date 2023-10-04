import { Stack, Box, Typography } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";
import Messages from "./Messages";
import { useRecoilValue } from "recoil";
import { openDrawer } from "../../store/atoms/drawer";
import { selectedChat } from "../../store/atoms/selectedChat";

const Chat = () => {
  const isOpen = useRecoilValue(openDrawer);
  const chat = useRecoilValue(selectedChat);

  if (!chat) {
    return (
      <center>
        <Box display={window.innerWidth < 500 && isOpen ? "none" : "block"}>
          <Typography variant="h2">Select chat</Typography>
        </Box>
      </center>
    );
  }
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 80px)",
        display: window.innerWidth < 500 && isOpen ? "none" : "block",
      }}
    >
      <Stack>
        {/* Header */}
        <Header />

        {/* Messages */}
        <Box height={"calc(100vh - 3 * 80px)"}>
          <Messages />
        </Box>

        {/* Footer */}
        <Footer />
      </Stack>
    </Box>
  );
};
export default Chat;
