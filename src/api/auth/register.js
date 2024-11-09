import API_BASE_URL from "../../utils/config";

export const registerUser = async (email, password, profile_picture, file_name) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            profile_picture: profile_picture
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to register: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
};
