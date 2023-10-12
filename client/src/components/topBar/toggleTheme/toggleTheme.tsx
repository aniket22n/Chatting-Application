import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRecoilState } from "recoil";
import { Moon, Sun } from "phosphor-react";

import { themeState, Theme } from "../../../store/atoms/themeAtom";
import { useEffect } from "react";

const ToggleTheme = () => {
  const mainTheme = useTheme();
  const [theme, setTheme] = useRecoilState(themeState);

  useEffect(() => {
    const userTheme = theme.theme === Theme.Dark ? "dark" : "light";
    localStorage.setItem("theme", userTheme);
  }, [theme.theme]);

  return (
    <Box
      sx={{
        background: mainTheme.palette.primary.main,
        borderRadius: "50%",
      }}
    >
      <IconButton
        onClick={() =>
          setTheme({
            theme: theme.theme === Theme.Dark ? Theme.Light : Theme.Dark,
            color: theme.color,
          })
        }
      >
        {theme.theme === "dark" && <Sun color="black" />}
        {theme.theme === "light" && <Moon color="black" />}
      </IconButton>
    </Box>
  );
};
export default ToggleTheme;
// onChange={() =>
//
