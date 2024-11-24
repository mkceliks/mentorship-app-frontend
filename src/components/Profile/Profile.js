import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Container, Avatar, CircularProgress, Button, Divider } from "@mui/material";
import AppTheme from "../shared-theme/AppTheme";
import AppAppBar from "../HomePage/AppBar";
import Footer from "../HomePage/Footer";
import { handleFetchUserInfo } from "../Authentication/handlers/handleMe";

export default function Profile(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchUserInfo()
      .then((userInfo) => {
        setUser(userInfo);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
        setLoading(false);
      });
  }, []);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AppTheme {...props}>
      <AppAppBar setUser={setUser} />
      <Container
        maxWidth="md"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            src={user?.details?.ProfilePicURL}
            alt={user?.details?.Name}
            sx={{ width: 120, height: 120 }}
          />
          <Typography variant="h4" component="h1">
            {user?.details?.Name || "Your Name"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {user?.email || "Your Email"}
          </Typography>
          <Button variant="contained" onClick={handleEditProfile}>
            Edit Profile
          </Button>
        </Box>

        <Divider />

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            User Details
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2">
              <strong>Email:</strong> {user?.email || "Not Available"}
            </Typography>
            <Typography variant="body2">
              <strong>Phone:</strong> {user?.details?.Phone || "Not Available"}
            </Typography>
            <Typography variant="body2">
              <strong>Role:</strong> {user?.details?.Role || "Not Available"}
            </Typography>
            <Typography variant="body2">
              <strong>Joined On:</strong>{" "}
              {user?.details?.CreatedAt
                ? new Date(user.details.CreatedAt).toLocaleDateString()
                : "Not Available"}
            </Typography>
          </Box>
        </Box>
      </Container>
      <Footer />
    </AppTheme>
  );
}
