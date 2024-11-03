import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAccessToken, clearTokens } from "../../utils/config";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const isAuthenticated = !!getAccessToken();

    const handleLogout = () => {
        clearTokens();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <h1 className="navbar-logo">Mentorship App</h1>
            <div className="navbar-links">
                <NavLink to="/" className="nav-link" end>
                    Home
                </NavLink>
                {isAuthenticated ? (
                    <>
                        <NavLink to="/files" className="nav-link">
                            File Management
                        </NavLink>
                        <button className="nav-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="nav-link">
                            Login
                        </NavLink>
                        <NavLink to="/register" className="nav-link">
                            Register
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
