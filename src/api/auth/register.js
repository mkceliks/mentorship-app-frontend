import API_BASE_URL from "../../utils/config";

export const registerUser = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(`Failed to register. Status: ${response.status} ${response.statusText}`);
    }

    return response.json();
};
