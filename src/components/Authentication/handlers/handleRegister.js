import { registerUser } from "../../../api/auth/register";

export const handleRegister = async (email, password, setMessage) => {
    try {
        const response = await registerUser(email, password);
        setMessage("Registration successful! Please log in.");
    } catch (error) {
        console.error("Error during registration:", error);
        setMessage("Registration failed. Please try again.");
    }
};
