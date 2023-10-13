import CircularProgress from "@mui/material/CircularProgress";
import { Box, Stack } from "@mui/material";

export default function Loading() {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ height: "calc(100svh - 250px)" }}
    >
      <Box>
        <CircularProgress />
      </Box>
    </Stack>
  );
}
