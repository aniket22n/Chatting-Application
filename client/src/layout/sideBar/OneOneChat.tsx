import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Badge,
  Card,
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import SearchBar from "../../components/sideBar/SearchBar";
import { ChatList } from "./testingData";
import { StyledBadge } from "../../components/StyledBadge";

interface ChatElementType {
  id: number;
  img: string;
  name: string;
  msg: string;
  time: string;
  unread: number;
  online: boolean;
}

const ChatElement = ({ Input }: { Input: ChatElementType }) => {
  const theme = useTheme();
  return (
    <Card
      elevation={4}
      sx={{
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#fff"
            : theme.palette.background.default,
        borderRadius: "20px",
        p: 2,
      }}
    >
      <Stack
        direction={"row"}
        spacing={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          {Input.online ? (
            // StyledBadge from Components
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={faker.image.avatar()} />
            </StyledBadge>
          ) : (
            <Avatar src={faker.image.avatar()} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle1">{Input.name}</Typography>
            <Typography variant="caption">
              {Input.msg.substring(0, 25) +
                (Input.msg.length > 25 ? " ..." : "")}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Typography sx={{ fontWeight: 600 }}>{Input.time}</Typography>
          <Badge color="primary" badgeContent={Input.unread} />
        </Stack>
      </Stack>
    </Card>
  );
};

const OneOneChat = () => {
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
            Chats
          </Typography>
          {/* import SearchBar */}
          <SearchBar />
        </Stack>

        <Divider
          sx={{ width: "340px", bgcolor: theme.palette.text.secondary }}
        />

        {/******************* ChatList ****************/}
        <Stack
          sx={{
            flexGrow: 1,
            height: "100%",
            width: "100%",
          }}
        >
          <Typography variant="subtitle2" sx={{ color: "#676767" }}>
            All Chats
          </Typography>
          <SimpleBar
            style={{
              maxHeight: "calc(100vh - 255px )",
            }}
          >
            <Stack spacing={1.5} p={1} pr={2}>
              {/* ChatElement */}
              {ChatList.map((el: ChatElementType, index: number) => {
                return <ChatElement key={index} Input={el} />;
              })}
            </Stack>
          </SimpleBar>
        </Stack>
      </Stack>
    </Box>
  );
};
export default OneOneChat;
