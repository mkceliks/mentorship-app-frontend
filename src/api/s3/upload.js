import API_BASE_URL from "../../utils/config";

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
        headers: {
            "x-file-content-type": file.type
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to upload file. Status: ${response.status} ${response.statusText}`);
    }

    return response;
};
