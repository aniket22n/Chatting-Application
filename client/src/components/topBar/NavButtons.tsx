import { Box, Stack, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ChatCircleDots, Users } from "phosphor-react";
import { useState } from "react";
import { useRecoilState } from "recoil";

import { appState } from "../../store/atoms/appStateAtom";

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
    </Stack>
  );
};

export default NavButtons;
