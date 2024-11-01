import API_BASE_URL from "../../utils/config";

export const uploadFile = async (file) => {
    const base64File = await toBase64(file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-file-content-type": file.type,
        },
        body: JSON.stringify({
            file_name: file.name,
            file_content: base64File.split(',')[1],
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to upload file. Status: ${response.status} ${response.statusText}`);
    }

    return response;
};

const toBase64 = (file) => 
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
