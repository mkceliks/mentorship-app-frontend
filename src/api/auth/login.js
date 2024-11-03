import API_BASE_URL from "../../utils/config";

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(`Failed to login. Status: ${response.status} ${response.statusText}`);
    }

    return response.json();
};
