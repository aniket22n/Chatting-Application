import { useTheme } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";

import TopBar from "./topBar/TopBar";
import OneOneChat from "./sideBar/OneOneChat";
import Chat from "./conversation/Chat";

const Layout = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        bgcolor: theme.palette.background.default,
      }}
    >
      <Stack>
        {/* TopBar */}
        <TopBar />

        <Stack direction={"row"}>
          {/* SideBar*/}
          <OneOneChat />

          {/* Conversation */}
          <Chat />
        </Stack>
      </Stack>
    </Box>
  );
};
export default Layout;
