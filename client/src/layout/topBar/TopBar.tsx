import { Avatar, Box, Divider, IconButton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ChatCircleDots, List, Users } from "phosphor-react";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

import darkLogo from "../../assets/logo/dark-logo.png";
import lightLogo from "../../assets/logo/light-logo.png";
import ToggleTheme from "../../components/toggleTheme/ToggleTheme";
import ToggleColor from "../../components/toggleTheme/ToggleColor";
import { selectSideBar } from "../../store/atoms/selectSideBar";
import { openDrawer } from "../../store/atoms/drawer";

const TopBar = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: "80px",
        bgcolor: theme.palette.background.default,
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.05)",
        zIndex: "1",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ height: "100%", p: 3 }}
      >
        <Stack direction={"row"} spacing={4}>
          <Drawer />
          {innerWidth > 900 && <Logo />}
          <NavButtons />
        </Stack>

        <Avatar
          sx={{ border: `solid ${theme.palette.text.primary} 1px` }}
          src={faker.image.avatar()}
        />
      </Stack>
    </Box>
  );
};

// ........... Drawer Open/Close ........
const Drawer = () => {
  const setOpen = useSetRecoilState(openDrawer);

  return (
    <IconButton onClick={() => setOpen((prevOpen) => !prevOpen)}>
      <List size={36} />
    </IconButton>
  );
};

//............. Logo ....................

const Logo = () => {
  const theme = useTheme();
  return (
    <Stack
      p={1.2}
      sx={{
        bgcolor: theme.palette.primary.main,
        borderRadius: "50%",
        boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.50)",
      }}
    >
      <img
        src={theme.palette.mode == "light" ? lightLogo : darkLogo}
        height={"50px"}
        width={"50px"}
      />
    </Stack>
  );
};

// ......Buttons to Navigate between one-one, Group chat & change Theme.....

const NavButtons = () => {
  const setOpen = useSetRecoilState(openDrawer);
  const setSideBar = useSetRecoilState(selectSideBar);
  const [selected, setSelected] = useState(0);
  const theme = useTheme();

  const navButtons = [
    {
      index: 0,
      icon: <ChatCircleDots size={24} />,
    },
    {
      index: 1,
      icon: <Users size={24} />,
    },
  ];

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={3}>
      {navButtons.map((el) =>
        el.index === selected ? (
          <Box
            key={el.index}
            p={0.5}
            sx={{
              backgroundColor: theme.palette.primary.main,
              borderRadius: 1.5,
            }}
          >
            <IconButton
              sx={{ width: "max-content", color: "#fff" }}
              key={el.index}
            >
              {el.icon}
            </IconButton>
          </Box>
        ) : (
          <IconButton
            key={el.index}
            onClick={() => {
              setSelected(el.index),
                setSideBar(el.index == 0 ? "one-one" : "group"),
                setOpen(true);
            }}
          >
            {el.icon}
          </IconButton>
        )
      )}
      <Divider
        orientation="vertical"
        sx={{ height: "48px", bgcolor: theme.palette.text.secondary }}
      />
      <ToggleColor />
      {window.innerWidth > 900 && <ToggleTheme />}
    </Stack>
  );
};
export default TopBar;
