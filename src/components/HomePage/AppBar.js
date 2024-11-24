import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Container,
  Divider,
  MenuItem,
  Drawer,
  Menu,
  Avatar,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import ColorModeIconDropdown from "../shared-theme/ColorModeIconDropdown";
import { clearTokens } from "../../utils/config";
import { handleFetchUserInfo } from "../Authentication/handlers/handleMe";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar({ setUser }) {
    const [open, setOpen] = useState(false);
    const [user, setLocalUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      handleFetchUserInfo()
        .then((userInfo) => {
          setLocalUser(userInfo); // Set local state for AppAppBar
          setUser(userInfo); // Pass user info to Blog.js
        })
        .catch(() => {
          setLocalUser(null);
          setUser(null); // Pass null to Blog.js if the fetch fails
        });
    }, [setUser]);
  
    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
  
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
  
    const handleLogout = () => {
        clearTokens();
        setLocalUser(null);
        setUser(null);
        navigate("/sign-in");
        window.location.reload();
      };
  
    const handleNavigate = (path) => () => {
      navigate(path);
    };
  
    return (
      <AppBar
        position="fixed"
        enableColorOnDark
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: "calc(var(--template-frame-height, 0px) + 28px)",
        }}
      >
        <Container maxWidth="lg">
          <StyledToolbar variant="dense" disableGutters>
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Button variant="text" color="info" size="small">
                  Features
                </Button>
                <Button variant="text" color="info" size="small">
                  Testimonials
                </Button>
                <Button variant="text" color="info" size="small">
                  Highlights
                </Button>
                <Button variant="text" color="info" size="small">
                  Pricing
                </Button>
                <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                  FAQ
                </Button>
                <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                  Blog
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 2,
                alignItems: "center",
              }}
            >
              <ColorModeIconDropdown />
              {user ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body1" color="text.primary">
                    {user.email}
                  </Typography>
                  <IconButton onClick={handleMenuOpen}>
                    <Avatar src={user.details.ProfilePicURL} alt={user.details.Name} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem disabled>{user.details.Name}</MenuItem>
                    <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Box>
              ) : (
                <>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    onClick={handleNavigate("/sign-in")}
                  >
                    Sign in
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={handleNavigate("/sign-up")}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </Box>
          </StyledToolbar>
        </Container>
      </AppBar>
    );
  }
  