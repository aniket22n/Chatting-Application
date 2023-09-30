import { Card, TextField, Button, Grid } from "@mui/material";
import {
  AccountCircle,
  AlternateEmail,
  Fingerprint,
} from "@mui/icons-material";
import { useState, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { registerType } from "../../zod/zod";
import "../../style/auth.css";
import gooseImage from "../../assets/logo/light-logo.png";

const textFieldStyle = {
  style: {
    fontSize: "18px",
  },
};

// State management using useReducer
const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

type State = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type Action = { type: string; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "username":
      return { ...state, username: action.payload.trim() };
    case "email":
      return { ...state, email: action.payload.trim() };
    case "password":
      return { ...state, password: action.payload.trim() };
    case "confirmPassword":
      return { ...state, confirmPassword: action.payload.trim() };
    default:
      return state;
  }
};

function isValidEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

export default function Register() {
  const redirect = useNavigate();
  const [show, setShow] = useState({ pass: false, cPass: false });
  const [state, dispatch] = useReducer(reducer, initialState);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setSelectedImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async () => {
    // Validation Section
    if (state.username.length < 1) {
      toast.error("Enter username");
    } else if (!isValidEmail(state.email)) {
      toast.error("Invalid email format");
    } else if (state.password.length < 4) {
      toast.error("Minimum password length: 4 characters");
    } else if (state.password !== state.confirmPassword) {
      toast.error("Password mismatch");
    } else {
      try {
        // User Input
        const registerData: registerType = {
          username: state.username,
          email: state.email,
          image: selectedImage || (gooseImage as string),
          password: state.password,
          online: false,
          unread: 0,
          friends: [],
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

        <Card
          className="login-card"
          elevation={24}
          sx={{
            height: "100%",
            display: "flex",
            direction: "column",
            alignItems: "center",
          }}
        >
          <div className="login-form">
            <div>
              <img
                src={selectedImage || gooseImage}
                alt="Selected"
                style={{
                  maxWidth: "150px",
                  height: "150px",
                  borderRadius: "50%",
                }}
              />
            </div>

            <TextField
              className="text-field"
              placeholder="Username"
              type="text"
              autoComplete="off"
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
              placeholder="Email"
              type="email"
              autoComplete="off"
              InputProps={{
                ...textFieldStyle,
                endAdornment: <AlternateEmail className="icon" />,
              }}
              onChange={(e) =>
                dispatch({ type: "email", payload: e.target.value })
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

            <div>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                onChange={handleImageSelect}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="contained"
                  fullWidth
                  color="inherit"
                  component="span"
                >
                  Select Image
                </Button>
              </label>
            </div>

            <Button
              className="button"
              onClick={handleRegister}
              sx={{ marginTop: "20px" }}
            >
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
