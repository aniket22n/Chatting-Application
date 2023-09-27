import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import { Smiley, TelegramLogo } from "phosphor-react";

const StyledInput = styled(TextField)(({}) => ({
  "& .MuiInputBase-input": {
    padding: "14px",
  },
}));

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        marginLeft: "5px",
        p: 2,
        height: "80px",
        minWidth: "350px",
        bgcolor: theme.palette.background.default,
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <StyledInput
          placeholder="write a message..."
          fullWidth
          variant="filled"
          autoComplete="off"
          InputProps={{
            disableUnderline: true,
            // Attachment Icon feature
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Smiley />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ boxShadow: "2px 2px 5px rgba(0,0,0,0.15)" }}
        />

        <Box
          sx={{ height: 48, width: 48, borderRadius: 1.5 }}
          bgcolor={theme.palette.primary.main}
        >
          <Stack
            sx={{ height: "100%", width: "100%" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <IconButton>
              <TelegramLogo color="#fff" />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
export default Footer;
