import API_BASE_URL from "../../utils/config";

export const registerUser = async (email, password, name, role, selectedFileData) => {
    const { file, base64File } = selectedFileData;

    const requestBody = {
        email,
        password,
        name,
        role,
        file_name: file.name,
        profile_picture: base64File.split(",")[1], 
    };


    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-file-content-type": file.type,
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        throw new Error(`Failed to register. Status: ${response.status} ${response.body}`);
    }

    return response;
};
