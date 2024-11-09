import { registerUser } from "../../../api/auth/register";

export const handleRegister = async (email, password, selectedFile, setMessage) => {
    if (!selectedFile) {
        alert("Please select a file to upload.");
        return;
    }

    try {
        const response = await registerUser(email, password, selectedFile);

        if (response.ok) {
            setMessage("Registration successful! Please log in.");
        } else {
            const errorText = await response.text();
            setMessage(`Failed to upload file: ${errorText}`);
        }
    } catch (error) {
        console.error("Error during registration:", error);
        setMessage("Registration failed. Please try again.");
    }
};
