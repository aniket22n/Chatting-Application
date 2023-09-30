import { useTheme } from "@mui/material/styles";
import { Box, CssBaseline, Drawer, Stack, styled } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";

import TopBar from "./topBar/TopBar";
import OneOneChat from "./sideBar/OneOneChat";
import Chat from "./conversation/index";
import GroupChat from "./sideBar/GroupChat";
import { selectSideBar } from "../store/atoms/selectSideBar";
import { openDrawer } from "../store/atoms/drawer";
import { user } from "../store/atoms/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

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
  const redirect = useNavigate();
  const theme = useTheme();
  const sideBar = useRecoilValue(selectSideBar);
  const open = useRecoilValue(openDrawer);
  const setUser = useSetRecoilState(user);

  // *************** check if user loggedin **************
  useEffect(() => {
    const getResponse = async () => {
      try {
        const response = await axios.get("http://localhost:3000/isLoggedin", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUser(response.data.loginResponse);
        }
      } catch (error: any) {
        const code = error.request.status;
        if (code == 401)
          toast.warning("Please login", { position: "top-center" });
        redirect("/login");
      }
    };
    getResponse();
  }, []);

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
