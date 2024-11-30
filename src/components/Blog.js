import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Container, Alert, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "./shared-theme/AppTheme";
import AppAppBar from "./HomePage/AppBar";
import Footer from "./HomePage/Footer";
import FileManager from "./HomePage/FileManager";

export default function Blog(props) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const isVerified = user?.details?.is_verified ?? true;

  const handleVerifyEmail = () => {
    if (user?.email) {
      navigate("/confirm", { state: { email: user.email } });
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar setUser={setUser} />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <Typography variant="h4" component="h2">
          Welcome to Mentorship App
        </Typography>
        {user && !isVerified && (
          <Alert severity="warning">
            Your email is not verified. Please verify your account to access all features.
            <Button variant="contained" onClick={handleVerifyEmail} sx={{ mt: 2 }}>
              Verify Email
            </Button>
          </Alert>
        )}
        {user && isVerified && <FileManager user={user} />}
      </Container>
      <Footer />
    </AppTheme>
  );
}

