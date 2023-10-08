import { Stack, Box, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";

import Header from "../../components/conversation/Header";
import Footer from "../../components/conversation/Footer";
import Messages from "../../components/conversation/Messages";
import { appState } from "../../store/atoms/appStateAtom";

const Chat = () => {
  const { isDrawerOpen, selectedChat } = useRecoilValue(appState);

  if (!selectedChat) {
    return (
      <center>
        <Box
          minWidth="300px"
          display={window.innerWidth < 500 && isDrawerOpen ? "none" : "block"}
        >
          <Typography variant="h2">Select chat</Typography>
        </Box>
      </center>
    );
  }
  return (
    <Box
      sx={{
        minWidth: "300px",
        width: "100%",
        height: "calc(100vh - 80px)",
        display: window.innerWidth < 500 && isDrawerOpen ? "none" : "block",
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
