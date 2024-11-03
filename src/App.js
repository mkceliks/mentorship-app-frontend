import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import FileManagement from "./components/FileManagement/FileManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import { getAccessToken } from "./utils/config";

function App() {
    const isAuthenticated = !!getAccessToken();

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={!isAuthenticated ? <Home /> : <Navigate to="/files" replace />}
                />
                <Route
                    path="/login"
                    element={!isAuthenticated ? <Login /> : <Navigate to="/files" replace />}
                />
                <Route
                    path="/register"
                    element={!isAuthenticated ? <Register /> : <Navigate to="/files" replace />}
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
