import {
  Avatar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { userState } from "../../store/atoms/userAtom";
import axios from "axios";
import { useNavigate } from "react-router";
import useToast from "../../hooks/useToast";
import { SignOut, X } from "phosphor-react";
import ImageUploadButton from "./ImageUpload";
import { blur } from "../../store/atoms/otherAtom";
import "../../style/blur.css";
import { StyledMenu } from "./toggleTheme/customMenu";
import { api } from "../../path";

const UserProfile = () => {
  const setBlur = useSetRecoilState(blur);
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
    const response = await axios.get(api.logoutURL, {
      withCredentials: true,
    });
    if (response.status === 200) {
      successToast(response.data.message);
      redirect("/login");
    }
  };

  useEffect(() => {
    setBlur((pre) => !pre);
  }, [open]);

  return (
    <>
      {open && <div className="blur-background"></div>}
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

        <StyledMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem
            disableRipple
            sx={{ "&:hover": { bgcolor: "transparent" } }}
          >
            <Box>
              <IconButton
                onClick={handleClose}
                sx={{
                  color: theme.palette.text.primary,
                  position: "absolute",
                  right: 0,
                }}
              >
                <X size={18} />
              </IconButton>

              <Stack
                alignItems={"center"}
                spacing={2}
                sx={{ mt: "20px", p: "10px" }}
              >
                {/* ************* user Profile picture ********** */}
                <Stack direction={"row"} position={"relative"}>
                  <Avatar
                    sx={{
                      height: "80px",
                      width: "80px",
                    }}
                    src={user.info?.image}
                  />

                  {/************** upload image ****************/}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "-15px",
                      right: "-35px",
                    }}
                  >
                    <ImageUploadButton />
                  </Box>
                </Stack>

                {/***************** username & email **********/}
                <Stack spacing={1} alignItems={"center"}>
                  <Typography sx={{ textTransform: "capitalize" }}>
                    {`Hi, ${user.info?.username}`}
                  </Typography>
                  <Typography>{user.info?.email}</Typography>
                </Stack>

                {/******************* Logout ****************** */}
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  sx={{ bgcolor: theme.palette.error.dark }}
                >
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Typography sx={{ textTransform: "capitalize" }}>
                      Logout
                    </Typography>
                    <SignOut size={24} />
                  </Stack>
                </Button>
              </Stack>
            </Box>
          </MenuItem>
        </StyledMenu>
      </Box>
    </>
  );
};
export default UserProfile;
