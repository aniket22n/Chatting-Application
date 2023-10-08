import { IconButton, Stack } from "@mui/material";
import { CheckCircle, Circle } from "phosphor-react";
import { useRecoilState } from "recoil";

import { themeState, Color } from "../../../store/atoms/themeAtom";

const ToggleColors = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  return (
    <>
      <Stack direction={"row"} spacing={4}>
        <IconButton
          sx={{ bgcolor: Color.Blue }}
          onClick={() => setTheme({ color: Color.Blue, theme: theme.theme })}
        >
          {theme.color == "#0162C4" ? (
            <CheckCircle color="black" />
          ) : (
            <Circle color="black" />
          )}
        </IconButton>
        <IconButton
          sx={{ bgcolor: Color.Yellow }}
          onClick={() => setTheme({ color: Color.Yellow, theme: theme.theme })}
        >
          {theme.color == "#B78103" ? (
            <CheckCircle color="black" />
          ) : (
            <Circle color="black" />
          )}
        </IconButton>
        <IconButton
          sx={{ bgcolor: Color.Red }}
          onClick={() => setTheme({ color: Color.Red, theme: theme.theme })}
        >
          {theme.color == "#FF4842" ? (
            <CheckCircle color="black" />
          ) : (
            <Circle color="black" />
          )}
        </IconButton>
      </Stack>
    </>
  );
};

export default ToggleColors;
