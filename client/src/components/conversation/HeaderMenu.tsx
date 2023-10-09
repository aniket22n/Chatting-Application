import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { CaretDown } from "phosphor-react";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";

import { chatHistory } from "../../store/atoms/messageState";
import { appState } from "../../store/atoms/appStateAtom";
import useToast from "../../hooks/useToast";
import { userState } from "../../store/atoms/userAtom";

const HeaderMenu = () => {
  const { warningToast, successToast, infoToast } = useToast();
  const setChatHistory = useSetRecoilState(chatHistory);
  const [user, setUser] = useRecoilState(userState);
  const appSetting = useRecoilValue(appState);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    const input = prompt("Enter DELETE to confirm");
    if (input === "DELETE") {
      try {
        const chat_id = { chat_id: appSetting.selectedChat?.chat_id };
        const response = await axios.delete(
          "http://localhost:3000/deleteChatHistroy",
          {
            params: { chat_id },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          successToast(response.data.message);
          setChatHistory([]);
          if (user.info && appSetting.selectedChat) {
            const updatedFriends = user.info.friends.map((friend) => {
              if (friend.chat_id === appSetting.selectedChat?.chat_id) {
                return {
                  ...friend,
                  time: 0,
                  msg: "say hello...",
                  delivery: "none" as "none",
                };
              }
              return friend;
            });
            setUser({
              ...user,
              info: { ...user.info, friends: updatedFriends },
            });
          }
        }
      } catch (error: any) {
        infoToast("Failed to delete chat");
      }
    } else if (input) {
      warningToast("You entered: " + input);
    }
  };

  return (
    <>
      <Box>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <CaretDown />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          onClick={handleClose}
        >
          <MenuItem onClick={handleDelete}>Delete conversation</MenuItem>
        </Menu>
      </Box>
    </>
  );
};
export default HeaderMenu;
