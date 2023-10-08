import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { PaintBrushHousehold } from "phosphor-react";
import { IconButton, Stack, Typography } from "@mui/material";

import ToggleTheme from "./toggleTheme";
import ToggleColors from "./toggleColors";
import { StyledMenu } from "./customMenu";

export default function Theme() {
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
        <Stack alignItems={"center"} spacing={0.2}>
          <PaintBrushHousehold size={24} />

          <Typography>theme</Typography>
        </Stack>
      </IconButton>
      <StyledMenu
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disableRipple onClick={handleClose}>
          <Typography sx={{ mr: 2 }}>Switch Theme</Typography>
          <ToggleTheme />
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />

        <MenuItem disableRipple onClick={handleClose}>
          <Typography sx={{ mr: 2 }}>Switch Color</Typography>
          <ToggleColors />
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
