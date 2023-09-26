import { Card, TextField, Button, Typography, Grid } from "@mui/material";
import { AccountCircle, Fingerprint } from "@mui/icons-material";
import { useState, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRecoilValue } from "recoil";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ControlledRadioButtonsGroup } from "./RadioButtons";
import "../../style/auth.css";
import { atomImage } from "../../store/atoms/image";

const textFieldStyle = {
  style: {
    fontSize: "18px",
  },
};

// State management using useReducer
const initialState = {
  username: "",
  password: "",
  confirmPassword: "",
};

type State = { username: string; password: string; confirmPassword: string };
type Action = { type: string; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "username":
      return { ...state, username: action.payload.trim() };
    case "password":
      return { ...state, password: action.payload.trim() };
    case "confirmPassword":
      return { ...state, confirmPassword: action.payload.trim() };
    default:
      return state;
  }
};

// Zod validation
const registerZod = z.object({
  username: z.string().min(1).max(15),
  password: z.string().min(4).max(15),
  gender: z.string(),
});
type registerType = z.infer<typeof registerZod>;

export default function Register() {
  const redirect = useNavigate();
  const gender = useRecoilValue(atomImage);
  const [show, setShow] = useState({ pass: false, cPass: false });
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleRegister = async () => {
    // Validation Section
    if (state.username.length < 1) {
      toast.error("Enter username");
    } else if (state.password.length < 4) {
      toast.error("Minimum password length: 4 characters");
    } else if (state.password !== state.confirmPassword) {
      toast.error("Password mismatch");
    } else {
      try {
        // User Input
        const registerData: registerType = {
          username: state.username,
          password: state.password,
          gender,
        };
        // Make a registration request to the server
        const response = await axios.post(
          "http://localhost:3000/register",
          registerData
        );
        console.log(response);

        if (response.status === 200) {
          // Successful registration
          toast.success(response.data.message);
          redirect("/login");
        }
      } catch (error: any) {
        // Handle different error cases
        const code = error.request.status;
        if (code === 400) toast.warning("Username is already taken");
        else if (code === 401) toast.error("Invalid crededentials");
        else toast.info("Server problem");
      }
    }
  };

  return (
    <Grid container className="login-page">
      <Grid item xs={11} sm={10}>
        <HelmetProvider>
          <Helmet>
            <title>register</title>
          </Helmet>
        </HelmetProvider>

        <Card className="login-card" elevation={24}>
          <img
            className="image-register"
            src={`${gender == "male" ? "male.gif" : "female.gif"} `}
          />

          <div className="login-form">
            <Typography className="title">Join GooseChat</Typography>
            <ControlledRadioButtonsGroup />
            <TextField
              className="text-field"
              placeholder="Username"
              type="text"
              InputProps={{
                ...textFieldStyle,
                endAdornment: <AccountCircle className="icon" />,
              }}
              onChange={(e) =>
                dispatch({ type: "username", payload: e.target.value })
              }
            />

            <TextField
              className="text-field"
              placeholder="Password ( at least 4 characters )"
              color={state.password.length < 4 ? "error" : "success"}
              type={show.pass ? "text" : "password"}
              InputProps={{
                ...textFieldStyle,
                endAdornment: (
                  <Fingerprint
                    className="icon-pass"
                    onClick={() => setShow({ ...show, pass: !show.pass })}
                  />
                ),
              }}
              onChange={(e) =>
                dispatch({ type: "password", payload: e.target.value })
              }
            />

            <TextField
              className="text-field"
              placeholder="Confirm password"
              color={
                state.password != state.confirmPassword ? "error" : "success"
              }
              type={show.cPass ? "text" : "password"}
              InputProps={{
                ...textFieldStyle,
                endAdornment: (
                  <Fingerprint
                    className="icon-pass"
                    onClick={() => setShow({ ...show, cPass: !show.cPass })}
                  />
                ),
              }}
              onChange={(e) =>
                dispatch({ type: "confirmPassword", payload: e.target.value })
              }
            />

            <Button className="button" onClick={handleRegister}>
              Register
            </Button>

            <div className="register-link">
              Already a member? <Link to={"/Login"}>login here</Link>
            </div>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
}
