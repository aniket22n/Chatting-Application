import { Stack, Box, Avatar, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import { CaretDown } from "phosphor-react";

import { StyledBadge } from "../../components/StyledBadge";

const Header = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minWidth: "350px",
        height: "80px",
        borderLeft: `solid ${theme.palette.text.secondary} 0.1px`,
        bgcolor: theme.palette.background.paper,
        boxShadow: "2px 2px 6px rgba(0,0,0,0.15)",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ height: "100%", width: "100%", p: 4 }}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              src={faker.image.avatar()}
              alt={faker.name.fullName()}
              sx={{ border: `solid ${theme.palette.text.primary} 1px` }}
            />
          </StyledBadge>
          <Stack>
            <Typography variant="subtitle1">{faker.name.fullName()}</Typography>
            <Typography variant="caption">online</Typography>
          </Stack>
        </Stack>

        <IconButton>
          <CaretDown />
        </IconButton>
      </Stack>
    </Box>
  );
};
export default Header;
