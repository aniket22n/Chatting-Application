import { Card, TextField, Button, Typography, Grid, Box } from "@mui/material";
import { AccountCircle, Fingerprint } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

import "../../style/auth.css";
import { loginType } from "../../Types/zod";
import { useSetRecoilState } from "recoil";
import { userState } from "../../store/atoms/userAtom";
import useToast from "../../hooks/useToast";
import { api } from "../../path";

const textFieldStyle = {
  style: {
    fontSize: "18px",
  },
};

export default function Login() {
  const { errorToast, successToast, infoToast } = useToast();
  const theme = useTheme();
  const redirect = useNavigate();
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setUser = useSetRecoilState(userState);

  const handleLogin = async () => {
    if (username.length < 1) errorToast("Enter username");
    else if (password.length < 1) errorToast("Enter password");
    else {
      try {
        const loginData: loginType = { username, password };
        const response = await axios.post(api.loginURL, loginData, {
          withCredentials: true,
        });
        if (response.status == 200) {
          successToast(response.data.message);
          setUser({ isLoggedin: true, info: response.data.response });
          redirect("/");
        }
      } catch (error: any) {
        const code = error.request.status;
        if (code == 401) errorToast("Incorrect username or password");
        else if (code == 404) errorToast("Username not found in our records");
        else infoToast("Server problem");
      }
    }
  };

  return (
    <Grid container className="login-page">
      <Grid item xs={11} sm={10}>
        <HelmetProvider>
          <Helmet>
            <title>login</title>
          </Helmet>
        </HelmetProvider>

        <Card
          className="login-card"
          elevation={6}
          sx={{ bgcolor: theme.palette.grey[900] }}
        >
          <img className="image-login" src={"welcome.gif"} />

          <Box className="login-form">
            <Typography className="title">Member Login</Typography>
            <TextField
              className="text-field"
              autoComplete="off"
              placeholder="Username"
              type="text"
              InputProps={{
                ...textFieldStyle,
                endAdornment: <AccountCircle className="icon" />,
              }}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              className="text-field"
              placeholder="Password"
              type={show ? "text" : "password"}
              InputProps={{
                ...textFieldStyle,
                endAdornment: (
                  <Fingerprint
                    className="icon-pass"
                    onClick={() => setShow(!show)}
                  />
                ),
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="button"
              variant="contained"
              onClick={handleLogin}
            >
              Login
            </Button>
            <Box className="register-link">
              Not a member yet?{" "}
              <Link style={{ color: "skyblue" }} to={"/register"}>
                register here
              </Link>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
