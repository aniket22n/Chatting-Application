import { Stack, Box } from "@mui/material";
import { useRecoilValue } from "recoil";

import Header from "../../components/conversation/Header";
import Footer from "../../components/conversation/Footer";
import Messages from "../../components/conversation/Messages";
import { appState } from "../../store/atoms/appStateAtom";
import GitHubLink from "../../components/conversation/GitHubLink";

const Chat = () => {
  const { isDrawerOpen, selectedChat } = useRecoilValue(appState);
  if (!selectedChat) {
    return <GitHubLink />;
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
