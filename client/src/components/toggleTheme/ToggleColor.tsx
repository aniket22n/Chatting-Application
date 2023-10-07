import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { CaretDown, CheckCircle, Circle } from "phosphor-react";
import { IconButton, Stack, Typography } from "@mui/material";
import { useRecoilState } from "recoil";

import { themeState, Color } from "../../store/atoms/themeAtom";
import ToggleTheme from "./ToggleTheme";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: window.innerWidth > 900 ? "bottom" : "top",
      horizontal: window.innerWidth > 900 ? "left" : "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 100,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function ToggleColor() {
  const [theme, setTheme] = useRecoilState(themeState);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <CaretDown size={24} />
      </IconButton>
      <StyledMenu
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {window.innerWidth < 900 && (
          <>
            <MenuItem disableRipple onClick={handleClose}>
              <Typography sx={{ mr: 2 }}>Select Theme</Typography>
              <ToggleTheme />
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
          </>
        )}
        <MenuItem disableRipple onClick={handleClose}>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            Select Color
          </Typography>
          <Stack direction={"row"} spacing={4}>
            <IconButton
              sx={{ bgcolor: Color.Blue }}
              onClick={() =>
                setTheme({ color: Color.Blue, theme: theme.theme })
              }
            >
              {theme.color == "#0162C4" ? <CheckCircle /> : <Circle />}
            </IconButton>
            <IconButton
              sx={{ bgcolor: Color.Yellow }}
              onClick={() =>
                setTheme({ color: Color.Yellow, theme: theme.theme })
              }
            >
              {theme.color == "#B78103" ? <CheckCircle /> : <Circle />}
            </IconButton>
            <IconButton
              sx={{ bgcolor: Color.Red }}
              onClick={() => setTheme({ color: Color.Red, theme: theme.theme })}
            >
              {theme.color == "#FF4842" ? <CheckCircle /> : <Circle />}
            </IconButton>
          </Stack>
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
