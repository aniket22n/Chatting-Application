import React, { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, PaletteOptions } from "@mui/material";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { themeState } from "./store/atoms/themeAtom";
import palette from "./theme/palette";
import Layout from "./layout";

// ........................ Theme & Routing .........................

function App() {
  const { theme, color } = useRecoilValue(themeState);

  const customTheme = React.useMemo(
    () =>
      createTheme({
        palette:
          theme == "light"
            ? (palette.light as PaletteOptions)
            : (palette.dark as PaletteOptions),
      }),
    [theme]
  );

  useMemo(() => {
    customTheme.palette.primary.main = color;
  }, [theme, color]);

  return (
    <div>
      <ThemeProvider theme={customTheme}>
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
