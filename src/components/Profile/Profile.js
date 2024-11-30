import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Container,
  Avatar,
  CircularProgress,
  Button,
  Divider,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { CheckCircle, ErrorOutline } from "@mui/icons-material";
import AppTheme from "../shared-theme/AppTheme";
import AppAppBar from "../HomePage/AppBar";
import Footer from "../HomePage/Footer";
import { handleFetchUserInfo } from "../Authentication/handlers/handleMe";
import { handleUpdateUserInfo } from "./handlers/handleUpdateUserInfo";

export default function Profile(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchUserInfo()
      .then((userInfo) => {
        setUser(userInfo);
        setEditedDetails({
          ...userInfo.details,
          profile_type: userInfo.profile_type,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
        setLoading(false);
      });
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (field) => (event) => {
    setEditedDetails({ ...editedDetails, [field]: event.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await handleUpdateUserInfo(editedDetails);
      const updatedUser = await handleFetchUserInfo(true);
      setUser(updatedUser);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setLoading(false);
    }
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

  const isEmailVerified = user?.is_verified;

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
            {editMode ? (
              <TextField
                value={editedDetails.Name || ""}
                onChange={handleInputChange("Name")}
                variant="outlined"
                size="small"
              />
            ) : (
              user?.details?.Name || "Your Name"
            )}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body1" color="text.secondary">
              {editMode ? (
                <TextField
                  value={editedDetails.Email || ""}
                  onChange={handleInputChange("Email")}
                  variant="outlined"
                  size="small"
                />
              ) : (
                user?.email || "Your Email"
              )}
            </Typography>
            {isEmailVerified ? (
              <CheckCircle color="success" fontSize="small" />
            ) : (
              <ErrorOutline color="error" fontSize="small" />
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            {editMode ? (
              <>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleEditToggle}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="contained" onClick={handleEditToggle}>
                Edit Profile
              </Button>
            )}
          </Box>
        </Box>

        <Divider />

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            User Details
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body2">
              <strong>Phone:</strong>{" "}
              {editMode ? (
                <TextField
                  value={editedDetails.Phone || ""}
                  onChange={handleInputChange("Phone")}
                  variant="outlined"
                  size="small"
                />
              ) : (
                user?.details?.Phone || "Not Available"
              )}
            </Typography>
            <Typography variant="body2">
              <strong>Role:</strong>{" "}
              {editMode ? (
                <FormControl component="fieldset">
                  <FormLabel component="legend">Select Role</FormLabel>
                  <RadioGroup
                    row
                    value={editedDetails.profile_type || ""}
                    onChange={handleInputChange("profile_type")}
                  >
                    <FormControlLabel
                      value="Mentor"
                      control={<Radio />}
                      label="Mentor"
                    />
                    <FormControlLabel
                      value="Mentee"
                      control={<Radio />}
                      label="Mentee"
                    />
                  </RadioGroup>
                </FormControl>
              ) : (
                user?.profile_type || "Not Available"
              )}
            </Typography>
            <Typography variant="body2">
              <strong>Joined On:</strong> {user?.details?.CreatedAt
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
