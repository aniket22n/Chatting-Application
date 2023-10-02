import { Stack, Box } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";
import Messages from "./Messages";
import { useRecoilValue } from "recoil";
import { openDrawer } from "../../store/atoms/drawer";

const Chat = () => {
  const isOpen = useRecoilValue(openDrawer);
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
