import React, { useState } from "react";
import { handleRegister } from "./handlers/handleRegister";
import "./Authentication.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [fileName, setFileName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name); 
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result.split(",")[1]); 
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!email || !password || !profilePicture) {
            setMessage("All fields, including profile picture, are required.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            await handleRegister(email, password, profilePicture, fileName, setMessage);
        } catch (error) {
            setMessage(error.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Authentication">
            <h1>Register</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                disabled={loading}
            />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Processing..." : "Register"}
            </button>
            <p>{message}</p>
        </div>
    );
}

export default Register;
