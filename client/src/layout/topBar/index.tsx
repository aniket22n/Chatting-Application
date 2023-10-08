import { Box, Divider, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import UserProfile from "../../components/topBar/UserProfile";
import NavButtons from "../../components/topBar/NavButtons";
import Drawer from "../../components/topBar/DrawerActions";
import Theme from "../../components/topBar/toggleTheme/Theme";

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
          {/*import user Drawer*/}
          <Drawer />

          {/*import NavButtons*/}
          <NavButtons />

          <Divider
            orientation="vertical"
            sx={{ height: "48px", bgcolor: theme.palette.text.secondary }}
          />
          {/* From toggleTheme component */}
          <Theme />
        </Stack>

        {/*import user profile*/}
        <UserProfile />
      </Stack>
    </Box>
  );
};

export default TopBar;
