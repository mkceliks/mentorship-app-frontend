import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignInSide from "./components/Authentication/SignInSide";
import SignUp from "./components/Authentication/SignUp";
import { getAccessToken } from "./utils/config";
// import Navbar from "./components/Navbar/Navbar";
import FileManagement from "./components/FileManagement/FileManagement";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    const isAuthenticated = !!getAccessToken();

    return (
        <Router>
            {/* <Navbar /> */}
            <Routes>
                {/* <Route
                    path="/"
                    element={!isAuthenticated ? <Home /> : <Navigate to="/files" replace />}
                /> */}
                <Route
                    path="/sign-in"
                    element={!isAuthenticated ? <SignInSide /> : <Navigate to="/files" replace />}
                />
                <Route
                    path="/sign-up"
                    element={!isAuthenticated ? <SignUp /> : <Navigate to="/files" replace />}
                />
                <Route
                    path="/files"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <FileManagement />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}
export default App;