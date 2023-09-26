import React, { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, PaletteOptions } from "@mui/material";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { toggleColor, toggleTheme } from "./store/atoms/toggleTheme";
import palette from "./theme/palette";
import Layout from "./layout";

// ........................ Theme & Routing .........................

function App() {
  const mode = useRecoilValue(toggleTheme);
  const color = useRecoilValue(toggleColor);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette:
          mode == "light"
            ? (palette.light as PaletteOptions)
            : (palette.dark as PaletteOptions),
      }),
    [mode]
  );

  useMemo(() => {
    theme.palette.primary.main = color;
  }, [color, mode]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
