import { registerUser } from "../../../api/auth/register";

export const handleRegister = async (email, password, profilePicture, fileName, setMessage) => {
    try {
        const response = await registerUser(email, password, profilePicture, fileName);
        setMessage("Registration successful! Please log in.");
    } catch (error) {
        console.error("Error during registration:", error);
        setMessage("Registration failed. Please try again.");
    }
};
