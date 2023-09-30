import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Badge,
  Card,
  Box,
  Divider,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { MagnifyingGlass, UserPlus, X } from "phosphor-react";
import axios from "axios";
import { toast } from "react-toastify";

import SearchBar from "../../components/sideBar/SearchBar";
import { ChatList } from "./testingData";
import { StyledBadge } from "../../components/StyledBadge";
import { useRecoilState } from "recoil";
import { searchUser } from "../../store/atoms/search";
import { searchResponseType, searchType } from "../../zod/zod";
import { useState } from "react";

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
        <SearchFriends />

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

// Search component
function SearchFriends() {
  const theme = useTheme();
  const [username, setUsername] = useRecoilState(searchUser);
  const [search, setSearch] = useState<searchResponseType>();

  const handleSearch = async () => {
    if (typeof username !== "string" || username === "") {
      return toast.error("Invalid or Empty search data");
    }
    try {
      const userData: searchType = { username };
      // Use Axios's `params` option to send query parameters
      const response = await axios.post(
        "http://localhost:3000/search",
        userData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setSearch(response.data.searchResponse);
      }
    } catch (error: any) {
      const code = error.request.status;
      if (code == 404) toast.info("user dosen't exists, try other ");
    }

    setUsername("");
  };

  if (search) {
    return (
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        {/****************  Card to display user info  ***************/}
        <Card
          elevation={6}
          sx={{
            height: "80px",
            width: "200px",
            borderRadius: "20px",
          }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={2}
            p={2}
            sx={{ height: "100%", width: "100%" }}
          >
            {" "}
            <Avatar
              src={search.image}
              sx={{
                width: 56,
                height: 56,
                border: `solid ${theme.palette.text.primary} 1px`,
              }}
            />
            <Typography variant="subtitle1">{search.username}</Typography>
          </Stack>
        </Card>

        {/****************  Button to hit Add user route  ***************/}
        <IconButton
          sx={{
            bgcolor: theme.palette.success.main,
            color: "#000",
            border: `solid ${theme.palette.text.primary} 1px`,
          }}
        >
          <UserPlus size={24} />
        </IconButton>

        {/**************** cancle button  ***************/}
        <IconButton
          sx={{
            bgcolor: theme.palette.error.dark,
            color: "#000",
            border: `solid ${theme.palette.text.primary} 1px`,
          }}
          onClick={() => setSearch(undefined)}
        >
          <X size={24} />
        </IconButton>
      </Stack>
    );
  }

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={2}
      sx={{ width: "100%", height: "80px" }}
    >
      {/*SearchBar */}
      <SearchBar />
      <IconButton
        sx={{
          bgcolor: theme.palette.primary.main,
          borderRadius: theme.palette.text.primary,
        }}
        onClick={handleSearch}
      >
        <MagnifyingGlass color="#fff" />
      </IconButton>
    </Stack>
  );
}

export default OneOneChat;
