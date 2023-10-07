import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { CaretDown } from "phosphor-react";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { chatHistory } from "../../store/atoms/messageState";
import { appState } from "../../store/atoms/appStateAtom";
import axios from "axios";
import { toast } from "react-toastify";

const HeaderMenu = () => {
  const setChatHistory = useSetRecoilState(chatHistory);
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
          toast.success(response.data.message, {
            position: "top-center",
            pauseOnHover: false,
            pauseOnFocusLoss: false,
          });
          setChatHistory([]);
        }
      } catch (error: any) {
        toast.success("Failed to delete chat", {
          position: "top-center",
          pauseOnHover: false,
          pauseOnFocusLoss: false,
        });
      }
    } else if (input) {
      toast.warning("You entered: " + input, {
        position: "top-center",
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
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
