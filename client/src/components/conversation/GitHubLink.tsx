import { Stack, Box, Typography, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRecoilValue } from "recoil";
import { SiGithub } from "react-icons/si";

import { appState } from "../../store/atoms/appStateAtom";

const GitHubLink = () => {
  const { isDrawerOpen } = useRecoilValue(appState);
  const theme = useTheme();
  return (
    <Box
      minWidth="300px"
      display={window.innerWidth < 500 && isDrawerOpen ? "none" : "block"}
    >
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        spacing={2}
        sx={{ height: "calc(100svh - 80px)" }}
      >
        <Avatar
          sx={{ height: "70px", width: "70px" }}
          src={
            theme.palette.mode === "dark" ? "dark-logo.png" : "light-logo.png"
          }
        />
        <Typography variant="h6">
          Select Conversation or start new one
        </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Typography>
            <a
              href="https://github.com/aniket22n/Chatting-Application"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: theme.palette.primary.main }}
            >
              GitHub repository
            </a>
          </Typography>
          <Typography variant="h5">
            <SiGithub />
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
export default GitHubLink;
