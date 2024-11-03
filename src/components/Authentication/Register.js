import React, { useState } from "react";
import { handleRegister } from "./handlers/handleRegister";
import "./Authentication.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        setMessage("");

        try {
            await handleRegister(email, password, setMessage);
        } catch (error) {
            // Display the specific error message from the backend
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
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Processing..." : "Register"}
            </button>
            <p>{message}</p>
        </div>
    );
}

export default Register;
