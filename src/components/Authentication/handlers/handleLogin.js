import API_BASE_URL, { saveTokens } from "../../../utils/config";

export const handleLogin = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error(`Login failed: ${response.status} ${response.statusText}`);
        }

        const tokens = await response.json();
        saveTokens(tokens);
        } catch (error) {
        console.error("Login error:", error);
        return error;
    }
};
