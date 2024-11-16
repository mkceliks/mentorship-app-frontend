import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./components/Authentication/SignIn";
import { getAccessToken } from "./utils/config";

function App() {
    const isAuthenticated = !!getAccessToken();

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={!isAuthenticated ? <SignIn /> : <Navigate to="/hello_world" replace />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
