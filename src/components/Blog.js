import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppAppBar from "./HomePage/AppBar";
import Footer from "./HomePage/Footer";
import AppTheme from "./shared-theme/AppTheme";
import FileManager from "./HomePage/FileManager"; 
import { isAuthenticated } from "../utils/config";

export default function Blog(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <h2>welcome to mentorship app</h2>
        {isAuthenticated() && <FileManager />}
      </Container>
      <Footer />
    </AppTheme>
  );
}
