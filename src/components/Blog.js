import React, { useEffect, useState } from "react";
import { fetchAndSetUserInfo, isAuthenticated } from "../utils/config";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Container, Alert, Button } from "@mui/material";
import AppTheme from "./shared-theme/AppTheme"; 
import AppAppBar from "./HomePage/AppBar"; 
import Footer from "./HomePage/Footer"; 
import FileManager from "./HomePage/FileManager";

export default function Blog(props) {
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      fetchAndSetUserInfo()
        .then((userInfo) => {
          setUser(userInfo);
          setIsVerified(userInfo?.is_verified ?? true);
        })
        .catch(() => {
          setUser(null);
        });
    }
  }, []);

  const handleVerifyEmail = () => {
    if (user?.email) {
      navigate("/confirm", { state: { email: user.email } });
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
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
        {user && isVerified && <FileManager />}
      </Container>
      <Footer />
    </AppTheme>
  );
}
