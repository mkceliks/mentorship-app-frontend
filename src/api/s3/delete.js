import API_BASE_URL from "../../utils/config";

export const deleteFile = async (fileKey) => {
    const response = await fetch(`${API_BASE_URL}/delete?key=${fileKey}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Failed to delete file. Status: ${response.status} ${response.statusText}`);
    }

    return response;
};
