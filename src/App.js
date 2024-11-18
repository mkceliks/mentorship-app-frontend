import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignInSide from "./components/Authentication/SignInSide";
import SignUp from "./components/Authentication/SignUp";
import { getAccessToken } from "./utils/config";
// import Navbar from "./components/Navbar/Navbar";
import Blog from "./components/Blog";
import FileManagement from "./components/FileManagement/FileManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import Confirm from './components/Authentication/Confirm';

const App = () => {
    const isAuthenticated = !!getAccessToken();
    const emailToConfirm = localStorage.getItem('emailToConfirm');
  
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route
            path="/sign-in"
            element={!isAuthenticated ? <SignInSide /> : <Navigate to="/" replace />}
          />
          <Route
            path="/sign-up"
            element={!isAuthenticated ? <SignUp /> : <Navigate to="/" replace />}
          />
          <Route
            path="/confirm"
            element={<Confirm />}
          />
          <Route
            path="*"
            element={
              emailToConfirm ? (
                <Navigate to="/confirm" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Router>
    );
  };
  
  export default App;
  