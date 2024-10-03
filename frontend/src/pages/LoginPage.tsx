import { Button, TextField, Typography, Box, Container } from "@mui/material/";
import { useRef, useState } from "react";
import BASE_URL from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // Validate the form data
    if (!email || !password) {
      setError("Check submitted data");
      return;
    }

    // * Make the call to API to create the user
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      setError("Unable to login the user, please try with another credentials");
      return;
    }

    const token = await response.json();

    if (!token) {
      setError("Incorrect token");
      return;
    }

    login(email, token);
    navigate("/");
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant="h6">Login To Your Account</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 2,
              gap: 2,
              padding: 2,
              border: 1,
              borderColor: "#f5f5f5",
            }}
          >
            <TextField inputRef={emailRef} label="Email" name="email" />
            <TextField
              inputRef={passwordRef}
              label="Password"
              name="password"
              type="password"
            />
            <Button onClick={onSubmit} variant="contained">
              Login
            </Button>
            {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
