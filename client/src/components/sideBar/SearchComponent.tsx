import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { MagnifyingGlass, UserPlus, X } from "phosphor-react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Avatar, Card, IconButton, Stack, Typography } from "@mui/material";

import { searchState } from "../../store/atoms/searchAtom";
import SearchBar from "./SearchBar";
import { loginResponseType, searchType } from "../../Types/zod";
import { friends } from "../../store/selectors/friends";
import { userState } from "../../store/atoms/userAtom";
import useToast from "../../hooks/useToast";
import { api } from "../../path";

// Search component
function SearchComponent() {
  const theme = useTheme();
  const { errorToast, infoToast } = useToast();
  const [search, setSearch] = useRecoilState(searchState);

  const handleSearch = async () => {
    if (typeof search.input !== "string" || search.input === "") {
      return errorToast("Invalid or Empty search data");
    }
    try {
      const userData: searchType = { username: search.input.trim() };
      //*********** Request User info ********
      const response = await axios.post(api.searchURL, userData, {
        withCredentials: true,
      });

      // ************ Response****************
      if (response.status === 200) {
        setSearch({ input: "", response: response.data.response });
      }
    } catch (error: any) {
      const code = error.request.status;
      let message;
      if (code == 404) message = "user dosen't exists";
      else message = "server error";
      infoToast(message);
      setSearch({ input: "", response: search.response });
    }
  };

  // ************* Display response ********************
  if (search.response) {
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
  const { successToast, errorToast } = useToast();
  const [search, setSearch] = useRecoilState(searchState);
  const friendsArray = useRecoilValue(friends);
  const [user, setUser] = useRecoilState(userState);

  // *********** hit addUser route **************************
  const handleConnect = async () => {
    if (search) {
      try {
        const input = { id: search.response?.id };
        const response = await axios.put(api.addUserURL, input, {
          withCredentials: true,
        });
        if (response.status == 200) {
          successToast(`${search.response?.username} added to chat list`);

          setSearch({ input: "", response: null });
          if (user.info) {
            // Create a new user data object with the updated friends
            const updatedUserInfo: loginResponseType = {
              ...user.info,
              friends: [...user.info.friends, response.data.addUserResponse],
            };

            // Update the user atom with the updated user data
            setUser({ isLoggedin: user.isLoggedin, info: updatedUserInfo });
          }
        }
      } catch (error: any) {
        errorToast("Error");
      }
    }
  };

  if (search.response) {
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
              src={search.response.image}
              sx={{
                width: 56,
                height: 56,
                border: `solid ${theme.palette.text.primary} 1px`,
              }}
            />
            <Typography variant="subtitle1">
              {search.response.username}
            </Typography>
          </Stack>
        </Card>

        {/****************  Button to hit Add user route  ***************/}
        {
          // If already friends, hide add button
          friendsArray &&
            !friendsArray?.find(
              (friend) => friend.username == search.response?.username
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
          onClick={() => setSearch({ input: "", response: null })}
        >
          <X size={24} />
        </IconButton>
      </Stack>
    );
  }
};
export default SearchComponent;
