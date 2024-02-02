import React, { useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline, PaletteOptions, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { themeState } from "./store/atoms/themeAtom";
import palette from "./theme/palette";
import Layout from "./layout";
import useToast from "./hooks/useToast";

// ........................ Theme & Routing .........................

function App() {
  const { theme, color } = useRecoilValue(themeState);
  const { infoToast, warningToast } = useToast();

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

  useEffect(() => {
    warningToast("Server restarting.");
    setTimeout(() => infoToast("Please wait for 60 seconds."), 5000);
  }, []);

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
          <Route path="/*" Component={NotFound} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

const NotFound = () => {
  return (
    <center>
      <Box>
        <Typography variant="h4">404 Not Found</Typography>
        <Typography variant="caption">
          The page you are looking for does not exist.
        </Typography>
      </Box>
    </center>
  );
};

export default App;
