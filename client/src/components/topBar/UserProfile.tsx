import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useRecoilValue } from "recoil";

import { userState } from "../../store/atoms/userAtom";
import axios from "axios";
import { useNavigate } from "react-router";
import useToast from "../../hooks/useToast";
import { SignOut } from "phosphor-react";

const UserProfile = () => {
  const { successToast } = useToast();
  const redirect = useNavigate();
  const theme = useTheme();
  const user = useRecoilValue(userState);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const response = await axios.get("http://localhost:3000/logout", {
      withCredentials: true,
    });

    if (response.status === 200) {
      successToast(response.data.message);
      redirect("/login");
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
          <Avatar
            sx={{ border: `solid ${theme.palette.text.primary} 1px` }}
            src={user.info?.image}
          />
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
          <MenuItem>
            <Stack alignItems={"center"} spacing={1}>
              <Avatar
                sx={{
                  height: "60px",
                  width: "60px",
                  border: `solid ${theme.palette.primary.main} 2px`,
                }}
                src={user.info?.image}
              />
              <Typography sx={{ textTransform: "capitalize" }}>
                {user.info?.username}
              </Typography>
              <Typography>{user.info?.email}</Typography>

              <Button onClick={handleLogout}>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography
                    color={theme.palette.error.main}
                    sx={{ textTransform: "capitalize" }}
                  >
                    Logout
                  </Typography>
                  <SignOut size={24} color={theme.palette.error.main} />
                </Stack>
              </Button>
            </Stack>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};
export default UserProfile;
