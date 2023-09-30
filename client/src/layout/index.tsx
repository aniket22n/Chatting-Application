import { useTheme } from "@mui/material/styles";
import { Box, CssBaseline, Drawer, Stack, styled } from "@mui/material";
import { useRecoilValue } from "recoil";

import TopBar from "./topBar/TopBar";
import OneOneChat from "./sideBar/OneOneChat";
import Chat from "./conversation/index";
import GroupChat from "./sideBar/GroupChat";
import { selectSideBar } from "../store/atoms/selectSideBar";
import { openDrawer } from "../store/atoms/drawer";

const drawerWidth = 400;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,

  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const Layout = () => {
  const theme = useTheme();
  const sideBar = useRecoilValue(selectSideBar);
  const open = useRecoilValue(openDrawer);

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
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                height: "calc(100vh - 80px)",
                marginTop: "80px",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            {/******************* SideBar ******************/}
            {sideBar == "one-one" ? <OneOneChat /> : <GroupChat />}
          </Drawer>

          <Main
            open={open}
            sx={{ width: open ? "calc(100vw - 400px)" : "100%" }}
          >
            {/****************** Conversation **************/}

            <Chat />
          </Main>
        </Box>
      </Stack>
    </Box>
  );
};
export default Layout;
