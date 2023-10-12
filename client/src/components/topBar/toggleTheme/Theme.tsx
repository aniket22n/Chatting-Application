import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { PaintBrushHousehold, X } from "phosphor-react";
import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";

import ToggleTheme from "./toggleTheme";
import ToggleColors from "./toggleColors";
import { StyledMenu } from "./customMenu";
import { blur } from "../../../store/atoms/otherAtom";
import "../../../style/blur.css";

export default function Theme() {
  const setBlur = useSetRecoilState(blur);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setBlur((pre) => !pre);
  }, [open]);

  return (
    <Box>
      {open && <div className="blur-background"></div>}
      <IconButton onClick={handleClick}>
        <Stack alignItems={"center"} spacing={0.2}>
          <PaintBrushHousehold size={24} />

          <Typography>theme</Typography>
        </Stack>
      </IconButton>
      <Card elevation={12}>
        <StyledMenu
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
        >
          <MenuItem
            disableRipple
            sx={{ "&:hover": { bgcolor: "transparent" } }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"200px"}
              p={1}
            >
              <Typography sx={{ mr: 2 }}>Theme</Typography>
              <ToggleTheme />
            </Stack>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />

          <MenuItem
            disableRipple
            sx={{ "&:hover": { bgcolor: "transparent" } }}
          >
            <Stack alignItems={"center"} width={"200px"} spacing={2}>
              <Typography sx={{ mr: 2 }}>Switch Color Theme</Typography>
              <ToggleColors />
            </Stack>
          </MenuItem>

          {/* ********** close menu ************ */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <X size={20} />
          </IconButton>
        </StyledMenu>
      </Card>
    </Box>
  );
}
