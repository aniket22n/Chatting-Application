import { Stack, Box } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";
import Messages from "./Messages";

const Chat = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 80px)",
      }}
    >
      <Stack>
        {/* Header */}
        <Header />

        {/* Messages */}
        <Box minWidth="350px" height={"calc(100vh - 3 * 80px)"}>
          <Messages />
        </Box>

        {/* Footer */}
        <Footer />
      </Stack>
    </Box>
  );
};
export default Chat;
