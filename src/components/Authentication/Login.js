import React, { useState } from "react";
import { handleLogin } from "./handlers/handleLogin";
import "./Authentication.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        setMessage("");

        try {
            await handleLogin(email, password, setMessage);
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Authentication">
            <h1>Login</h1>
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
                {loading ? "Processing..." : "Login"}
            </button>
            <p>{message}</p>
        </div>
    );
}

export default Login;
