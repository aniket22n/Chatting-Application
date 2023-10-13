import { Stack, Box } from "@mui/material";
import { useRecoilValue } from "recoil";

import Header from "../../components/conversation/Header";
import Footer from "../../components/conversation/Footer";
import Messages from "../../components/conversation/Messages";
import { appState } from "../../store/atoms/appStateAtom";
import GitHubLink from "../../components/conversation/GitHubLink";
import { loadingState } from "../../store/atoms/otherAtom";
import Loading from "../../components/loading";

const Chat = () => {
  const isLoading = useRecoilValue(loadingState);
  const { isDrawerOpen, selectedChat } = useRecoilValue(appState);
  if (!selectedChat) {
    return <GitHubLink />;
  }

  return (
    <Box
      sx={{
        minWidth: "300px",
        width: "100%",
        height: "calc(100svh - 80px)",
        display: window.innerWidth < 500 && isDrawerOpen ? "none" : "block",
      }}
    >
      <Stack>
        {/* Header */}
        <Header />

        {/* Messages */}
        <Box height={"calc(100svh - 3 * 80px)"}>
          {isLoading && window.innerWidth > 500 ? <Loading /> : <Messages />}
        </Box>

        {/* Footer */}
        <Footer />
      </Stack>
    </Box>
  );
};
export default Chat;
