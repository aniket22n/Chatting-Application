import { Stack, Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const Chat = () => {
  return (
    <Box
      sx={{
        width: "calc(100vw - 400px)",
        height: "calc(100vh - 80px)",
      }}
    >
      <Stack>
        {/* Header */}
        <Header />
        {/* Messages */}
        <Box
          sx={{ width: "calc(100vw - 400px)", height: "calc(100vh - 3*80px)" }}
        ></Box>
        {/* Footer */}
        <Footer />
      </Stack>
    </Box>
  );
};
export default Chat;
