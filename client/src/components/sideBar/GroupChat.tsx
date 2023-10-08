import { Stack, Box, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const GroupChat = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 80px)",
        bgcolor: theme.palette.background.paper,
        boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Stack alignItems={"center"} spacing={2} p={2.5}>
        {/*****************  Header *******************/}
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={2}
          sx={{ width: "100%", height: "80px" }}
        >
          <Typography fontSize={"40px"} variant="subtitle2" fontWeight={"600"}>
            Groups
          </Typography>
        </Stack>
        <Divider
          sx={{ width: "340px", bgcolor: theme.palette.text.secondary }}
        />
        <Typography>coming soon..</Typography>
      </Stack>
    </Box>
  );
};
export default GroupChat;
