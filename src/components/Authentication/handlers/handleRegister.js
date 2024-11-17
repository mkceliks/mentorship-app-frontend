import { registerUser } from "../../../api/auth/register";

export const handleRegister = async (email, password, name, role, selectedFile, setMessage) => {
    if (!selectedFile) {
        alert("Please select a file to upload.");
        return;
    }

    try {
        const selectedFileData = {
            file: selectedFile,
            base64File: await fileToBase64(selectedFile),
        };

        const response = await registerUser(email, password, name, role, selectedFileData);

        if (response.ok) {
            setMessage("Registration successful! Please log in.");
        } else {
            const errorText = await response.text();
            setMessage(`Failed to register: ${errorText}`);
        }
    } catch (error) {
        console.error("Error during registration:", error);
        setMessage("Registration failed. Please try again.");
    }
};

const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
