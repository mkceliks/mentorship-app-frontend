import React, { useState } from "react";
import { handleRegister } from "./handlers/handleRegister";
import "./Authentication.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

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
            <button onClick={() => handleUpload(email, password, selectedFile)} disabled={loading}>
                {loading ? "Uploading..." : "Upload"}
            </button>
            <p>{message}</p>
        </div>
    );
}

export default Register;
