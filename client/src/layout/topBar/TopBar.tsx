import { Box, Stack, IconButton, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ChatCircleDots, List, Users } from "phosphor-react";
import { useState } from "react";
import { useRecoilState } from "recoil";

import Theme from "../../components/toggleTheme/Theme";
import { appState } from "../../store/atoms/appStateAtom";
import UserProfile from "./UserProfile";

const TopBar = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: "80px",
        bgcolor: theme.palette.background.default,
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.05)",
        borderBottom: `solid ${theme.palette.background.paper} 2px`,
        zIndex: "1",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ height: "100%", p: window.innerWidth < 500 ? 1 : 3 }}
        spacing={window.innerWidth < 500 ? 1 : 2}
      >
        <Stack
          direction={"row"}
          spacing={window.innerWidth < 500 ? 1 : 2}
          alignItems={"center"}
        >
          <Drawer />
          {/*innerWidth > 900 && <Logo />*/}
          <NavButtons />
        </Stack>

        <UserProfile />
      </Stack>
    </Box>
  );
};

// ........... Drawer Open/Close ........
const Drawer = () => {
  const [appSetting, setAppSetting] = useRecoilState(appState);

  return (
    <IconButton
      onClick={() =>
        setAppSetting({ ...appSetting, isDrawerOpen: !appSetting.isDrawerOpen })
      }
    >
      <List size={36} />
    </IconButton>
  );
};

// ......Buttons to Navigate between one-one, Group chat & change Theme.....

const NavButtons = () => {
  const [appSetting, setAppSetting] = useRecoilState(appState);
  const [selected, setSelected] = useState(0);
  const theme = useTheme();

  const navButtons = [
    {
      index: 0,
      icon: <ChatCircleDots size={24} />,
      name: "chats",
    },
    {
      index: 1,
      icon: <Users size={24} />,
      name: "groups",
    },
  ];

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={window.innerWidth < 500 ? 1 : 2}
    >
      {navButtons.map((el) =>
        el.index === selected ? (
          <Box
            key={el.index}
            sx={{
              backgroundColor: theme.palette.primary.main,
              borderRadius: 1.5,
            }}
          >
            <IconButton
              sx={{ width: "max-content", color: "#fff" }}
              key={el.index}
            >
              <Stack alignItems={"center"} spacing={0.2}>
                {el.icon}
                <Typography>{el.name}</Typography>
              </Stack>
            </IconButton>
          </Box>
        ) : (
          <IconButton
            key={el.index}
            onClick={() => {
              setSelected(el.index),
                setAppSetting({
                  ...appSetting,
                  selectedSideBar: el.index == 0 ? "one-one" : "group",
                  isDrawerOpen: true,
                });
            }}
          >
            <Stack alignItems={"center"} spacing={0.2}>
              {el.icon}
              <Typography>{el.name}</Typography>
            </Stack>
          </IconButton>
        )
      )}
      <Divider
        orientation="vertical"
        sx={{ height: "48px", bgcolor: theme.palette.text.secondary }}
      />
      {/* From toggle Theme component */}
      <Theme />
    </Stack>
  );
};

export default TopBar;
