import { Stack, Box, Avatar, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CaretDown } from "phosphor-react";
import { useRecoilValue } from "recoil";

import { StyledBadge } from "../../components/StyledBadge";
import { appState } from "../../store/atoms/appStateAtom";

const Header = () => {
  const appSetting = useRecoilValue(appState);
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "80px",
        width: "100%",
        borderLeft: `solid ${theme.palette.text.secondary} 0.1px`,
        bgcolor: theme.palette.background.paper,
        boxShadow: "2px 2px 6px rgba(0,0,0,0.15)",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ height: "100%", width: "100%", p: 4 }}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <StyledBadge
            overlap="circular"
            invisible={!appSetting.selectedChat?.online}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              src={appSetting.selectedChat?.image}
              alt={"user image"}
              sx={{ border: `solid ${theme.palette.text.primary} 1px` }}
            />
          </StyledBadge>
          <Stack>
            <Typography variant="subtitle1">
              {appSetting.selectedChat?.username}
            </Typography>
            <Typography variant="caption">
              {appSetting.selectedChat?.online ? "online" : "offline"}
            </Typography>
          </Stack>
        </Stack>

        <IconButton>
          <CaretDown />
        </IconButton>
      </Stack>
    </Box>
  );
};
export default Header;
