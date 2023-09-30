import { toast } from "react-toastify";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { MagnifyingGlass, UserPlus, X } from "phosphor-react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Avatar, Card, IconButton, Stack, Typography } from "@mui/material";

import { searchUser, searchResponse } from "../../store/atoms/search";
import SearchBar from "../../components/sideBar/SearchBar";
import { loginResponseType, searchType } from "../../zod/zod";
import { friends } from "../../store/selectors/friends";
import { user } from "../../store/atoms/user";

// Search component
function SearchComponent() {
  const theme = useTheme();
  const [username, setUsername] = useRecoilState(searchUser);
  const [search, setSearch] = useRecoilState(searchResponse);

  const handleSearch = async () => {
    if (typeof username !== "string" || username === "") {
      return toast.error("Invalid or Empty search data", {
        position: "top-center",
      });
    }
    try {
      const userData: searchType = { username: username.trim() };
      //*********** Request User info ********
      const response = await axios.post(
        "http://localhost:3000/search",
        userData,
        {
          withCredentials: true,
        }
      );

      // ************ Response****************
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-center",
        });
        setSearch(response.data.searchResponse);
      }
    } catch (error: any) {
      const code = error.request.status;
      if (code == 404)
        toast.info("user dosen't exists", {
          position: "top-center",
        });
    }
    setUsername("");
  };

  // ************* Display response ********************
  if (search) {
    return <DisplayUser />;
  }

  // ************* Default show searchbar ***************
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

const DisplayUser = () => {
  const theme = useTheme();
  const [search, setSearch] = useRecoilState(searchResponse);
  const friendsArray = useRecoilValue(friends);
  const [userState, setUserState] = useRecoilState(user);

  // *********** hit addUser route **************************
  const handleConnect = async () => {
    if (search) {
      const input = { id: search.id };
      const response = await axios.put("http://localhost:3000/addUser", input, {
        withCredentials: true,
      });
      if (response.status == 200) {
        toast.success(`${search.username} added to chat list`, {
          theme: "dark",
          position: "top-center",
        });

        setSearch(null);
        if (userState) {
          // Create a new user data object with the updated friends
          const updatedUserData: loginResponseType = {
            ...userState,
            friends: [...userState.friends, response.data.addUserResponse],
          };

          // Update the user atom with the updated user data
          setUserState(updatedUserData);
        }
      }
    }
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
        {
          // If already friends, hide add button
          friendsArray &&
            !friendsArray?.find(
              (friend) => friend.username == search.username
            ) && (
              <IconButton
                sx={{
                  bgcolor: theme.palette.success.main,
                  color: "#000",
                  border: `solid ${theme.palette.text.primary} 1px`,
                }}
                onClick={handleConnect}
              >
                <UserPlus size={24} />
              </IconButton>
            )
        }

        {/**************** cancel button  ***************/}
        <IconButton
          sx={{
            bgcolor: theme.palette.error.dark,
            color: "#000",
            border: `solid ${theme.palette.text.primary} 1px`,
          }}
          onClick={() => setSearch(null)}
        >
          <X size={24} />
        </IconButton>
      </Stack>
    );
  }
};
export default SearchComponent;
