import { useTheme } from "@mui/material/styles";
import { Box, CssBaseline, Drawer, Stack } from "@mui/material";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";

import useSocketOperations from "../hooks/useSocketOperations";
import useAuthentication from "../hooks/useAuthentication";
import TopBar from "./topBar/index";
import SideBar from "./sideBar";
import Chat from "./conversation/index";
import { appState } from "../store/atoms/appStateAtom";
import { Main } from "../components/customDrawer";

const Layout = () => {
  const theme = useTheme();
  const isLoggedin = useAuthentication();
  const appSetting = useRecoilValue(appState);

  // check if user loggedin
  useEffect(() => {
    isLoggedin();
  }, []);

  // socket operations
  useSocketOperations();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: theme.palette.background.default,
      }}
    >
      <Stack>
        {/****************  TopBar *********************/}
        <TopBar />

        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Drawer
            sx={{
              width: 360,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: 360,
                height: "calc(100vh - 80px)",
                marginTop: "80px",
              },
            }}
            variant="persistent"
            anchor="left"
            open={appSetting.isDrawerOpen}
          >
            {/******************* SideBar ******************/}
            <SideBar />
          </Drawer>

          <Main
            open={appSetting.isDrawerOpen}
            sx={{
              width: appSetting.isDrawerOpen ? "calc(100vw - 360px)" : "100%",
            }}
          >
            {/********** Conversation screen *************/}
            <Chat />
          </Main>
        </Box>
      </Stack>
    </Box>
  );
};
export default Layout;
