import API_BASE_URL from "../../utils/config";

export const registerUser = async (email, password, selectedFileData) => {
    const { file, base64File } = selectedFileData;

    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-file-content-type": file.type,
        },
        body: JSON.stringify({
            email,
            password,
            file_name: file.name,
            profile_picture: base64File.split(',')[1],
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to register. Status: ${response.status} ${response.statusText}`);
    }

    return response;
};
